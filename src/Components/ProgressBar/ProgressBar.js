import React, {Component} from 'react'
import './ProgressBar.scss'
import {Progress} from 'react-sweet-progress'
import {getSum} from '../../store/universalFunctions'

export default class ProgressBar extends Component {

    render() {
        if (this.props.data) {
            const
                my_income_now = Math.round(Math.abs(this.props.data.my_income_now) < 1 ? 0 : this.props.data.my_income_now),
                el1 = this.props.data.amount + my_income_now, el2= this.props.data.amount - this.props.data.amount_of_dept,
                percent = Math.floor(el2 * 100 / el1),
                difference = this.props.endDate - new Date().getTime(),
                days = Math.ceil(difference / (1000 * 3600 * 24)),
                overdue = days === 0 ? 'overdue' : ''

            return (
                <div className={`payout-progress-bar ${overdue}`}>
                    <h2 className={'mb-4'}>Прогресс по погашению займа</h2>
                    <Progress
                        percent={percent}
                    />
                    <div className={'row mt-2 mb-3'}>
                        <div className="col-lg-4 col-xs-12">
                            {
                                days < 0
                                    ? <>
                                        Просрочен на:
                                        <b className={'text-danger ml-2'}>
                                            {-days} д
                                        </b>
                                    </>
                                    : <>
                                        Осталось дней:
                                        <b className={'text-danger ml-2'}>
                                            {days}
                                        </b>
                                    </>
                            }
                        </div>
                        <div className="col-lg-4 col-xs-12">
                            К возврату <b className={'text-primary ml-1'}>{getSum(this.props.data?.amount_of_dept ?? 0)}</b> ₽
                        </div>
                        <div className="col-lg-4 col-xs-12">
                            {my_income_now > 0 ? '+' : ''} <b className={'text-success'}>{getSum(my_income_now)}</b> ₽ на
                            сегодня
                        </div>
                    </div>
                    <div>
                        <h4>Доход: {getSum(this.props.data?.my_income ?? 0)} ₽</h4>
                    </div>
                </div>
            )
        } else
            return null
    }
}