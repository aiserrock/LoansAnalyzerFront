import React, {Component} from 'react'
import './ProgressBar.scss'
import {Progress} from 'react-sweet-progress'

export default class ProgressBar extends Component {
    render(){
        return(
            <div className="payout-progress-bar">
                <h2 className={'mb-4'}>Прогресс по погашению займа</h2>
                <Progress
                    percent={69}
                />
                <div className={'row mt-2'}>
                    <div className="col-lg-6 col-xs-12">
                        Осталось дней:
                        <b className={'text-success ml-2 mr-2'}>
                            {Math.ceil(Math.abs( this.props.endDate - new Date().getTime()) / (1000 * 3600 * 24))}
                        </b>
                    </div>
                    <div className="col-lg-6 col-xs-12">
                        К возврату <b className={'text-primary ml-2 mr-2'}>4000</b> ₽
                    </div>
                </div>
            </div>
        )
    }
}