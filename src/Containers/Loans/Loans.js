import React, {Component} from 'react'
import './Loans.scss'
import LoansList from '../../Components/LoansList/LoansList'
import {connect} from 'react-redux'

class Loans extends Component {
    constructor() {
        super()
        this.loanInput = React.createRef()

        this.state = {

        }
    }

    // Обработчик, добавляет новый кредит
    addLoanHandler = () => {

    }

    // Обработчик, ищет кредит
    loansInputChanges = () => {
        console.log(this.loanInput.current.value)
    }

    render() {
        return (
            <div className={'loans'}>
                <div className={'loans__create-loan mb-3'}>
                    <p className={'mr-2'}>Создание нового займа</p>
                    <span onClick={this.addLoanHandler} className={'dagger dagger_add'}></span>
                </div>

                <div className={'loans__find-loan mb-3'}>
                    <label className={'mr-2'}>Поиск займа</label>
                    <input onChange={this.loansInputChanges} ref={this.loanInput} type="text"/>
                </div>

                <div className={'loans__income'}>
                    <div className={'loans__income-block mr-3'}>
                        <p>Полученный доход: </p>
                        <span className={'text-primary ml-1'}>10000</span>
                    </div>
                    <div className={'loans__income-block'}>
                        <p>Ожидаемый доход: </p>
                        <span className={'text-success ml-1'}>+3500</span>
                    </div>
                </div>

                <div className={'loans__overdue mb-4'}>
                    <p>Просроченные займы:</p>
                    <span className={'text-danger ml-1'}>10000</span>
                </div>

                <LoansList/>
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

export default connect(mapStateToProps,mapDispatchToProps)(Loans)