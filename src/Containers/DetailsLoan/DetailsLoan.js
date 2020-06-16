import React, {Component} from 'react'
import './DetailsLoan.scss'
import {connect} from 'react-redux'
import ReactLightCalendar from '@lls/react-light-calendar'
import LoanInputs from '../../Components/CreateLoan/LoanInputs'
import Tooltip from 'react-simple-tooltip'
import {confirmAlert} from 'react-confirm-alert'
import AppPayout from '../../Components/AppPayout/AppPayout'
import {NavLink, Redirect} from 'react-router-dom'

class DetailsLoan extends Component {
    constructor() {
        super()

        const date = new Date()
        const startDate = date.getTime()
        this.state = {
            startDate,
            endDate: new Date(startDate).setDate(date.getDate() + 6),
            payoutIsOpen: false,
            paidItem: null,
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
            client: {
                id: 1,
                name: 'Иван Иванович Иванов',
                phone: '79999999999',
                user_id: 'user-1',
            },
            loansHistory: [
                {
                    id: 1,
                    amount: 100,
                    date: '01.07.2020',
                    type: 'Долг',
                    loans_id: 'loan1',
                },
                {
                    id: 2,
                    amount: 100,
                    date: '01.07.2020',
                    type: 'Долг',
                    loans_id: 'loan1',
                },
                {
                    id: 3,
                    amount: 100,
                    date: '01.07.2020',
                    type: 'Долг',
                    loans_id: 'loan1',
                },
                {
                    id: 4,
                    amount: 100,
                    date: '01.07.2020',
                    type: 'Долг',
                    loans_id: 'loan1',
                },
                {
                    id: 5,
                    amount: 100,
                    date: '01.07.2020',
                    type: 'Долг',
                    loans_id: 'loan1',
                },
                {
                    id: 6,
                    amount: 100,
                    date: '01.07.2020',
                    type: 'Долг',
                    loans_id: 'loan1',
                },
            ],
        }
    }

    onChange = (startDate, endDate) => this.setState({startDate, endDate})

    saveChanged = () => {

    }

    deletePayed = (payed) => {

    }

    deleteHandler = (payed) => {
        confirmAlert({
            title: 'Подтвердите действие',
            message: 'Вы уверены, что хотите удалить выплату?',
            buttons: [
                {
                    label: 'Да',
                    onClick: () => this.deletePayed(payed),
                },
                {
                    label: 'Нет',
                    onClick: () => {
                    },
                },
            ],
        })
    }

    interactWithPayout = (isOpen, paidItem) => {
        this.setState({
            payoutIsOpen: isOpen,
            paidItem,
        })
    }

    render() {
        if (this.props.isAuth)
            return (
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

                    <hr/>

                    <div className="row">
                        <div className="col-lg-6 col-md-8 col-10">
                            <div className={'links'}>
                                <div className={'link'}>
                                    <NavLink to={'/extract/extract1'}>
                                        <i className="fa fa-share-alt" aria-hidden="true"/>
                                        <span>Поделиться</span>
                                    </NavLink>
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
                            <Tooltip
                                customCss={`white-space: nowrap;`}
                                content="Здесь что-то должно быть написано, но я хз, что">
                                <i className="fa fa-question-circle-o fa-animate" aria-hidden="true"></i>
                            </Tooltip>
                        </div>
                    </div>

                    <hr/>

                    <h2 className={'mb-4'}>
                        История платежей
                    </h2>

                    <table className="table">
                        <thead className="thead">
                        <tr className={'table_dark'}>
                            <th scope="col">#</th>
                            <th scope="col">Дата платежа</th>
                            <th scope="col">Сумма</th>
                            <th scope="col">Тип</th>
                            <th scope="col">
                                <i className="fa fa-pencil-square-o" aria-hidden="true"/>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.loansHistory.map((element, index) => (
                                <tr key={element.id}>
                                    <th scope="row">{index}</th>
                                    <td>{element.date}</td>
                                    <td>{element.amount}</td>
                                    <td>{element.type}</td>
                                    <td>
                                        <i className="fa fa-pencil fa-animate mr-3" aria-hidden="true"
                                           onClick={() => this.interactWithPayout(true, element)}
                                        />
                                        <i className="fa fa-trash-o fa-animate" aria-hidden="true"
                                           onClick={() => this.deleteHandler(element)}/>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    <AppPayout
                        isEdit={true}
                        payoutIsOpen={this.state.payoutIsOpen}
                        paidItem={this.state.paidItem}
                        interactWithPayout={this.interactWithPayout}
                    />
                </div>
            )
        else
            return <Redirect to={'/'}/>
    }
}

function mapStateToProps(state) {
    return {
        isAuth: state.authReducer.isAuth,
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsLoan)