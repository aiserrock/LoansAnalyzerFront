import React, {Component} from 'react'
import './Clients.scss'
import {connect} from 'react-redux'

class Clients extends Component {
    state = {
        clientEditIsOpen: false,
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

    render() {
        return (
            <div className={'clients'}>
                    <h1 className={'mb-5'}>Клиенты</h1>

                    <button className={'btn btn-secondary ml-auto'}>
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
                                        <i className="fa fa-pencil fa-animate mr-3" aria-hidden="true"/>
                                        <i className="fa fa-trash-o fa-animate" aria-hidden="true"/>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
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