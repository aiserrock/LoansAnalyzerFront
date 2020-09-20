import React, {Component} from 'react'
import './LoansList.scss'
import {NavLink} from 'react-router-dom'
import NumberMusk from '../NumberMusk/NumberMusk'
import {getDate, getSum} from '../../store/universalFunctions'

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
                        ? this.props.loans.map(element => {
                            const difference = new Date(element.loan.expiration_at) - new Date().getTime()
                            const days = Math.ceil(difference < 0 ? 0 : difference / (1000 * 3600 * 24))
                            const overdue = days === 0
                            return (
                                <div key={element.loan.id} className={'loans-list__item'}>
                                    <div className="row">
                                        <div className="col-sm-7  col-12 mb-2"><b>{element.client.name}</b></div>
                                        <div className="col-sm-5  col-12 mb-2">
                                            <NumberMusk phone={element.client.phone}/>
                                        </div>
                                        <div
                                            className="col-sm-7 col-12 mb-2">Выдан {getDate(element.loan.issued_at)}</div>
                                        <div
                                            className="col-sm-5 col-12 mb-2">До {getDate(element.loan.expiration_at)}</div>
                                        <div className="col-sm-7  col-12 mb-2">
                                            Сумма {getSum(element.loan.amount)} ₽
                                        </div>
                                        <div className="col-md-5  col-xs-12  mb-2">Ставка {overdue
                                            ? <b className={'text-danger'}>
                                                {element.loan.increased_rate}%
                                            </b>
                                            : element.loan.rate + '%'}</div>
                                        <div className="col-sm-7  col-12 mb-2">
                                            Полученный доход
                                            <br/>
                                            <b className={'text-success'}>
                                                {getSum(element.loan.my_income || 0)} ₽
                                            </b>
                                        </div>
                                        <div className="col-md-5  col-xs-12  mb-4">
                                            Ожидаемый доход на сегодня
                                            <br/>
                                            <b className={'text-primary'}>
                                                {Math.round(Math.abs(element.loan.my_income_now) < 1 ? 0 : getSum(element.loan.my_income_now || 0))} ₽
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
                            )
                        })
                        : <>
                            <span className={'message'}>Ничего не найдено!</span>
                        </>
                }
            </div>
        )
    }
}