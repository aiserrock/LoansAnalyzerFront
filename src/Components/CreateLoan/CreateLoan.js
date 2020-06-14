import React, {Component} from 'react'
import './CreateLoan.scss'
import ReactLightCalendar from '@lls/react-light-calendar'
import '@lls/react-light-calendar/dist/index.css'
import LoanInputs from './LoanInputs'

export default class CreateLoan extends Component {
    constructor() {
        super()
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
            currentWin: 'date',
        })
    }

    onChange = (startDate, endDate) => this.setState({startDate, endDate})

    changeWindow = (win) => {
        this.setState({
            currentWin: win,
        })
    }

    payed = () => {

    }

    renderInputDate = () => {
        return (
            <>
                <h4 className={'mb-4'}>Укажите период займа</h4>
                <ReactLightCalendar startDate={this.state.startDate} endDate={this.state.endDate}
                                    onChange={this.onChange} range/>
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
                                        ?
                                            <>
                                                <h4 className={'mb-4'}>Укажите подробности</h4>
                                                <LoanInputs
                                                    payed={this.payed}
                                                    changeWindow={this.changeWindow}
                                                    isEdit={false}
                                                />
                                            </>
                                        :
                                            null
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