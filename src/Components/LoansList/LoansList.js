import React, {Component} from 'react'
import './LoansList.scss'

export default class LoansList extends Component {
    render() {
        return (
            <div className={'loans-list'}>
                <div className={'loans-list__content'}>
                    {
                        this.props.loans.map(element => (
                            <div key={element.id} className={'loans-list__item'}>
                                <div className="row">
                                    <div className="col-md-6  col-xs-12"><b>Имя</b></div>
                                    <div className="col-md-6  col-xs-12"><b>Номер</b></div>
                                    <div className="col-md-6 col-xs-12 d-flex">Дата возврата {element.expiration_at}</div>
                                    <div className="col-md-6  col-xs-12">Срок {element.issued_at} дней</div>

                                    <div className="col-md-6  col-xs-12">{element.amount} р</div>
                                    <div className="col-12">Ставка {element.rate}%</div>
                                </div>
                                <div className="button-section mt-4">
                                    <button className="btn btn-secondary">Подробности</button>
                                    <button className="btn btn-success"
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