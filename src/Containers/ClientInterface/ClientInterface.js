import React, {Component} from 'react'
import './ClientInterface.scss'
import HistoryController from '../../controllers/HistoryController'

export default class ClientInterface extends Component {
    state: {
        data: {},
    }

    componentDidMount = async () => {
        this.setState({
            data: await HistoryController.prototype.getHistoryReport(this.props.match.params.number)
        })
    }

    renderInfo = () => {
        return (
            <div className={'client-interface__info'}>
                <div className={'client-interface__info-item'}>
                    <p>Кем:</p> <span>{this.state.data.client_name}</span>
                </div>
                <div className={'client-interface__info-item'}>
                    <p>Кому: </p> <span>{this.state.data.user_name}</span>
                </div>
                <div className={'client-interface__info-item'}>
                    <p>Дата выдачи:</p> <span>{new Date(this.state.data.expiration_at).toLocaleDateString()}</span>
                </div>
                <div className={'client-interface__info-item'}>
                    <p>Дата возврата:</p> <span>{new Date(this.state.data.issued_at).toLocaleDateString()}</span>
                </div>
                <div className={'client-interface__info-item'}>
                    <p>Сумма займа: </p> <span>{this.state.data.amount} ₽</span>
                </div>
                <div className={'client-interface__info-item'}>
                    <p>Ставка: </p> <span>{this.state.data.rate} %</span>
                </div>
                <div className={'client-interface__info-item'}>
                    <p>Ставка при просрочке: </p> <span>{this.state.data.increased_rate} %</span>
                </div>
                <div className={'client-interface__info-item'}>
                    <p>Статус: </p> <span>{this.state.data.type === 'PROCENT' ? 'Проценты' : 'Долг'}</span>
                </div>
                <div className={'client-interface__info-item mb-5'}>
                    <p>Проценты: </p> <span></span>
                </div>

                <h2 className={'mb-4'}>
                    История платежей
                </h2>

                <table className="table">
                    <thead className="thead">
                    <tr className={'table_dark'}>
                        <th scope="col">Дата платежа</th>
                        <th scope="col">Сумма</th>
                        <th scope="col">Тип</th>

                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.data.history_loan.map((element) => (
                            <tr key={element.id}>
                                <td>{new Date(element.date).toLocaleDateString()}</td>
                                <td>{element.amount}</td>
                                <td>{element.type === 'PROCENT' ? 'Проценты' : 'Долг'}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        return (
            <div className={'client-interface'}>
                <h1 className={'mb-5'}>Выписка</h1>

                {
                    this.state && Object.keys(this.state.data).length !== 0
                        ? this.renderInfo()
                        : null
                }
            </div>
        )
    }
}