import React, {Component} from 'react'
import './Clients.scss'
import {connect} from 'react-redux'
import {confirmAlert} from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import AddClient from '../../Components/AddClient/AddClient'

class Clients extends Component {
    state = {
        clientEditIsOpen: false,
        editClient: null,
        clients: [
            {
                id: 1,
                name: 'Иван Иванович Иванов',
                phone: '79999999999',
                user_id: 'user-1',
            },
            {
                id: 2,
                name: 'Иван Иванович Иванов',
                phone: '79999999999',
                user_id: 'user-1',
            },
            {
                id: 3,
                name: 'Иван Иванович Иванов',
                phone: '79999999999',
                user_id: 'user-1',
            },
            {
                id: 4,
                name: 'Иван Иванович Иванов',
                phone: '79999999999',
                user_id: 'user-1',
            },
            {
                id: 5,
                name: 'Иван Иванович Иванов',
                phone: '79999999999',
                user_id: 'user-1',
            },
        ],

    }

    deleteClient = (client) => {

    }

    deleteHandler = (client) => {
        confirmAlert({
            title: 'Подтвердите действие',
            message: 'Вы уверены, что хотите удалить клиента?',
            buttons: [
                {
                    label: 'Да',
                    onClick: () => this.deleteClient(client),
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

    render() {
        return (
            <div className={'clients'}>
                <h1 className={'mb-5'}>Клиенты</h1>

                <button
                    className={'btn btn-secondary mr-auto'}
                    onClick={() => this.interactWithClient(true, null)}
                >
                    Добавить клиента
                </button>

                <table className="table">
                    <thead className="thead">
                    <tr className={'table-dark'}>
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
                        this.state.clients.map((element, index) => (
                            <tr key={element.id}>
                                <th scope="row">{index}</th>
                                <td>{element.name}</td>
                                <td>{element.phone}</td>
                                <td>
                                    <i className="fa fa-pencil fa-animate mr-3" aria-hidden="true"
                                       onClick={() => this.interactWithClient(true, element)}
                                    />
                                    <i className="fa fa-trash-o fa-animate" aria-hidden="true"
                                       onClick={() => this.deleteHandler(element)}/>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                <AddClient
                    interactWithClient={this.interactWithClient}
                    clientEditIsOpen={this.state.clientEditIsOpen}
                    editClient={this.state.editClient}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients)