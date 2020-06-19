import React, {Component} from 'react'

export default class SelectUser extends Component {
    constructor() {
        super()
        this.name = React.createRef()
        this.state = {
            clients: [
                {
                    id: 1,
                    name: 'Вася',
                    phone: '799999999999',
                },
                {
                    id: 2,
                    name: 'Вася',
                    phone: '799999999999',
                },
                {
                    id: 3,
                    name: 'Вася',
                    phone: '799999999999',
                },
                {
                    id: 4,
                    name: 'Вася',
                    phone: '799999999999',
                },
            ],
        }
    }

    findClient = () => {
        if(this.name.current.value.length > 3)
            this.props.hotLoad(this.name.current.value)
    }

    chooseClient = (client) => {
        this.props.selectClient(client)
        this.name.current.value = client.name
    }

    render() {
        return (
            <div className={'input-section'}>
                <div className={'input-section__input mb-4'}>
                    <input
                        className={'ml-0'}
                        onChange={this.findClient}
                        placeholder={'Начните вводить ФИО'}
                        defaultValue={
                            this.props.clientInfo !== null
                                ? this.props.clientInfo.name
                                : null
                        }
                        ref={this.name} type="text"/>
                </div>

                <div className="select__panel">
                    <div className={'loans-list'}>
                        {
                            this.state.clients.map((client) => (
                                <div key={client.id}
                                     className={`loans-list__item ${this.props.clientInfo === client ? 'loans-list__item_active' : ''}`}
                                     onClick={() => this.chooseClient(client)}>
                                    <div className="row non-click">
                                        <div className="col-md-7  col-xs-12"><b>{client.name}</b></div>
                                        <div className="col-md-5  col-xs-12"><b>{client.phone}</b></div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {
                    this.props.isEdit
                        ? null
                        : <div className="button-section">
                            <button className={'btn btn-primary mt-4'} onClick={() => {
                                this.props.changeWindow('date')
                            }}>
                                Назад<i className="fa fa-arrow-left ml-3" aria-hidden="true"/>
                            </button>
                            <button className={'btn btn-primary mt-4'} disabled={this.props.clientInfo === null}
                                    onClick={() => {
                                        this.props.changeWindow('input')
                                    }}>
                                Далее<i className="fa fa-arrow-right ml-3" aria-hidden="true"/>
                            </button>
                        </div>
                }
            </div>
        )
    }
}