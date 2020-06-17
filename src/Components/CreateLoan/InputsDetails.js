import React, {Component} from 'react'

export default class InputsDetails extends Component {
    constructor() {
        super()
        this.amount = React.createRef()
        this.i_rate = React.createRef()
        this.rate = React.createRef()
        this.goal = React.createRef()
        this.state = {
            phoneIsValid: true,
            nameIsValid: true,
            amountIsValid: true,
            i_rateIsValid: true,
            rateIsValid: true,
            goalIsValid: true,
            isValid: true
        }
    }

    checkCorrect = async () => {
        await this.setState({
            amountIsValid: this.amount.current.value.replace(/\s+/g, '') !== '',
            i_rateIsValid: this.i_rate.current.value.replace(/\s+/g, '') !== '',
            rateIsValid: this.rate.current.value.replace(/\s+/g, '') !== '',
            goalIsValid: this.goal.current.value.replace(/\s+/g, '') !== '',
        })

        await this.setState({
            isValid: this.state.amountIsValid && this.state.i_rateIsValid && this.state.rateIsValid && this.state.goalIsValid
        })

        if(this.state.isValid) {
                this.props.payed({
                    amount: this.amount.current.value,
                    rate: this.rate.current.value,
                    increased_rate: this.i_rate.current.value,
                    goal: this.goal.current.value,
                    status: 'ACTIVE',
                })
        }
    }

    render() {
        return (
            <div className={'input-section'}>
                <div className={`input-section__input`}>
                    <label>Сумма займа</label>
                    <input
                        className={`${!this.state.amountIsValid ? 'input-error': ''}`}
                        defaultValue={this.props.isEdit ? this.props.loan.amount  : null}
                        ref={this.amount} type="number"/>
                </div>
                <div className={`input-section__input`}>
                    <label>Ставка</label>
                    <input
                        className={`input-section__input ${!this.state.rateIsValid ? 'input-error': ''}`}
                        defaultValue={this.props.isEdit ? this.props.loan.rate  : null}
                        ref={this.rate} type="number"/>
                </div>
                <div className={`input-section__input`}>
                    <label>Ставка при просрочке</label>
                    <input
                        className={`input-section__input ${!this.state.i_rateIsValid ? 'input-error': ''}`}
                        defaultValue={this.props.isEdit ? this.props.loan.increased_rate  : null}
                        ref={this.i_rate} type="number"/>
                </div>
                <div className={`input-section__input`}>
                    <label>Цель займа</label>
                    <textarea
                        className={`input-section__input ${!this.state.goalIsValid ? 'input-error': ''}`}
                        defaultValue={this.props.isEdit ? this.props.loan.goal  : null}
                        ref={this.goal} cols="30" rows="5">
                                    </textarea>
                </div>

                <small className={this.state.isValid ? 'hide': 'error'}>Все поля обязательны для заполнения!</small>
                <small className={!this.props.changeSuccess ? 'hide': 'error'}>Проверьте введённые данные</small>

                {
                    !this.props.isEdit
                        ?
                        <div className="button-section">
                            <button className={'btn btn-primary mt-4'} onClick={() => {
                                this.props.changeWindow('select')
                            }}>
                                Назад<i className="fa fa-arrow-left ml-3" aria-hidden="true"/>
                            </button>
                            <button className={'btn btn-success mt-4'} onClick={this.checkCorrect}>
                                Создать займ<i className="fa fa-credit-card ml-3" aria-hidden="true"/>
                            </button>
                        </div>
                        : null
                }
            </div>
        )
    }
}