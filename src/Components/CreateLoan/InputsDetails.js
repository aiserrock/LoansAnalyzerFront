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
        this.props.payed()
        await this.setState({
            amountIsValid: this.amount.current.value.replace(/\s+/g, '') !== '',
            i_rateIsValid: this.i_rate.current.value.replace(/\s+/g, '') !== '',
            rateIsValid: this.rate.current.value.replace(/\s+/g, '') !== '',
            goalIsValid: this.goal.current.value.replace(/\s+/g, '') !== '',
        })

        if(this.state.phoneIsValid && this.state.amountIsValid && this.state.rateIsValid && this.state.i_rateIsValid
            && this.state.goalIsValid) {
                this.props.payed({
                    amount: this.amount.current.value,
                    rate: this.rate.current.value,
                    increased_rate: this.i_rate.current.value,
                    goal: this.goal,
                    status: 'ACTIVE',
                })
        }
    }


    render() {
        return (
            <div className={'input-section'}>
                <div className={'input-section__input'}>
                    <label>Сумма займа</label>
                    <input
                        defaultValue={this.props.isEdit ? this.props.loan.amount  : null}
                        ref={this.amount} type="number"/>
                </div>
                <div className={'input-section__input'}>
                    <label>Ставка</label>
                    <input
                        defaultValue={this.props.isEdit ? this.props.loan.rate  : null}
                        ref={this.rate} type="number"/>
                </div>
                <div className={'input-section__input'}>
                    <label>Ставка при просрочке</label>
                    <input
                        defaultValue={this.props.isEdit ? this.props.loan.increased_rate  : null}
                        ref={this.i_rate} type="number"/>
                </div>
                <div className={'input-section__input'}>
                    <label>Цель займа</label>
                    <textarea
                        defaultValue={this.props.isEdit ? this.props.loan.goal  : null}
                        ref={this.goal} cols="30" rows="5">
                                    </textarea>
                </div>

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