import React, {Component} from 'react'
import './CreateLoan.scss'

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
    }

    payed = () => {

    }

    render() {
        if (this.props.createLoanIsOpen) {
            return (
                <>
                    <div className={'create-loan'}>
                        <span className="dagger dagger_delete ml-auto" onClick={this.props.interactWithCreateLoan}/>
                        <div className="add-payout__content">
                            <h4 className={'mb-4'}>Создать займ</h4>

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


                            <button className={'btn btn-success mt-4 ml-auto'} onClick={this.payed}>
                                Создать займ<i className="fa fa-credit-card ml-3" aria-hidden="true"/>
                            </button>
                        </div>
                    </div>
                    <div className={'bg'} onClick={this.props.interactWithCreateLoan}/>
                </>
            )
        } else
            return null
    }
}