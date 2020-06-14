import React, {Component} from 'react'
import './AddClient.scss'
import ClientInput from './ClientInputs'

export default class AddClient extends Component {
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
                                <h4 className={'mb-4'}>
                                    {
                                        isEdit ? 'Редактирование клиента' : 'Создание клиента'
                                    }
                                </h4>
                                <ClientInput
                                    isEdit={isEdit}
                                    editClient={this.props.editClient}
                                    saveClient={this.saveClient}/>
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