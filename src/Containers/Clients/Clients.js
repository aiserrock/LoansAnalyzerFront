import React, {Component} from 'react'
import './Clients.scss'
import {connect} from 'react-redux'
import {confirmAlert} from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import AddClient from '../../Components/AddClient/AddClient'
import {Redirect} from 'react-router-dom'
import {createClient, updateClient, getClients, deleteClient} from '../../store/client/clientActions'
import toaster from 'toasted-notes'
import Table from '../../Components/Table/Table'

class Clients extends Component {
    state = {
        clientEditIsOpen: false,
        editClient: null,
        displayedTen: [],
        activeTen: 0,
    }

    changeActiveTen = (activeTen) => {
        this.setState({
            activeTen: activeTen,
        })
    }

    changeDisplayedTen = () => {
        const num = this.state.activeTen * 10
        const displayedTen = []
        for (let i = num; i < num + 10; i++) {
             if (this.props.clients[i])
                 displayedTen.push(this.props.clients[i])
             else break

        }
        this.setState({
            displayedTen,
        })
    }

    deleteHandler = (id) => {
        confirmAlert({
            title: 'Подтвердите действие',
            message: 'Вы уверены, что хотите удалить клиента?',
            buttons: [
                {
                    label: 'Да',
                    onClick: async () => {
                        await this.props.deleteClient(id)
                        toaster.notify('Пользователь удалён', {
                            position: 'bottom-right',
                            duration: 3000,
                        })
                        this.changeDisplayedTen()
                    },
                },
                {
                    label: 'Нет',
                    onClick: () => {
                    },
                },
            ],
        })
    }

    interactWithClient = (isOpen, editClient) => {
        this.setState({
            clientEditIsOpen: isOpen, editClient,
        })
    }

    updateClient = async (id, data) => {
        await this.props.updateClient(id, data)
        this.changeDisplayedTen()
    }

    createClient = async (name, phone) => {
        await this.props.createClient(name, phone)
        this.changeDisplayedTen()
    }

    renderTableBody = () => {
        return (
            <table className="table">
                <thead className="thead">
                <tr className={'table_dark'}>
                    <th scope="col">#</th>
                    <th scope="col">ФИО</th>
                    <th scope="col">Телефон</th>
                    <th scope="col">
                        <i className="fa fa-pencil-square-o" aria-hidden="true"/>
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.displayedTen.map((element, index) => {
                        return (
                            <tr key={element.id}>
                                <td><b>{this.state.activeTen * 10 + index + 1}</b></td>
                                <td>{element.name}</td>
                                <td>{element.phone}</td>
                                <td>
                                    <i className="fa fa-pencil fa-animate mr-3" aria-hidden="true"
                                       onClick={() => this.interactWithClient(true, element)}
                                    />
                                    <i className="fa fa-trash-o fa-animate" aria-hidden="true"
                                       onClick={() => this.deleteHandler(element.id)}/>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        )
    }

    renderOptionButton = () => {
        return (
            <button
                className={'btn btn-secondary mr-auto ml-auto'}
                onClick={() => this.interactWithClient(true, null)}
            >
                Добавить клиента
            </button>
        )
    }

    render() {
        if (this.props.isAuth)
            return (
                <div className={'clients'}>
                    <h1 className={'mb-5'}>Клиенты</h1>

                    <Table
                        data={this.props.clients}
                        getData={this.props.getClients}
                        renderTableBody={this.renderTableBody}
                        renderOptionButton={this.renderOptionButton}
                        activeTen={this.state.activeTen}
                        changeActiveTen={this.changeActiveTen}
                        changeDisplayedTen={this.changeDisplayedTen}
                    />

                    <AddClient
                        interactWithClient={this.interactWithClient}
                        clientEditIsOpen={this.state.clientEditIsOpen}
                        createClient={this.createClient}
                        updateClient={this.updateClient}
                        editClient={this.state.editClient}
                        successChanged={this.props.successChanged}
                    />
                </div>
            )
        else
            return <Redirect to={'/'}/>
    }
}

function mapStateToProps(state) {
    return {
        isAuth: state.authReducer.isAuth,
        clients: state.clientReducer.clients,
        successChanged: state.clientReducer.successChanged,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getClients: (skip) => dispatch(getClients(skip)),
        createClient: (name, phone) => dispatch(createClient(name, phone)),
        updateClient: (id, data) => dispatch(updateClient(id, data)),
        deleteClient: (id) => dispatch(deleteClient(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients)