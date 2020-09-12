import React, {Component} from 'react'
import './LoansList.scss'
import {NavLink} from 'react-router-dom'
import NumberMusk from '../NumberMusk/NumberMusk'

export default class LoansList extends Component {
    onScroll = (e) => {
        if (e.target.offsetHeight + e.target.scrollTop === e.target.scrollHeight) {
            if (this.props.increaseNumberElements !== null)
                this.props.increaseNumberElements()
        }
    }

    render() {
        return (
            <div className={'loans-list'} onScroll={this.onScroll}>
                {
                    this.props.loans.length !== 0
                        ? this.props.loans.map(element => (
                            <div key={element.loan.id} className={'loans-list__item'}>
                                <div className="row">
                                    <div className="col-sm-7  col-12 mb-2"><b>{element.client.name}</b></div>
                                    <div className="col-sm-5  col-12 mb-2">
                                        <NumberMusk phone={element.client.phone}/>
                                    </div>
                                    <div
                                        className="col-sm-7 col-12 mb-2">Выдан {new Date(element.loan.issued_at).toLocaleDateString()}</div>
                                    <div
                                        className="col-sm-5 col-12 mb-2">До {new Date(element.loan.expiration_at).toLocaleDateString()}</div>
                                    <div className="col-sm-7  col-12 mb-2">
                                        Сумма {element.loan.amount} ₽
                                    </div>
                                    <div className="col-md-5  col-xs-12  mb-2">Ставка {element.loan.rate}%</div>
                                    <div className="col-sm-7  col-12 mb-2">
                                        Доход
                                        <br/>
                                        <b className={'text-success'}>
                                            {Math.round(element.loan.my_income || 0)} ₽
                                        </b>
                                    </div>
                                    <div className="col-md-5  col-xs-12  mb-4">
                                        На сегодня
                                        <br/>
                                        <b className={'text-primary'}>
                                            {Math.round(element.loan.my_income_now || 0)} ₽
                                        </b>
                                    </div>
                                </div>
                                <div className="button-section">
                                    <NavLink to={`/details-loan/${element.loan.id}`}
                                             className="btn btn-outline-dark">Подробности</NavLink>
                                    <button className="btn btn-outline-dark"
                                            onClick={() => this.props.interactWithPayout(true, element)}
                                    >
                                        Добавить выплату
                                    </button>
                                </div>
                            </div>
                        ))
                        : <>
                            <span className={'message'}>Ничего не найдено!</span>
                        </>
                }
            </div>
        )
    }
}