import React, {Component} from 'react'
import './AddPayout.scss'
import ReactLightCalendar from '@lls/react-light-calendar'

export default class AddPayout extends Component {
    constructor() {
        super()
        this.amount = React.createRef()
        this.selectId = React.createRef()
        this.state = {
            currentWin: 'date',
            startDate: new Date().getTime(),
            endDate: new Date().getTime(),
            amountIsValid: true,
        }
    }

    onClose = () => {
        this.props.interactWithPayout(false, null)
    }

    changeWindow = (win) => {
        this.setState({
            currentWin: win,
        })
    }

    payed = async () => {
        await this.setState({
            amountIsValid: this.amount.current.value.replace(/\s+/g, '') !== '',
        })

        if (this.state.amountIsValid) {
            const data = {
                amount: this.amount.current.value,
                type: this.selectId.current.value,
                data: new Date(this.state.startDate),
                loans_id: this.props.paidItem.loan.id
            }
            console.log(data)
        }
    }

    renderCalendar = () => {
        return (
            <>
                <h4 className={'mb-4'}>Выберите дату платежа</h4>
                <ReactLightCalendar startDate={this.state.startDate}
                                    onChange={this.onChange}/>
                <button className={'btn btn-primary mt-4'} disabled={this.props.clientInfo === null}
                        onClick={() => {
                            this.changeWindow('input')
                        }}>
                    Далее<i className="fa fa-arrow-right ml-3" aria-hidden="true"/>
                </button>
            </>
        )
    }

    renderInputs = () => {
        return (
            <>
                <h4 className={'mb-4'}>Заёмщик {this.props.paidItem.client.name}</h4>
                <div className={'input-section__input'}>
                    <label>Сумма</label>
                    <input
                        className={`input-section__input ${!this.state.amountIsValid ? 'input-error': ''}`}
                        defaultValue={this.props.isEdit ? this.props.paidItem.amount : null} ref={this.amount}
                        type="number"/>
                </div>
                <small className={this.state.amountIsValid ? 'hide mb-4' : 'error'}>Сумма не может быть пустой!</small>
                <div className={'input-section__input'}>
                    <label>Тип платежа</label>
                    <div className={'select'}>
                        <select ref={this.selectId} className="select__content">
                            <option value={'PROCENT'}>Проценты</option>
                            <option value={'DEBT'}>Долг</option>
                        </select>
                    </div>
                </div>
                <div className={'button-section mt-4'}>
                    <button className={'btn btn-primary'} onClick={() => {
                        this.changeWindow('date')
                    }}>
                        Назад<i className="fa fa-arrow-left ml-3" aria-hidden="true"/>
                    </button>
                    <button className={'btn btn-success mr-0'} onClick={this.payed}>
                        Добавить платёж<i className="fa fa-credit-card ml-3" aria-hidden="true"/>
                    </button>
                </div>
            </>
        )
    }

    onChange = (startDate, endDate) => {
        //console.log(startDate, endDate)
        this.setState({startDate})
    }

    render() {
        if (this.props.payoutIsOpen) {
            return (
                <>
                    <div className={'add-payout'}>
                        <span className="dagger dagger_delete ml-auto" onClick={this.onClose}/>
                        <div className="input-section">
                            {
                                this.state.currentWin === 'date'
                                    ? this.renderCalendar()
                                    : this.renderInputs()
                            }
                        </div>
                    </div>
                    <div className={'bg'} onClick={this.onClose}/>
                </>
            )
        } else
            return null
    }
}