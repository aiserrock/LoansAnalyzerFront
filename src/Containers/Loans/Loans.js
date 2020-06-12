import React, {Component} from 'react'
import {connect} from 'react-redux'
import './Loans.scss'
import LoansList from '../../Components/LoansList/LoansList'
import AppPayout from '../../Components/AppPayout/AppPayout'
import CreateLoan from '../../Components/CreateLoan/CreateLoan'

class Loans extends Component {
    constructor() {
        super()
        this.loanInput = React.createRef()
        this.state = {
            payoutIsOpen: false,
            createLoanIsOpen: false ,
            paidItem: null,
            loans: [
                {
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
                {
                    id: 'loan2',
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
                {
                    id: 'loan3',
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
                {
                    id: 'loan4',
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
            ],
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
            createLoanIsOpen: !this.state.createLoanIsOpen
        })
    }


    // Обработчик, ищет кредит
    loansInputChanges = () => {
        console.log(this.loanInput.current.value)
    }

    render() {
        return (
            <div className={'loans'}>
                <div className="row">
                    <div className="col-lg-2 col-md-1 col-sm-0"></div>
                    <div className="col-lg-8 col-md-10 col-sm-12">
                        <h1 className={'mb-5'}>Займы</h1>

                        <div className="row">
                            <div className="col-12 d-flex">
                                <p>Полученный доход:  <span className={'text-primary'}>10000</span></p>
                            </div>
                            <div className=" col-12 d-flex">
                                <p>Ожидаемый доход:   <span className={'text-success'}>+3500</span></p>
                            </div>
                            <div className="col-12 d-flex">
                                <p>Просроченные займы:  <span className={'text-danger'}>10000</span></p>
                            </div>
                        </div>

                        <br/>

                        <div className="row">
                            <div className="col-12">
                                <div className={'loans__create-loan mb-3'}>
                                    <p className={'mr-2'}>Создание нового займа</p>
                                    <span onClick={this.interactWithCreateLoan} className={'dagger dagger_add'}></span>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className={'loans__find-loan mb-3'}>
                                    <label className={'mr-2'}>Поиск займа</label>
                                    <input onChange={this.loansInputChanges} ref={this.loanInput} type="text"/>
                                </div>
                            </div>
                        </div>

                        <LoansList
                            loans={this.state.loans}
                            interactWithPayout={this.interactWithPayout}
                        />
                    </div>
                    <div className="col-lg-2 col-md-1 col-sm-0"></div>
                </div>
                <AppPayout
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
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Loans)