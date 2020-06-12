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
                                    <div className="col-md-6 col-xs-12">Дата возврата {element.expiration_at}</div>
                                    <div className="col-md-6  col-xs-12">Срок {element.issued_at} дней</div>
                                    <div className="col-md-6  col-xs-12">Имя</div>
                                    <div className="col-md-6  col-xs-12">{element.amount} р</div>
                                    <div className="col-12">Ставка {element.rate}%</div>
                                </div>
                                <div className={'loans-list__item-add'}>
                                    <p className={'mr-2'}>Добавить выплату</p>
                                    <span onClick={() => this.props.interactWithPayout(true, element)} className={'dagger dagger_add'}></span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}