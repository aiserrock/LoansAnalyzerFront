import React, {Component} from 'react'
import './CreateLoan.scss'
import ReactLightCalendar from '@lls/react-light-calendar'
import '@lls/react-light-calendar/dist/index.css'

export default class CreateLoan extends Component {
    constructor() {
        super()
        this.fio = React.createRef()
        this.numberPhone = React.createRef()
        this.sum = React.createRef()
        this.term = React.createRef()
        this.income = React.createRef()
        this.term_delay = React.createRef()
        this.purpose = React.createRef()
        const date = new Date()
        const startDate = date.getTime()
        this.state = {
            currentWin: 'date',
            startDate,
            endDate: new Date(startDate).setDate(date.getDate() + 6),
        }
    }

    onClose = () => {
        this.props.interactWithCreateLoan()
        this.setState({
            currentWin: 'date'
        })
    }

    onChange = (startDate, endDate) => this.setState({startDate, endDate})

    changeWindow = (win) => {
        this.setState({
            currentWin: win
        })
    }

    payed = () => {

    }

    renderInputs = () => {
        return (
            <>
                <h4 className={'mb-4'}>Укажите подробности</h4>

                <div className={'add-payout__input'}>
                    <label>ФИО</label>
                    <input ref={this.fio} type="text"/>
                </div>
                <div className={'add-payout__input'}>
                    <label>Телефон</label>
                    <input ref={this.numberPhone} type="text"/>
                </div>
                <div className={'add-payout__input'}>
                    <label>Сумма займа</label>
                    <input ref={this.sum} type="number"/>
                </div>
                <div className={'add-payout__input'}>
                    <label>Срок займа</label>
                    <input ref={this.term} type="number"/>
                </div>
                <div className={'add-payout__input'}>
                    <label>Доход</label>
                    <input ref={this.income} type="number"/>
                </div>
                <div className={'add-payout__input'}>
                    <label>Ставка при просрочке</label>
                    <input ref={this.term_delay} type="number"/>
                </div>
                <div className={'add-payout__input'}>
                    <label>Цель займа</label>
                    <textarea
                        ref={this.purpose} cols="30" rows="5">
                                    </textarea>
                </div>

                <div className="button-section">
                    <button className={'btn btn-primary mt-4'} onClick={() => {
                        this.changeWindow('date')
                    }}>
                        Назад<i className="fa fa-arrow-left ml-3" aria-hidden="true"/>
                    </button>
                    <button className={'btn btn-success mt-4'} onClick={this.payed}>
                        Создать займ<i className="fa fa-credit-card ml-3" aria-hidden="true"/>
                    </button>
                </div>
            </>
        )
    }

    renderInputDate = () => {
        return (
            <>
                <h4 className={'mb-4'}>Укажите период займа</h4>
                <ReactLightCalendar startDate={this.state.startDate} endDate={this.state.endDate}
                                    onChange={this.onChange} range displayTime/>
                <button className={'btn btn-primary mt-4'} onClick={() => {
                    this.changeWindow('input')
                }}>
                    Далее<i className="fa fa-arrow-right ml-3" aria-hidden="true"/>
                </button>
            </>
        )
    }

    render() {
        if (this.props.createLoanIsOpen) {
            return (
                <>
                    <div className={'create-loan'}>
                        <span className="dagger dagger_delete ml-auto" onClick={this.onClose}/>
                        <div className="add-payout__content">
                            {
                                this.state.currentWin === 'date'
                                    ? this.renderInputDate()
                                    : this.state.currentWin === 'input'
                                        ? this.renderInputs()
                                        : null
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