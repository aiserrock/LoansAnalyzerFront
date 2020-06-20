import React, {Component} from 'react'
import ClientController from '../../controllers/ClientController'

export default class SelectUser extends Component {
    constructor() {
        super()
        this.name = React.createRef()
        this.state = {
            clients: [],
        }
    }

    onScroll = async (e) => {
        if (e.target.offsetHeight + e.target.scrollTop === e.target.scrollHeight) {
            const skip = this.state.clients.length
            if (this.name.current.value.length > 2)
                if (this.props.clientInfo !== null && this.props.clientInfo.name === this.name.current.value)
                    this.getClientsList(skip, '', true)
                else
                    this.getClientsList(skip, this.name.current.value, true)
            else
                this.getClientsList(skip, '', true)
        }
    }

    getClientsList = async (skip, search, onScroll) => {
        const clients = await ClientController.prototype.getClients(this.props.token, skip, search)
        if (onScroll)
            this.setState({
                clients: this.state.clients.concat(clients),
            })
        else
            this.setState({
                clients,
            })
    }

    componentDidMount = async () => {
        this.setState({
            clients: [],
        })
        this.getClientsList(0, '', false)
    }

    findClient = async () => {
        if (this.name.current.value.length > 2)
            this.getClientsList(0, this.name.current.value, false)
        else if (this.name.current.value.length === 2)
            this.getClientsList(0, '', false)
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
                    <div className={'loans-list'} onScroll={this.onScroll}>
                        {
                            this.state.clients.map((client) => (
                                <div key={client.id}
                                     className={`loans-list__item ${this.props.clientInfo !== null && this.props.clientInfo.id === client.id ? 'loans-list__item_active' : ''}`}
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