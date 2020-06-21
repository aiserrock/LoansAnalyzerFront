import React, {Component} from 'react'
import './PaymentSchedule.scss'
import HistoryController from '../../controllers/HistoryController'
import toaster from 'toasted-notes'

export default class PaymentSchedule extends Component {
    state: {
        data: {},
    }

    componentDidMount = async () => {
        this.setState({
            data: await HistoryController.prototype.getHistoryReport(this.props.match.params.number)
        })
    }

    copyURL = () => {
        navigator.clipboard.writeText(document.location)
        toaster.notify('Ссылка скопирована!', {
            position: 'bottom-right',
            duration: 3000,
        })
    }

    renderContent = () => {
        return (
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
        )
    }

    render(){
        console.log(this.state)
        return(
            <div className={'payment-schedule'}>
                <h1 className={'mb-5'}>
                    График выплат
                    <i onClick={this.copyURL} className="fa fa-files-o fa-animate ml-3" aria-hidden="true"></i>
                </h1>

                {
                    this.state && Object.keys(this.state.data).length !== 0
                        ? this.renderContent()
                        : null
                }
            </div>
        )
    }
}