import React, {Component} from 'react'

export default class LoanInputs extends Component {
    constructor() {
        super()
        this.fio = React.createRef()
        this.numberPhone = React.createRef()
        this.sum = React.createRef()
        this.term = React.createRef()
        this.income = React.createRef()
        this.term_delay = React.createRef()
        this.purpose = React.createRef()
        this.rate = React.createRef()
    }

    checkCorrect = () => {
        this.props.payed()
    }


    render() {
        return (
            <div className={'input-section'}>
                <div className={'input-section__input'}>
                    <label>ФИО</label>
                    <input
                        defaultValue={this.props.isEdit ? this.props.client.name : null}
                        ref={this.fio} type="text"/>
                </div>
                <div className={'input-section__input'}>
                    <label>Телефон</label>
                    <input
                        defaultValue={this.props.isEdit ? this.props.client.phone : null}
                        ref={this.numberPhone} type="text"/>
                </div>
                <div className={'input-section__input'}>
                    <label>Сумма займа</label>
                    <input
                        defaultValue={this.props.isEdit ? this.props.loan.amount  : null}
                        ref={this.sum} type="number"/>
                </div>
                <div className={'input-section__input'}>
                    <label>Срок займа</label>
                    <input
                        defaultValue={this.props.isEdit ? this.props.loan.issued_at  : null}
                        ref={this.term} type="number"/>
                </div>
                <div className={'input-section__input'}>
                    <label>Доход</label>
                    <input
                        ref={this.income} type="number"/>
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
                        ref={this.term_delay} type="number"/>
                </div>
                <div className={'input-section__input'}>
                    <label>Цель займа</label>
                    <textarea
                        defaultValue={this.props.isEdit ? this.props.loan.goal  : null}
                        ref={this.purpose} cols="30" rows="5">
                                    </textarea>
                </div>

                {
                    !this.props.isEdit
                        ?
                        <div className="button-section">
                            <button className={'btn btn-primary mt-4'} onClick={() => {
                                this.props.changeWindow('date')
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