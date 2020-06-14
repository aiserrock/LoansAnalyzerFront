import React, {Component} from 'react'

export default class ClientInput extends Component {
    constructor() {
        super();
        this.name = React.createRef()
        this.number = React.createRef()
        this.state = {

        }
    }

    checkCorrect = () => {
        this.props.saveClient()
    }

    render(){
        return(
            <div className={'input-section'}>
                <div className={'input-section__input'}>
                    <label>Имя</label>
                    <input ref={this.name} type="text"
                           defaultValue={this.props.isEdit ? this.props.editClient.name : null}
                    />
                </div>
                <div className={'input-section__input'}>
                    <label>Номер</label>
                    <input ref={this.number} type="text"
                           defaultValue={this.props.isEdit ? this.props.editClient.phone : null}
                    />
                </div>
                <button className={'btn btn-success mt-4 ml-auto'} onClick={this.checkCorrect}>
                    Сохранить
                </button>
            </div>
        )
    }
}