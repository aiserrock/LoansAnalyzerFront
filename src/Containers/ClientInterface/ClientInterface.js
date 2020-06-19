import React, {Component} from 'react'
import './ClientInterface.scss'
import Table from '../../Components/Table/Table'

export default class ClientInterface extends Component {
    state: {
        data: {},
        displayedTen: [],
    }

    componentDidMount(): void {
        this.setState({
            data: JSON.parse(this.props.match.params.number),
        })
    }

    changeDisplayTen = (displayedTen) => {
        this.setState({
            displayedTen,
        })
    }

    renderTableBody = () => {
        return (
            <table className="table">
                <thead className="thead">
                <tr className={'table_dark'}>
                    <th scope="col">Дата платежа</th>
                    <th scope="col">Сумма</th>
                    <th scope="col">Тип</th>
                    <th scope="col">
                        <i className="fa fa-pencil-square-o" aria-hidden="true"/>
                    </th>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        )
    }

    renderInfo = () => {
        return (
            <div className={'client-interface__info'}>
                <div className={'client-interface__info-item'}>
                    <p>Дата выдачи:</p> <span>{new Date(this.state.data.expiration_at).toLocaleDateString()}</span>
                </div>
                <div className={'client-interface__info-item'}>
                    <p>Дата возврата:</p> <span>{new Date(this.state.data.issued_at).toLocaleDateString()}</span>
                </div>
                <div className={'client-interface__info-item'}>
                   <p>Кем:</p> <span>{this.state.data.creditor_name}</span>
                </div>
                <div className={'client-interface__info-item'}>
                    <p>Кому: </p> <span>{this.state.data.debtor_name}</span>
                </div>
                <div className={'client-interface__info-item'}>
                    <p>Сумма займа: </p> <span>{this.state.data.amount}</span>
                </div>
                <div className={'client-interface__info-item'}>
                    <p>Ставка: </p> <span>{this.state.data.rate}</span>
                </div>
                <div className={'client-interface__info-item'}>
                    <p>Ставка при просрочке: </p> <span>{this.state.data.increased_rate}</span>
                </div>
                <div className={'client-interface__info-item mb-0'}>
                    <p>Проценты: </p> <span></span>
                </div>

                <hr/>

                <h2 className={'mb-4'}>
                    История платежей
                </h2>

                <Table
                    data={[]}
                    getData={() => {}}
                    renderTableBody={this.renderTableBody}
                    changeDisplayTen={this.changeDisplayTen}
                />
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