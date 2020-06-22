import React, {Component} from 'react'
import {connect} from 'react-redux'
import './Loans.scss'
import LoansList from '../../Components/LoansList/LoansList'
import AddPayout from '../../Components/AddPayout/AddPayout'
import CreateLoan from '../../Components/CreateLoan/CreateLoan'
import {Redirect} from 'react-router-dom'
import {changeStatus, createLoan, getLoans, resetList} from '../../store/loans/loansActions'
import {debounce} from 'lodash'
import {createPayout} from '../../store/history/historyActions'

class Loans extends Component {
    constructor() {
        super()
        this.findLoan = React.createRef()
        this.state = {
            payoutIsOpen: false,
            createLoanIsOpen: false,
            paidItem: null,
            menuIsOpen: false,
        }
    }

    //Обработчик, взаимодействует с окном выплат
    interactWithPayout = (isOpen, paidItem) => {
        this.setState({
            payoutIsOpen: isOpen,
            paidItem,
        })
    }

    interactWithCreateLoan = () => {
        this.setState({
            createLoanIsOpen: !this.state.createLoanIsOpen,
        })
    }

    interactWithMenu = () => {
        this.setState({
            menuIsOpen: !this.state.menuIsOpen,
        })
    }

    // Делаем поиск при старте или авторизации
    componentDidMount() {
        if(this.props.isAuth)
            this.clearFind()
    }

    componentWillUnmount() {
        this.debounceClearFind.cancel()
    }

    // Меняем статус займов по радио кнопкам
    changeStatus = async (e) => {
        let status = e.target.id;
        if (status === 'without_status')
            status = null;
        await this.props.changeStatus(status)
        await this.clearFind()
    }

    // Поиск с задержкой при вводе в текстовое поле
    debounceClearFind = debounce(() => {
        this.clearFind();
    }, 800)

    // Поиск с предварительной очисткой списка
    clearFind = async () => {
        await this.props.resetList()
        await this.props.getLoans(this.props.loans.length, this.findLoan.current.value, this.props.status)
    }

    // Ведем поиск при прокрутке списка
    find = async () => {
        await this.props.getLoans(this.props.loans.length, this.findLoan.current.value, this.props.status)
    }

    renderFilters = () => {
        return (
            <div className={'loans-panel__panel'}>
                <div className={'loans-panel__filters'}>
                    <div className={'loans-panel__filters-title loans-panel__filters-title_h'}>
                    <span>
                        Фильтры
                    </span>
                    </div>

                    <label className="form-radio-hidden mt-4 mb-3">
                        <input checked={this.props.status === 'active'}
                               id="active"
                               onChange={this.changeStatus}
                               type="radio"/>
                        <span className="radio"/>
                        <span className="text">Активные</span>
                    </label>

                    <label className="form-radio-hidden mb-3">
                        <input checked={this.props.status === 'overdue'}
                               id="overdue"
                               onChange={this.changeStatus}
                               type="radio"/>
                        <span className="radio"/>
                        <span className="text">Просроченные</span>
                    </label>

                    <label className="form-radio-hidden">
                        <input checked={this.props.status === 'archived'}
                               id="archived"
                               onChange={this.changeStatus}
                               type="radio"/>
                        <span className="radio"/>
                        <span className="text">Возвращённые</span>
                    </label>
                </div>
                <div onClick={this.clearFind} className={'loans-panel__button'}>
                    Поиск
                </div>
            </div>
        )
    }

    renderOrderList = () => {
        return (
            <LoansList
                loans={this.props.loans}
                interactWithPayout={this.interactWithPayout}
                increaseNumberElements={this.props.isEndOfList ? null : this.find}
            />
        )
    }

    render() {
        if (this.props.isAuth) {
            return (
                <div className={'loans'}>
                    <h1 className={'mb-5'}>Займы</h1>

                    <button
                        className={'btn btn-outline-dark mr-auto'}
                        onClick={this.interactWithCreateLoan}
                    >
                        Добавить займ
                    </button>

                    <div className={'loans-panel'}>
                        <div className={'loans-panel__main'}>
                            <div className={'loans-panel__search'}>
                                <div className={'loans-panel__search-string'}>
                                    <input ref={this.findLoan} placeholder={'Поиск займа по ФИО или телефону'}
                                           onChange={this.debounceClearFind} type="text"/>
                                    <i className="fa fa-search fa-animate" aria-hidden="true" onClick={this.clearFind}/>
                                </div>
                                <div className={'loans-panel__search-select'}>
                                    <div
                                        onClick={this.interactWithMenu}
                                        className="toggle-menu d-block d-sm-none">
                                        ☰
                                    </div>
                                </div>
                            </div>
                            <div className={`d-block d-sm-none`}>
                                <div className={this.state.menuIsOpen ? 'loans-panel__menu-mobile' : 'd-none'}>
                                    {
                                        this.renderFilters()
                                    }
                                </div>
                                {
                                    this.state.menuIsOpen
                                        ? null
                                        : <div className={'loans-panel__content'}>
                                            {
                                                this.renderOrderList()
                                            }
                                        </div>
                                }
                            </div>
                            <div className={'d-none d-sm-block'}>
                                <div className={'loans-panel__content'}>
                                    {
                                        this.renderOrderList()
                                    }
                                </div>
                            </div>
                        </div>

                        <div className={'loans-panel__menu d-none d-sm-block'}>
                            {
                                this.renderFilters()
                            }
                        </div>
                    </div>
                    <table className="table text-center">
                        <thead>
                        <tr className={'table'}>
                            <th scope="col">Полученный доход</th>
                            <th scope="col">Ожидаемый доход</th>
                            <th scope="col">Просроченные займы</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><span className={'text-primary'}><b>3000 ₽</b></span></td>
                            <td><span className={'text-success'}><b>500 ₽</b></span></td>
                            <td><span className={'text-danger'}><b>0 ₽</b></span></td>
                            {/*<td><span className={'text-primary'}><b>{Math.round(this.props.statusBar.all_my_income)} ₽</b></span></td>*/}
                            {/*<td><span className={'text-success'}><b>{Math.round(this.props.statusBar.all_my_income_now)} ₽</b></span></td>*/}
                            {/*<td><span className={'text-danger'}><b>{Math.round(this.props.statusBar.all_overdue_amount)} ₽</b></span></td>*/}
                        </tr>
                        </tbody>
                    </table>


                    <AddPayout
                        isEdit={false}
                        payoutIsOpen={this.state.payoutIsOpen}
                        paidItem={this.state.paidItem}
                        interactWithPayout={this.interactWithPayout}
                        createPayout={this.props.createPayout}
                        payoutIsCreated={this.props.payoutIsCreated}
                    />
                    <CreateLoan
                        interactWithCreateLoan={this.interactWithCreateLoan}
                        createLoanIsOpen={this.state.createLoanIsOpen}
                        changeSuccess={this.props.changeSuccess}
                        createLoan={this.props.createLoan}
                        token={this.props.token}
                    />
                </div>
            )
        } else
            return <Redirect to={'/'}/>
    }
}

function mapStateToProps(state) {
    return {
        isAuth: state.authReducer.isAuth,
        loans: state.loansReducer.loans,
        isEndOfList: state.loansReducer.isEndOfList,
        status: state.loansReducer.status,
        changeSuccess: state.loansReducer.changeSuccess,
        payoutIsCreated: state.historyReducer.payoutIsCreated,
        token: state.authReducer.data.access_token,
        statusBar: state.loansReducer.statusBar
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getLoans: (skip, search, status) => dispatch(getLoans(skip, search, status)),
        resetList: () => dispatch(resetList()),
        changeStatus: (status) => dispatch(changeStatus(status)),
        createLoan: (data) => dispatch(createLoan(data)),
        createPayout: (data) => dispatch(createPayout(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loans)