import React, {Component} from 'react'
import './DetailsLoan.scss'
import {connect} from 'react-redux'
import ReactLightCalendar from '@lls/react-light-calendar'
import InputsDetails from '../../Components/CreateLoan/InputsDetails'
import {confirmAlert} from 'react-confirm-alert'
import AddPayout from '../../Components/AddPayout/AddPayout'
import {NavLink} from 'react-router-dom'
import {updateLoan} from '../../store/loans/loansActions'
import LoansController from '../../controllers/LoansController'
import ClientController from '../../controllers/ClientController'
import toaster from 'toasted-notes'
import {createPayout, deleteHistoryLoanById, updateHistory} from '../../store/history/historyActions'
import HistoryController from '../../controllers/HistoryController'
import Table from '../../Components/Table/Table'
import {getDate, getFullDate, getIndexById} from '../../store/universalFunctions'
import BigPreloader from '../../Components/Preloaders/BigPreloader'
import ProgressBar from '../../Components/ProgressBar/ProgressBar'
import {IMaskInput} from 'react-imask'
import Page404 from '../../Components/Page404/Page404'

class DetailsLoan extends Component {
    state = {
        startDate: '',
        endDate: '',
        payoutIsOpen: false,
        paidItem: null,
        loan: {},
        client: null,
        loansHistory: [],
        displayedTen: [],
        activeTen: 0,
        loading: true,
        paidIsEdit: false,
    }

    componentDidMount = async () => {
        await this.updateLoanData()
    }

    updateLoanData = async () => {
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

    onChange = (startDate, endDate) => {
        // console.log(new Date(startDate), new Date(endDate))
        // this.setState({
        //     startDate: startDate !== null ? startDate : this.state.startDate,
        //     endDate: endDate !== null ? endDate : this.state.endDate
        // })
        this.setState({
            startDate: startDate,
            endDate: endDate,
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

    interactWithPayout = (isOpen, loan, paidIsEdit) => {
        this.setState({
            payoutIsOpen: isOpen,
            paidIsEdit,
            paidItem: {
                loan, client: this.state.client,
            },
        })
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
                        data.status = 'ARCHIVED'
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

    getHistoryLoans = async (skip) => {
        const id = this.props.match.params.number
        const loansHistory = await HistoryController.prototype.getAllHistoryLoansById(this.props.token, id, skip)
        this.setState({
            loansHistory,
        })
    }

    updateHistoryLoan = async () => {
        await this.getHistoryLoans(0)
        this.changeDisplayedTen()
    }

    deleteHandler = (id) => {
        confirmAlert({
            title: 'Подтвердите действие',
            message: 'Вы уверены, что хотите удалить выплату?',
            buttons: [
                {
                    label: 'Да',
                    onClick: async () => {
                        await this.props.deleteHistoryLoanById(id)
                        toaster.notify('Выплата удалена', {
                            position: 'bottom-right',
                            duration: 3000,
                        })
                        await this.updateHistoryLoan()
                        await this.updateLoanData()
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

    updateHistoryHandler = async (id, data) => {
        await this.props.updateHistory(id, data)
        await this.updateHistoryLoan()
        await this.updateLoanData()
    }

    createPayoutHandler = async (data) => {
        await this.props.createPayout(data)
        await this.updateHistoryLoan()
        await this.updateLoanData()
    }

    renderOptionButton = () => {
        return (
            <button
                className={'btn btn-secondary mr-auto ml-auto'}
                onClick={() => this.interactWithPayout(true, this.state.loan, false)}
            >
                Добавить выплату
            </button>
        )
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
                            <td>{getDate(element.date)}</td>
                            <td>{element.amount}</td>
                            <td>{element.type === 'PROCENT' ? 'Проценты' : 'Долг'}</td>
                            <td>
                                <i className="fa fa-pencil fa-animate mr-3" aria-hidden="true"
                                   onClick={() => this.interactWithPayout(true, element, true)}
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
        const startDate = new Date(this.state.startDate), endDate = new Date(this.state.endDate)
        return (
            <>
                <h1 className={'mb-5'}>Детали займа</h1>

                <ProgressBar
                    data={this.state.loan}
                    endDate={this.state.endDate}/>

                <button
                    className={'btn btn-primary mr-auto mt-4'}
                    onClick={() => this.interactWithPayout(true, this.state.loan, false)}
                >
                    Добавить выплату
                </button>
                <hr/>

                <h2 className={'mb-5'}>Информация о займе</h2>

                <div className="row">
                    <div className="col-lg-7 col-12 order-lg-1  order-2">
                        <div className={'details-loan__inputs'}>
                            <div className={'input-section'}>
                                <div className={'input-section__input'}>
                                    <label>ФИО заёмщика*</label>
                                    <input type="text" defaultValue={this.state.client?.name}
                                           className={'input-section__input non-click'}/>
                                </div>
                                <div className={'input-section__input'}>
                                    <label>Номер заёмщика*</label>
                                    <div className={'input-section__input non-click'}>

                                        <IMaskInput
                                            mask={'+{7}(000)000-00-00'}
                                            unmask={false}
                                            placeholder='+7 ('
                                            value={this.state.client?.phone}
                                        />
                                    </div>
                                </div>
                            </div>
                            <InputsDetails
                                payed={this.saveChanged}
                                isEdit={true}
                                loan={this.state.loan}
                            />
                        </div>
                    </div>

                    <div className="col-lg-5 col-12 order-lg-2 order-1 d-flex">
                        <div className={'mb-3'}>
                            <ReactLightCalendar
                                startDate={getFullDate(startDate.setDate(startDate.getDate()))}
                                endDate={getFullDate(endDate.setDate(endDate.getDate()))}
                                onChange={this.onChange} range
                                monthLabels={['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август',
                                    'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']}
                                dayLabels={['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']}
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
                            {/*<div className={'link'}>*/}
                            {/*    <i className="fa fa-plus" aria-hidden="true"/>*/}
                            {/*    <span>Составить график выплат</span>*/}
                            {/*</div>*/}
                            <div className={'link'} onClick={this.archived}>
                                <i className="fa fa-archive" aria-hidden="true"/>
                                <span>Архивировать займ</span>
                            </div>
                        </div>
                    </div>

                    {/*<div className="col-lg-6 col-md-4 col-1 link__question">*/}
                    {/*    <Tooltip*/}
                    {/*        customCss={`white-space: nowrap;`}*/}
                    {/*        content="Генерирует график платежей в виде таблицы.">*/}
                    {/*        <i className="fa fa-question-circle-o fa-animate" aria-hidden="true"/>*/}
                    {/*    </Tooltip>*/}
                    {/*</div>*/}
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
                    renderOptionButton={this.renderOptionButton}
                />

                <AddPayout
                    isEdit={this.state.paidIsEdit}
                    payoutIsOpen={this.state.payoutIsOpen}
                    paidItem={this.state.paidItem}
                    interactWithPayout={this.interactWithPayout}
                    updateHistory={this.updateHistoryHandler}
                    payoutIsCreated={this.props.payoutIsCreated}
                    createPayout={this.createPayoutHandler}
                />
            </>
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
            return <Page404/>
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
        createPayout: (data) => dispatch(createPayout(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsLoan)