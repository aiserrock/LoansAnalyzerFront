import React, {Component} from 'react'
import './AddClient.scss'

export default class AddClient extends Component {
    constructor() {
        super();
        this.name = React.createRef()
        this.number = React.createRef()
        this.state = {

        }
    }

    saveClient = () => {

    }

    onClose = () => {
        this.props.interactWithClient(false, null)
    }

    render() {
        if (this.props.clientEditIsOpen) {
            {
                let isEdit = false
                if (this.props.editClient)
                    isEdit = true
                return (
                    <>
                        <div className={'add-payout'}>
                            <span className="dagger dagger_delete ml-auto" onClick={this.onClose}/>
                            <div className="add-payout__content">
                                <h4>
                                    {
                                        isEdit ? 'Редактирование клиента' : 'Создание клиента'
                                    }
                                </h4>
                                <div className={'add-payout__input'}>
                                    <label>Имя</label>
                                    <input ref={this.name} type="text"
                                           defaultValue={isEdit ? this.props.editClient.name : null}
                                    />
                                </div>
                                <div className={'add-payout__input'}>
                                    <label>Номер</label>
                                    <input ref={this.number} type="text"
                                           defaultValue={isEdit ? this.props.editClient.phone : null}
                                    />
                                </div>
                                <button className={'btn btn-success mt-4 ml-auto'} onClick={this.saveClient}>
                                   Сохранить
                                </button>
                            </div>
                        </div>
                        <div className={'bg'} onClick={this.onClose}/>
                    </>
                )
            }
        } else
            return null
    }
}