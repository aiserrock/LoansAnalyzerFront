import React, {Component} from 'react'
import './AddPayout.scss'
import ReactLightCalendar from '@lls/react-light-calendar'

export default class AddPayout extends Component {
    constructor() {
        super()
        this.amount = React.createRef()
        this.selectId = React.createRef()
    }

    state = {
        currentWin: 'date',
        date: new Date().getTime(),
        amountIsValid: true,
        editing: false
    }

    onClose = () => {
        this.props.interactWithPayout(false, null)
        this.setState({
            currentWin: 'date',
            date: new Date().getTime(),
            editing: false
        })
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
                date: new Date(this.state.date),
                loans_id: this.props.paidItem.loan.id,
            }
            if (this.props.isEdit)
                await this.props.updateHistory(this.props.paidItem.loan.id, data)
            else
                await this.props.createPayout(data)
            if (this.props.payoutIsCreated) {
                this.onClose()
            }
        }
    }

    onChange = (date) => {
        this.setState({
            date,
            editing: this.props.isEdit
        })
    }

    renderCalendar = () => {
        return (
            <>
                <h4 className={'mb-4'}>Выберите дату платежа</h4>
                <ReactLightCalendar startDate={
                   this.props.isEdit && !this.state.editing ? new Date(this.props.paidItem.loan.date).getTime() : this.state.date
                } onClickDate={this.onChange}/>
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
                <h4 className={'mb-4'}>Заёмщик: {this.props.paidItem.client.name}</h4>
                <div className={'input-section__input'}>
                    <label>Сумма</label>
                    <input
                        className={`input-section__input ${!this.state.amountIsValid ? 'input-error' : ''}`}
                        defaultValue={this.props.isEdit ? parseInt(this.props.paidItem.loan.amount) : null}
                        ref={this.amount}
                        type="number"/>
                </div>
                <small className={this.state.amountIsValid ? 'hide mb-4' : 'error'}>Сумма не может быть пустой!</small>
                <div className={'input-section__input'}>
                    <label>Тип платежа</label>
                    <div className={'select'}>
                        <select defaultValue={this.props.isEdit ? this.props.paidItem.loan.type : ''}
                                ref={this.selectId}
                                className="select__content">
                            <option value={'PROCENT'}>Проценты</option>
                            <option value={'DEPT'}>Долг</option>
                        </select>
                    </div>
                </div>
                <small className={this.props.payoutIsCreated ? 'hide mb-4' : 'error'}>Проверьте введённые
                    данные!</small>
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