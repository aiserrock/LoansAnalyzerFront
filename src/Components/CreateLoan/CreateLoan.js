import React, {Component} from 'react'
import './CreateLoan.scss'

export default class CreateLoan extends Component {
    constructor() {
        super();
        this.debt = React.createRef()
        this.interest = React.createRef()
    }

    payed = () => {

    }

    render() {
        if (this.props.createLoanIsOpen) {
            return (
                <>
                    <div className={'create-loan'}>
                        <span className="dagger dagger_delete" onClick={this.props.interactWithCreateLoan}/>
                        <div className="add-payout__content">
                            <h4>Создать займ </h4>
                            <div className={'add-payout__input mb-2'}>
                                <label htmlFor="">Долг</label>
                                <input ref={this.debt} type="number"/>
                            </div>
                            <div className={'add-payout__input'}>
                                <label htmlFor="">Проценты</label>
                                <input ref={this.interest} type="number"/>
                            </div>
                            <button className={'btn btn-success mt-4'} onClick={this.payed}>
                                Добавить платёж<i className="fa fa-credit-card ml-3" aria-hidden="true"/>
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