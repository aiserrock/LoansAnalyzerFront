import React, {Component} from 'react'

export default class SelectUser extends Component {
    constructor() {
        super()
        this.name = React.createRef()
        this.state = {}
    }

    findClient = () => {

    }

    render() {
        return (
            <div className={'input-section'}>
                <div className={'input-section__input mb-4'}>
                    <label>Имя заёмщика</label>
                    <input
                        onChange={this.findClient}
                        placeholder={'Начните вводить'}
                        defaultValue={this.props.isEdit ? this.props.client.name : null}
                        ref={this.name} type="text"/>
                </div>

                <div className="select__panel">

                </div>

                <div className="button-section">
                    <button className={'btn btn-primary mt-4'} onClick={() => {
                        this.props.changeWindow('date')
                    }}>
                        Назад<i className="fa fa-arrow-left ml-3" aria-hidden="true"/>
                    </button>
                    <button className={'btn btn-primary mt-4'} onClick={() => {
                        this.props.changeWindow('input')
                    }}>
                        Далее<i className="fa fa-arrow-right ml-3" aria-hidden="true"/>
                    </button>
                </div>

            </div>
        )
    }
}