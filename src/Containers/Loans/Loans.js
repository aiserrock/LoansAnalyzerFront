import React, {Component} from 'react'
import {connect} from 'react-redux'
import './Loans.scss'
import LoansList from '../../Components/LoansList/LoansList'
import AppPayout from '../../Components/AppPayout/AppPayout'
import CreateLoan from '../../Components/CreateLoan/CreateLoan'
import {Redirect} from 'react-router-dom'
import {getLoans, resetList} from '../../store/loans/loansActions'

class Loans extends Component {
    constructor() {
        super()
        this.findLoan = React.createRef()
        this.selectSort = React.createRef()
        this.state = {
            payoutIsOpen: false,
            createLoanIsOpen: false,
            paidItem: null,
            menuIsOpen: false,
            curNumOfEl: 0,
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

    increaseNumberElements = async () => {
        await this.setState({
            curNumOfEl: this.state.curNumOfEl + 4,
        })

        this.props.getLoans(this.state.curNumOfEl, null)
    }

    find = () => {
        this.props.getLoans(this.state.curNumOfEl, null)
    }

    sort = () => {

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
                    <div className={'select'}>
                        <select ref={this.selectSort} className="select__content">
                            <option value={'ascendingOrder'}>Сначала новые</option>
                            <option value={'descendingOrder'}>Сначала старые</option>
                        </select>
                    </div>

                    <div className={'checkbox mb-3'}>
                        <input ref={this.statusZero}
                               type="checkbox" name="todo" defaultValue={'true'}/>
                        <label className={'checkbox__label_mini'} htmlFor="todo">
                            Активные
                        </label>
                    </div>
                    <div className={'checkbox mb-3'}>
                        <input ref={this.statusOne}
                               type="checkbox" name="todo"/>
                        <label className={'checkbox__label_mini'} htmlFor="todo">
                            Просроченные
                        </label>
                    </div>
                    <div className={'checkbox mb-3'}>
                        <input ref={this.statusTwo}
                               type="checkbox" name="todo"/>
                        <label className={'checkbox__label_mini'} htmlFor="todo">
                            Возвращённые
                        </label>
                    </div>
                </div>
                <div onClick={this.sort} className={'loans-panel__button'}>
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
                increaseNumberElements={this.increaseNumberElements}
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
                                    <input ref={this.findLoan} placeholder={'Поиск займа по'} type="text"/>
                                    <i className="fa fa-search fa-animate" aria-hidden="true" onClick={this.find}/>
                                </div>
                                <div className={'loans-panel__search-select'}>
                                    <div className={'select'}>
                                        <select ref={this.selectId} className="select__content">
                                            <option value={'name'}>имени</option>
                                            <option value={'number'}>номеру</option>
                                        </select>
                                    </div>
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
                    <table className="table">
                        <thead>
                        <tr className={'table'}>
                            <th scope="col">Полученный доход</th>
                            <th scope="col">Ожидаемый доход</th>
                            <th scope="col">Просроченные займы</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><span className={'text-primary'}>10000</span></td>
                            <td><span className={'text-success'}>+3500</span></td>
                            <td><span className={'text-danger'}>10000</span></td>
                        </tr>
                        </tbody>
                    </table>



                    <AppPayout
                        isEdit={false}
                        payoutIsOpen={this.state.payoutIsOpen}
                        paidItem={this.state.paidItem}
                        interactWithPayout={this.interactWithPayout}
                    />
                    <CreateLoan
                        interactWithCreateLoan={this.interactWithCreateLoan}
                        createLoanIsOpen={this.state.createLoanIsOpen}
                    />
                </div>
            )
        }
        else
            return <Redirect to={'/'}/>
    }
}

function mapStateToProps(state) {
    return {
        isAuth: state.authReducer.isAuth,
        loans: state.loansReducer.loans
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getLoans: (skip, search) => dispatch(getLoans(skip, search)),
        resetList: () => dispatch(resetList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loans)