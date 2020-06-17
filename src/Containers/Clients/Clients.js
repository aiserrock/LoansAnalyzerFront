import React, {Component} from 'react'
import './Clients.scss'
import {connect} from 'react-redux'
import {confirmAlert} from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import AddClient from '../../Components/AddClient/AddClient'
import {Redirect} from 'react-router-dom'
import {createClient, updateClient, getClients, deleteClient} from '../../store/client/clientActions'
import toaster from 'toasted-notes'

class Clients extends Component {
    state = {
        clientEditIsOpen: false,
        editClient: null,
        currentNumberOfItems: 0,
        activeTen: 0,
        displayedTen: [],
    }

    componentDidMount = async () => {
        if (this.props.clients.length === 0)
            await this.props.getClients(0)
        else
            this.setState({
                currentNumberOfItems: Math.ceil(this.props.clients.length/10)
            })
        this.changeDisplayedTen()
    }

    deleteHandler = (id) => {
        confirmAlert({
            title: 'Подтвердите действие',
            message: 'Вы уверены, что хотите удалить клиента?',
            buttons: [
                {
                    label: 'Да',
                    onClick: () => {
                        this.props.deleteClient(id)
                        toaster.notify('Пользователь удалён', {
                            position: 'bottom-right',
                            duration: 3000,
                        })
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

    backHandler = () => {
        if (this.state.activeTen > 0) {
            this.setState({
                activeTen: --this.state.activeTen,
            })
            this.changeDisplayedTen()
        }
    }

    forwardHandler = async () => {
        const num = this.state.currentNumberOfItems * 10 + 10
        if (this.state.activeTen === this.state.currentNumberOfItems && this.props.clients.length >= num) {
            await this.props.getClients(num)
            this.setState({
                currentNumberOfItems: ++this.state.currentNumberOfItems,
                activeTen: ++this.state.activeTen,
            })
        } else if (this.state.activeTen < this.state.currentNumberOfItems) {
            this.setState({
                activeTen: ++this.state.activeTen,
            })
        }
        else
            return null
        this.changeDisplayedTen()
    }

    changeDisplayedTen = () => {
        const num = this.state.activeTen * 10
        const displayedTen = []
        for (let i = num; i < num + 10; i++) {
            if(this.props.clients[i])
                displayedTen.push(this.props.clients[i])
            else break
        }
        this.setState({
            displayedTen
        })
    }

    render() {
        if (this.props.isAuth)
            return (
                <div className={'clients'}>
                    <h1 className={'mb-5'}>Клиенты</h1>

                    <div className="clients__content">
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
                                            <th scope="row">{this.state.activeTen*10+index + 1}</th>
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
                    </div>

                    <div className="d-flex">
                        <button className={'btn btn-secondary mr-auto'} onClick={this.backHandler}>
                            <i className="fa fa-angle-left" aria-hidden="true"/>
                        </button>
                        <button
                            className={'btn btn-secondary mr-auto ml-auto'}
                            onClick={() => this.interactWithClient(true, null)}
                        >
                            Добавить клиента
                        </button>
                        <button className={'btn btn-secondary ml-auto'} onClick={this.forwardHandler}>
                            <i className="fa fa-angle-right" aria-hidden="true"/>
                        </button>
                    </div>

                    <AddClient
                        interactWithClient={this.interactWithClient}
                        clientEditIsOpen={this.state.clientEditIsOpen}
                        editClient={this.state.editClient}
                        createClient={this.props.createClient}
                        successChanged={this.props.successChanged}
                        updateClient={this.props.updateClient}
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