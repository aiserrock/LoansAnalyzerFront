import React, {Component} from 'react'
import {connect} from 'react-redux'
import './Loans.scss'
import LoansList from '../../Components/LoansList/LoansList'
import AddPayout from '../../Components/AddPayout/AddPayout'
import CreateLoan from '../../Components/CreateLoan/CreateLoan'
import {Redirect} from 'react-router-dom'
import {createLoan, getLoans, getStatistics, resetList} from '../../store/loans/loansActions'
import {debounce} from 'lodash'
import {createPayout} from '../../store/history/historyActions'
import MiniPreloader from '../../Components/Preloaders/MiniPreloader'
import {getSum} from '../../store/universalFunctions'

class Loans extends Component {
    constructor() {
        super()
        this.findLoan = React.createRef()
        this.state = {
            payoutIsOpen: false,
            createLoanIsOpen: false,
            paidItem: null,
            menuIsOpen: false,
            status: '',
        }
    }

    // Делаем поиск при старте или авторизации
    componentDidMount() {
        if (this.props.isAuth) {
            this.clearFind()
            this.props.getStatistics()
        }
    }

    componentWillUnmount() {
        this.debounceClearFind.cancel()
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

    // Меняем статус займов по радио кнопкам
    changeStatus = async (e) => {
        let status = e.target.id
        if (this.state.status === status)
            status = ''
        await this.setState({status})
        await this.clearFind()
    }

    // Поиск с задержкой при вводе в текстовое поле
    debounceClearFind = debounce(() => {
        this.clearFind()
    }, 800)

    // Поиск с предварительной очисткой списка
    clearFind = async () => {
        await this.props.getLoans(0, this.findLoan.current.value, this.state.status, true)
    }

    // Ведем поиск при прокрутке списка
    find = async () => {
        await this.props.getLoans(this.props.loans.length, this.findLoan.current.value, this.state.status, false)
    }

    createLoan = async (data) => {
        await this.props.createLoan(data)
        setTimeout(() => {
            this.props.getLoans(0, this.findLoan.current.value, this.state.status, true)
            this.props.getStatistics()
        }, 1000)
    }

    createPayout = async (data) => {
        await this.props.createPayout(data)
        setTimeout(() => {
            this.props.getStatistics()
        }, 1000)
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
                        <input checked={this.state.status === 'active'}
                               id="active"
                               onClick={this.changeStatus}
                               onChange={() => {
                               }}
                               type="radio"/>
                        <span className="radio"/>
                        <span className="text">Активные</span>
                    </label>

                    <label className="form-radio-hidden mb-3">
                        <input checked={this.state.status === 'overdue'}
                               id="overdue"
                               onClick={this.changeStatus}
                               onChange={() => {
                               }}
                               type="radio"/>
                        <span className="radio"/>
                        <span className="text">Просроченные</span>
                    </label>

                    <label className="form-radio-hidden">
                        <input checked={this.state.status === 'archived'}
                               id="archived"
                               onClick={this.changeStatus}
                               onChange={() => {
                               }}
                               type="radio"/>
                        <span className="radio"/>
                        <span className="text">Возвращённые</span>
                    </label>
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
                    <h1 className={'mb-2'}>Займы</h1>


                    <div className={'loans-panel'}>
                        <button
                            className={'btn btn-outline-dark loans-panel__button'}
                            onClick={this.interactWithCreateLoan}
                        >
                            Добавить займ
                        </button>
                        <div className={'loans-panel__main-content'}>
                            <div className={'loans-panel__main'}>
                                <div className={'loans-panel__search'}>
                                    <div className={'loans-panel__search-string'}>
                                        <input ref={this.findLoan} placeholder={'Поиск займа по ФИО или телефону'}
                                               onChange={this.debounceClearFind} type="text"/>
                                        <i className="fa fa-search fa-animate" aria-hidden="true"
                                           onClick={this.clearFind}/>
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
                                                    this.props.loading
                                                        ? <MiniPreloader/>
                                                        : this.renderOrderList()
                                                }
                                            </div>
                                    }
                                </div>
                                <div className={'d-none d-sm-block'}>
                                    <div className={'loans-panel__content'}>
                                        {
                                            this.props.loading
                                                ? <MiniPreloader/>
                                                : this.renderOrderList()
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
                            <td><span
                                className={'text-primary'}><b>{getSum(this.props.statusBar.all_my_income || 0)} ₽</b></span>
                            </td>
                            <td><span
                                className={'text-success'}><b>{getSum(this.props.statusBar.all_my_income_now || 0)} ₽</b></span>
                            </td>
                            <td><span
                                className={'text-danger'}><b>{getSum(this.props.statusBar.all_overdue_amount || 0)} ₽</b></span>
                            </td>
                        </tr>
                        </tbody>
                    </table>


                    <AddPayout
                        isEdit={false}
                        payoutIsOpen={this.state.payoutIsOpen}
                        paidItem={this.state.paidItem}
                        interactWithPayout={this.interactWithPayout}
                        createPayout={this.createPayout}
                        payoutIsCreated={this.props.payoutIsCreated}
                    />
                    <CreateLoan
                        interactWithCreateLoan={this.interactWithCreateLoan}
                        createLoanIsOpen={this.state.createLoanIsOpen}
                        changeSuccess={this.props.changeSuccess}
                        createLoan={this.createLoan}
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
        changeSuccess: state.loansReducer.changeSuccess,
        payoutIsCreated: state.historyReducer.payoutIsCreated,
        token: state.authReducer.data.access_token,
        statusBar: state.loansReducer.statusBar,
        loading: state.loansReducer.loading,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getLoans: (skip, search, status, reset) => dispatch(getLoans(skip, search, status, reset)),
        resetList: () => dispatch(resetList()),
        createLoan: (data) => dispatch(createLoan(data)),
        createPayout: (data) => dispatch(createPayout(data)),
        getStatistics: () => dispatch(getStatistics()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loans)
