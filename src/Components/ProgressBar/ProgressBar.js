import React, {Component} from 'react'
import './ProgressBar.scss'
import {Progress} from 'react-sweet-progress'

export default class ProgressBar extends Component {

    render() {
        if (this.props.data) {
            const percent = Math.round((this.props.data.amount - this.props.data.amount_of_dept) * 100 / this.props.data.amount ?? 0)
            const difference =  this.props.endDate - new Date().getTime()
            const days = Math.ceil( difference < 0 ? 0 : difference / (1000 * 3600 * 24))
            const overdue = days === 0 ? 'overdue' : ''

            return (
                <div className={`payout-progress-bar ${overdue}`}>
                    <h2 className={'mb-4'}>Прогресс по погашению займа</h2>
                    <Progress
                        percent={percent}
                    />
                    <div className={'row mt-2 mb-3'}>
                        <div className="col-lg-4 col-xs-12">
                            Осталось дней:
                            <b className={'text-danger ml-2'}>
                                {days}
                            </b>
                        </div>
                        <div className="col-lg-4 col-xs-12">
                            К возврату <b
                            className={'text-primary ml-1'}>{Math.round(this.props.data?.amount_of_dept ?? 0)}</b> ₽
                        </div>
                        <div className="col-lg-4 col-xs-12">
                            + <b className={'text-success'}>{Math.round(this.props.data?.my_income_now ?? 0)}</b> ₽ на
                            сегодня
                        </div>
                    </div>
                    <div>
                        <h4>Доход: {Math.round(this.props.data?.my_income ?? 0)} ₽</h4>
                    </div>
                </div>
            )
        } else
            return null
    }
}