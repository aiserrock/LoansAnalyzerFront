import React, {Component} from 'react'
import './LoansList.scss'
import {NavLink} from 'react-router-dom'

export default class LoansList extends Component {
    render() {
        return (
            <div className={'loans-list'}>
                <div className={'loans-list__content'}>
                    {
                        this.props.loans.map(element => (
                            <div key={element.id} className={'loans-list__item'}>
                                <div className="row">
                                    <div className="col-md-7  col-xs-12"><b>Имя</b></div>
                                    <div className="col-md-5  col-xs-12"><b>Номер</b></div>
                                    <div className="col-md-7 col-xs-12">Дата возврата: {element.expiration_at}</div>
                                    <div className="col-md-5 col-xs-12">Срок {element.issued_at} дней</div>
                                    <div className="col-md-7  col-xs-12">Сумма {element.amount} р</div>
                                    <div className="col-md-5  col-xs-12">Ставка {element.rate}%</div>
                                </div>
                                <div className="button-section mt-4">
                                    <NavLink to={`/details-loan/${element.id}`} className="btn btn-outline-dark">Подробности</NavLink>
                                    <button className="btn btn-outline-dark"
                                            onClick={() => this.props.interactWithPayout(true, element)}
                                    >
                                        Добавить выплату</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}