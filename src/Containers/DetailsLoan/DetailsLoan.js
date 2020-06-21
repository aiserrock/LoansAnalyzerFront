import React, {Component} from 'react'
import './DetailsLoan.scss'
import {connect} from 'react-redux'
import ReactLightCalendar from '@lls/react-light-calendar'
import InputsDetails from '../../Components/CreateLoan/InputsDetails'
import Tooltip from 'react-simple-tooltip'
import {confirmAlert} from 'react-confirm-alert'
import AddPayout from '../../Components/AddPayout/AddPayout'
import {NavLink, Redirect} from 'react-router-dom'
import {updateLoan} from '../../store/loans/loansActions'
import LoansController from '../../controllers/LoansController'
import ClientController from '../../controllers/ClientController'
import toaster from 'toasted-notes'
import {deleteHistoryLoanById, updateHistory} from '../../store/history/historyActions'
import HistoryController from '../../controllers/HistoryController'
import Table from '../../Components/Table/Table'
import {getIndexById} from '../../store/universalFunctions'
import {Progress} from 'react-sweet-progress'
import BigPreloader from '../../Components/Preloaders/BigPreloader'

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
            loan: {},
            client: null,
            loansHistory: [],
            displayedTen: [],
            activeTen: 0,
            loading: true,
        }
    }

    componentDidMount = async () => {
        const id = this.props.match.params.number
        const loan = await LoansController.prototype.getLoanById(this.props.token, id)
        const client = await ClientController.prototype.getClientById(this.props.token, loan.clients_id)

        if (id && loan && client)
            await this.setState({
                loan,
                client,
                startDate: new Date(loan.issued_at).getTime(),
                endDate: new Date(loan.expiration_at).getTime(),
                loading: false,
            })
    }

    changeActiveTen = (activeTen) => {
        this.setState({
            activeTen: activeTen,
        })
    }

    changeDisplayedTen = () => {
        const num = this.state.activeTen * 10
        const displayedTen = []
        for (let i = num; i < num + 10; i++) {
            if (this.state.loansHistory[i])
                displayedTen.push(this.state.loansHistory[i])
            else break
        }
        this.setState({
            displayedTen,
        })
    }

    onChange = (startDate, endDate) => this.setState({startDate, endDate})

    getHistoryLoans = async (skip) => {
        const id = this.props.match.params.number
        const loansHistory = await HistoryController.prototype.getAllHistoryLoansById(this.props.token, id, skip)
        this.setState({
            loansHistory,
        })
    }

    saveChanged = (data) => {
        data = {
            ...data,
            created_at: new Date(),
            issued_at: new Date(this.state.startDate),
            expiration_at: new Date(this.state.endDate),
        }
        this.props.updateLoan(this.state.loan.id, data)
        toaster.notify('Изменения сохранены!', {
            position: 'bottom-right',
            duration: 3000,
        })
    }

    deleteHandler = (id) => {
        confirmAlert({
            title: 'Подтвердите действие',
            message: 'Вы уверены, что хотите удалить выплату?',
            buttons: [
                {
                    label: 'Да',
                    onClick: () => {
                        this.props.deleteHistoryLoanById(id)
                        toaster.notify('Выплата удалена', {
                            position: 'bottom-right',
                            duration: 3000,
                        })
                        const loans = this.state.loansHistory
                        const index = getIndexById(loans, id)
                        loans.splice(index, 1)
                        this.setState({
                            loansHistory: loans,
                        })
                        this.changeDisplayedTen()
                    },
                },
                {
                    label: 'Нет',
                    onClick: () => {
                    },
                },
            ],
        })
    }

    interactWithPayout = (isOpen, loan) => {
        this.setState({
            payoutIsOpen: isOpen,
            paidItem: {
                loan, client: this.state.client,
            },
        })
    }

    updateHistory = (id, data) => {
        this.props.updateHistory(id, data)
        const index = getIndexById(this.state.loansHistory, id)
        const Id = this.state.loansHistory[index].id
        data.id = Id
        this.state.loansHistory[index] = data
        this.changeDisplayedTen()
    }

    archived = () => {
        confirmAlert({
            title: 'Подтвердите действие',
            message: 'Вы уверены, что хотите архивировать займ?',
            buttons: [
                {
                    label: 'Да',
                    onClick: () => {
                        const data = this.state.loan
                        data.status = 'archived'
                        this.props.updateLoan(data.id, data)
                        toaster.notify('Займ успешно архивирован!', {
                            position: 'bottom-right',
                            duration: 3000,
                        })
                    },
                },
                {
                    label: 'Нет',
                    onClick: () => {
                    },
                },
            ],
        })
    }

    renderTableBody = () => {
        return (
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
                    this.state.displayedTen.map((element, index) => (
                        <tr key={element.id}>
                            <td><b>{this.state.activeTen * 10 + index + 1}</b></td>
                            <td>{new Date(element.date).toLocaleDateString()}</td>
                            <td>{element.amount}</td>
                            <td>{element.type === 'PROCENT' ? 'Проценты' : 'Долг'}</td>
                            <td>
                                <i className="fa fa-pencil fa-animate mr-3" aria-hidden="true"
                                   onClick={() => this.interactWithPayout(true, element)}
                                />
                                <i className="fa fa-trash-o fa-animate" aria-hidden="true"
                                   onClick={() => this.deleteHandler(element.id)}/>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        )
    }

    renderContent = () => {
        return (
            <>
                <h1 className={'mb-5'}>Детали займа</h1>

                <div className="payout-progress-bar">
                    <h2 className={'mb-4'}>Прогресс по погашению займа</h2>
                    <Progress
                        percent={69}
                    />
                    <div className={'row mt-2'}>
                        <div className="col-lg-6 col-xs-12">
                            Осталось дней:
                            <b className={'text-success ml-2 mr-2'}>
                                {Math.ceil(Math.abs(new Date().getTime() - this.state.startDate) / (1000 * 3600 * 24))}
                            </b>
                        </div>
                        <div className="col-lg-6 col-xs-12">
                            К возврату <b className={'text-primary ml-2 mr-2'}>4000</b> ₽
                        </div>
                    </div>
                </div>

                <hr/>

                <h2 className={'mb-5'}>Информация о займе</h2>

                <div className="row">
                    <div className="col-lg-7 col-12 order-lg-1  order-2">
                        <div className={'input-section'}>
                            <div className={'input-section__input'}>
                                <label>ФИО заёмщика*</label>
                                <input type="text" defaultValue={this.state.client?.name} className={'non-click'}/>
                            </div>
                            <div className={'input-section__input'}>
                                <label>Номер заёмщика*</label>
                                <input type="text" defaultValue={this.state.client?.phone} className={'non-click'}/>
                            </div>
                        </div>
                        <InputsDetails
                            payed={this.saveChanged}
                            isEdit={true}
                            loan={this.state.loan}
                        />
                    </div>
                    <div className="col-lg-5 col-12 order-lg-2 order-1 d-flex">
                        <div className={'mb-3'}>
                            <ReactLightCalendar
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                onChange={this.onChange} range
                            />
                        </div>
                    </div>
                </div>

                <hr/>

                <h2 className={'mb-4'}>Вы можете</h2>

                <div className="row">
                    <div className="col-lg-6 col-md-8 col-10">
                        <div className={'links'}>
                            <div className={'link'}>
                                <NavLink to={`/extract/${this.state.loan.id}`}>
                                    <i className="fa fa-share-alt" aria-hidden="true"/>
                                    <span>Поделиться</span>
                                </NavLink>
                            </div>
                            <div className={'link'}>
                                <NavLink to={`/payment-schedule/${this.state.loan.id}`}>
                                    <i className="fa fa-plus" aria-hidden="true"/>
                                    <span>Составить график выплат</span>
                                </NavLink>
                            </div>
                            <div className={'link'} onClick={this.archived}>
                                <i className="fa fa-archive" aria-hidden="true"/>
                                <span>Архивировать займ</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-4 col-1 link__question">
                        <Tooltip
                            customCss={`white-space: nowrap;`}
                            content="Генерирует график платежей в виде таблицы.">
                            <i className="fa fa-question-circle-o fa-animate" aria-hidden="true"/>
                        </Tooltip>
                    </div>
                </div>

                <hr/>

                <h2 className={'mb-5'}>
                    История платежей
                </h2>

                <Table
                    data={this.state.loansHistory}
                    getData={this.getHistoryLoans}
                    renderTableBody={this.renderTableBody}
                    activeTen={this.state.activeTen}
                    changeActiveTen={this.changeActiveTen}
                    changeDisplayedTen={this.changeDisplayedTen}
                />

                <AddPayout
                    isEdit={true}
                    payoutIsOpen={this.state.payoutIsOpen}
                    paidItem={this.state.paidItem}
                    interactWithPayout={this.interactWithPayout}
                    updateHistory={this.updateHistory}
                    payoutIsCreated={this.props.payoutIsCreated}
                /></>
        )
    }


    render() {
        if (this.props.isAuth)
            return (
                <div className={'details-loan'}>
                    {
                        this.state.loading
                            ? <BigPreloader/>
                            : this.renderContent()
                    }
                </div>
            )
        else
            return <Redirect to={'/'}/>
    }
}

function mapStateToProps(state) {
    return {
        isAuth: state.authReducer.isAuth,
        token: state.authReducer.data.access_token,
        payoutIsCreated: state.historyReducer.payoutIsCreated,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateLoan: (id, data) => dispatch(updateLoan(id, data)),
        updateHistory: (id, data) => dispatch(updateHistory(id, data)),
        deleteHistoryLoanById: (id) => dispatch(deleteHistoryLoanById(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsLoan)