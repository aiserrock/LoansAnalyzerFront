import React, {Component} from 'react'
import toaster from 'toasted-notes'

export default class ClientInput extends Component {
    constructor() {
        super()
        this.name = React.createRef()
        this.number = React.createRef()
        this.state = {
            nameIsValid: true,
            numberIsValid: true,
            error: false,
        }
    }

    checkCorrect = async () => {
        const name = this.name.current.value, phone = this.number.current.value
        await this.setState({
            nameIsValid: name.replace(/\s+/g, '') !== '',
            numberIsValid: phone.replace(/\s+/g, '') !== '',
        })
        if (this.state.nameIsValid && this.state.numberIsValid) {
            const data = {name, phone}
            this.props.isEdit
                ? await this.props.updateClient(this.props.editClient.id, data)
                : await this.props.createClient(name, phone)
            if (this.props.successChanged) {
                this.setState({
                    error: false,
                })
                this.props.onClose()
                toaster.notify(`${this.props.isEdit ? 'Данные пользователя отредактированы' : 'Пользователь создан'}`, {
                    position: 'bottom-right',
                    duration: 3000,
                })
            } else
                this.setState({
                    error: true,
                })
        }
    }

    render() {
        return (
            <div className={'input-section'}>
                <div className={'input-section__input'}>
                    <label>Имя</label>
                    <input ref={this.name} type="text" className={this.state.nameIsValid ? '' : 'input-error'}
                           defaultValue={this.props.isEdit ? this.props.editClient.name : null}
                    />
                </div>
                <small className={!this.state.nameIsValid ? 'error mb-3' : 'hide'}>Имя не может быть пустым!</small>
                <div className={'input-section__input'}>
                    <label>Номер</label>
                    <input ref={this.number} type="text" className={this.state.numberIsValid ? '' : 'input-error'}
                           defaultValue={this.props.isEdit ? this.props.editClient.phone : null}
                    />
                </div>
                <small className={!this.state.numberIsValid ? 'error mb-3' : 'hide'}>Номер не может быть пустым!</small>
                <small className={this.state.error ? 'error mb-3' : 'hide'}>Проверте введённые данные!</small>
                <button className={'btn btn-success mt-4 ml-auto'} onClick={this.checkCorrect}>
                    Сохранить
                </button>
            </div>
        )
    }
}