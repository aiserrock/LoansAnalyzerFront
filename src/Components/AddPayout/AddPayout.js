import React, {Component} from 'react'
import './AddPayout.scss'
import ReactLightCalendar from '@lls/react-light-calendar'
import toaster from 'toasted-notes'
import {getFullDate} from '../../store/universalFunctions'

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
        editing: false,
    }

    onClose = () => {
        this.props.interactWithPayout(false, null, false)
        this.setState({
            currentWin: 'date',
            date: new Date().getTime(),
            editing: false,
        })
    }

    changeWindow = (win) => {
        this.setState({
            currentWin: win,
        })
    }

    payed = async () => {
        await this.setState({
            amountIsValid: this.amount.current.value > 0,
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
                this.props.isEdit
                    ? toaster.notify('Выплата отредактирована!', {
                        position: 'bottom-right',
                        duration: 3000,
                    })
                    : toaster.notify('Выплата добавлена!', {
                        position: 'bottom-right',
                        duration: 3000,
                    })
                this.onClose()
            }
        }
    }

    onChange = (date) => {
        this.setState({
            date,
            editing: this.props.isEdit,
        })
    }

    renderCalendar = () => {
        let date
        if (this.props.isEdit && !this.state.editing) {
            date = getFullDate(this.props.paidItem.loan.date)
        } else {
            date = this.state.date
        }
        return (
            <>
                <h4 className={'mb-4'}>Выберите дату платежа</h4>
                <ReactLightCalendar
                    startDate={date}
                    onClickDate={this.onChange}
                    monthLabels={['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август',
                        'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']}
                    dayLabels={['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']}
                />
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
                    <span className={'input-section__unit'}>₽</span>
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
                        {
                            this.props.isEdit ? 'Редактировать платёж' : 'Добавить платёж'
                        }
                        <i className="fa fa-credit-card ml-3" aria-hidden="true"/>
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