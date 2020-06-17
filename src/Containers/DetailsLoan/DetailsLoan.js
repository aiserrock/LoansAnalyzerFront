import React, {Component} from 'react'
import './DetailsLoan.scss'
import {connect} from 'react-redux'
import ReactLightCalendar from '@lls/react-light-calendar'
import InputsDetails from '../../Components/CreateLoan/InputsDetails'
import Tooltip from 'react-simple-tooltip'
import {confirmAlert} from 'react-confirm-alert'
import AppPayout from '../../Components/AppPayout/AppPayout'
import {NavLink, Redirect} from 'react-router-dom'
import SelectUser from '../../Components/CreateLoan/SelectUser'
import Table from '../../Components/Table/Table'
import {updateLoan} from '../../store/loans/loansActions'
import LoansController from '../../controllers/LoansController'
import ClientController from '../../controllers/ClientController'

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
            displayedTen: [],
            loan: {},
            client: null,
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

    componentDidMount = async () => {
        const id = this.props.match.params.number

        const loan = await LoansController.prototype.getLoanById(this.props.token, id)
        const client = await ClientController.prototype.getClientById(this.props.token, loan.clients_id)

        this.setState({
            loan, client, startDate: new Date(loan.issued_at).getTime(), endDate: new Date(loan.expiration_at).getTime()
        })
    }

    saveChanged = (data) => {
        data = {
            ...data,
            created_at: new Date(),
            issued_at: this.state.startDate,
            expiration_at: this.state.endDate,
            clients_id: this.state.client.id
        }
        //this.props.updateLoan(data)
    }

    deletePayed = (payed) => {
        console.log(payed)
    }

    selectClient = (client) => {
        this.setState({clientInfo: client})
    }

    changeDisplayTen = (displayedTen) => {
        this.setState({
            displayedTen
        })
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
        )
    }

    render() {
        if (this.props.isAuth)
            return (
                <div className={'details-loan'}>
                    <h1 className={'mb-5'}>Детали займа</h1>

                    <div className="row">
                        <div className="col-lg-7 col-12 order-lg-1  order-2">
                            <InputsDetails
                                isEdit={true}
                                loan={this.state.loan}
                            />

                            <SelectUser
                                selectClient={this.selectClient}
                                isEdit={true}
                                clientInfo={this.state.client}
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
                                <i className="fa fa-question-circle-o fa-animate" aria-hidden="true"/>
                            </Tooltip>
                        </div>
                    </div>

                    <hr/>

                    <h2 className={'mb-4'}>
                        История платежей
                    </h2>

                    <Table
                        data={this.state.loansHistory}
                        getData={() => {}}
                        renderTableBody={this.renderTableBody}
                        changeDisplayTen={this.changeDisplayTen}
                        renderOptionButton={this.renderOptionButton}
                    />

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
        token: state.authReducer.data.access_token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateLoan: (id, data) => dispatch(updateLoan(id, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsLoan)