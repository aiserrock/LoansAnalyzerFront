import React, {Component} from 'react'
import './DetailsLoan.scss'
import {connect} from 'react-redux'
import ReactLightCalendar from '@lls/react-light-calendar'
import LoanInputs from '../../Components/CreateLoan/LoanInputs'

class DetailsLoan extends Component {
    constructor() {
        super();

        const date = new Date()
        const startDate = date.getTime()
        this.state = {
            startDate,
            endDate: new Date(startDate).setDate(date.getDate() + 6),
            loan: {
                id: 'loan1',
                amount: 10000,
                rate: 5,
                increased_rate: 10,
                goal: 'da',
                clients_id: 'client1',
                users_id: 'user1',
                created_at: '01.04.20',
                issued_at: 30,
                expiration_at: '01.05.20',
                status: 'fgd',
            },
            client:  {
                id: 1,
                name: 'Иван Иванович Иванов',
                phone: '79999999999',
                user_id: 'user-1',
            },
        }
    }

    onChange = (startDate, endDate) => this.setState({startDate, endDate})

    saveChanged = () => {

    }

    render(){
        return(
            <div className={'details-loan'}>
               <h1 className={'mb-5'}>Детали займа</h1>

                <div className="row">
                    <div className="col-lg-7 col-12 order-lg-1  order-2">
                        <LoanInputs
                            isEdit={true}
                            loan={this.state.loan}
                            client={this.state.client}
                        />
                    </div>
                    <div className="col-lg-5 col-12 order-lg-2 order-1 d-flex">
                       <div className={'calendar-loan mb-3'}>
                           <ReactLightCalendar
                               startDate={this.state.startDate}
                               endDate={this.state.endDate}
                               onChange={this.onChange} range
                           />
                       </div>
                    </div>
                </div>

                <button className={'btn btn-primary mt-4 mr-auto'} onClick={this.saveChanged}>
                    Сохранить
                </button>

                <div className="row mt-5">
                    <div className="col-lg-6 col-md-8 col-10">
                        <div className={'links'}>
                            <div className={'link'}>
                                <i className="fa fa-share-alt" aria-hidden="true"/>
                                <span>Поделиться</span>
                            </div>
                            <div className={'link'}>
                                <i className="fa fa-plus" aria-hidden="true"/>
                                <span>Составить график выплат</span>
                            </div>
                            <div className={'link'}>
                                <i className="fa fa-archive" aria-hidden="true"/>
                                <span>Архивировать займ</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-4 col-1 link__question">
                        <i className="fa fa-question-circle-o fa-animate" aria-hidden="true"></i>
                    </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return{

    }
}

function mapDispatchToProps(dispatch) {
    return{

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DetailsLoan)