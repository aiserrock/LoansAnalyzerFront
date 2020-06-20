import React, {Component} from 'react'
import './CreateLoan.scss'
import ReactLightCalendar from '@lls/react-light-calendar'
import InputsDetails from './InputsDetails'
import SelectUser from './SelectUser'

export default class CreateLoan extends Component {
    constructor() {
        super()
        const date = new Date()
        const startDate = date.getTime()
        this.state = {
            currentWin: 'date',
            startDate,
            endDate: new Date(startDate).setDate(date.getDate() + 6),
            clientInfo: null
        }
    }

    onClose = () => {
        this.props.interactWithCreateLoan()
        this.setState({
            currentWin: 'date',
        })
    }

    selectClient = (client) => {
        this.setState({clientInfo: client})
    }

    onChange = (startDate, endDate) => this.setState({startDate, endDate})

    changeWindow = (win) => {
        this.setState({
            currentWin: win,
        })
    }

    payed = (data) => {
        data = {
           ...data,
            created_at: new Date(),
            issued_at: new Date(this.state.startDate),
            expiration_at: new Date(this.state.endDate),
            clients_id: this.state.clientInfo.id
        }
        this.props.createLoan(data)
        this.onClose()
    }

    renderInputDate = () => {
        return (
            <>
                <h4 className={'mb-4'}>Укажите период займа</h4>
                <ReactLightCalendar startDate={this.state.startDate} endDate={this.state.endDate}
                                    onChange={this.onChange} range/>
                <button className={'btn btn-primary mt-4'} onClick={() => {
                    this.changeWindow('select')
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
                                                <InputsDetails
                                                    payed={this.payed}
                                                    changeWindow={this.changeWindow}
                                                    isEdit={false}
                                                    changeSuccess={this.props.changeSuccess}
                                                />
                                            </>
                                            : this.state.currentWin === 'select'
                                                ?
                                                <div className={'create-loan__select'}>
                                                    <h4 className={'mb-4'}>Выберите заёмщика</h4>
                                                    <SelectUser
                                                        changeWindow={this.changeWindow}
                                                        selectClient={this.selectClient}
                                                        clientInfo={this.state.clientInfo}
                                                        token={this.props.token}
                                                        isEdit={false}
                                                    />
                                                </div>
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