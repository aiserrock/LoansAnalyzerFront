import React, {Component} from 'react'
import './LoansList.scss'
import {NavLink} from 'react-router-dom'
import {getDate} from '../../store/universalFunctions'

export default class LoansList extends Component {
    onScroll = (e) => {
        if (e.target.offsetHeight + e.target.scrollTop === e.target.scrollHeight) {
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
                                    <div className="col-md-7  col-xs-12"><b>{element.client.name}</b></div>
                                    <div className="col-md-5  col-xs-12"><b>{element.client.phone}</b></div>
                                    <div className="col-md-5 col-xs-12">Выдано в {getDate(element.loan.issued_at)}</div>
                                    <div className="col-md-7 col-xs-12">Истечение в {getDate(element.loan.expiration_at)}</div>
                                    <div className="col-md-7  col-xs-12">Сумма {element.loan.amount} р</div>
                                    <div className="col-md-5  col-xs-12">Ставка {element.loan.rate}%</div>
                                </div>
                                <div className="button-section mt-4">
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
                            <span className={'message'}>Укажите параметры и нажмите "Поиск"</span>
                        </>
                }
            </div>
        )
    }
}