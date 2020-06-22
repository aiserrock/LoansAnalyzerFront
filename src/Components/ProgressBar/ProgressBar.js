import React, {Component} from 'react'
import './ProgressBar.scss'
import {Progress} from 'react-sweet-progress'

export default class ProgressBar extends Component {

    render(){
        const percent = Math.round((this.props.amount - this.props.data.amount_of_dept) * 100 / this.props.amount)
        return(
            <div className="payout-progress-bar">
                <h2 className={'mb-4'}>Прогресс по погашению займа</h2>
                <Progress
                    percent={percent}
                />
                <div className={'row mt-2 mb-3'}>
                    <div className="col-lg-4 col-xs-12">
                        Осталось дней:
                        <b className={'text-success ml-2'}>
                            {Math.ceil(Math.abs( this.props.endDate - new Date().getTime()) / (1000 * 3600 * 24))}
                        </b>
                    </div>
                    <div className="col-lg-4 col-xs-12">
                        К возврату <b className={'text-primary ml-1'}>{Math.round(this.props.data.amount_of_dept)}</b> ₽
                    </div>
                    <div className="col-lg-4 col-xs-12">
                        + <b className={'text-danger'}>{Math.round(this.props.data.my_income_now)}</b> ₽ на сегодня
                    </div>
                </div>
                <div>
                    <h4>Доход: {Math.round(this.props.data.my_income)} ₽</h4>
                </div>
            </div>
        )
    }
}