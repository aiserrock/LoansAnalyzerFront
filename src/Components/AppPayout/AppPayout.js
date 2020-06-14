import React, {Component} from 'react'
import './AppPayout.scss'

export default class AppPayout extends Component {
    constructor() {
        super();
        this.debt = React.createRef()
        this.interest = React.createRef()
    }

    onClose = () => {
        this.props.interactWithPayout(false, null)
    }

    payed = () => {

    }

    render() {
        if (this.props.payoutIsOpen) {
            return (
                <>
                    <div className={'add-payout'}>
                        <span className="dagger dagger_delete ml-auto" onClick={this.onClose}/>
                        <div className="input-section">
                            <h4 className={'mb-4'}>Заёмщик: Имя </h4>
                            <div className={'input-section__input'}>
                                <label>Долг</label>
                                <input ref={this.debt} type="number"/>
                            </div>
                            <div className={'input-section__input'}>
                                <label>Проценты</label>
                                <input ref={this.interest} type="number"/>
                            </div>
                            <button className={'btn btn-success mt-4 ml-auto'} onClick={this.payed}>
                                Добавить платёж<i className="fa fa-credit-card ml-3" aria-hidden="true"/>
                            </button>
                        </div>
                    </div>
                    <div className={'bg'} onClick={this.onClose}/>
                </>
            )
        } else
            return null
    }
}