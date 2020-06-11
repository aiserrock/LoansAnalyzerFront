import React, {Component} from 'react'
import './LoansList.scss'

export default class LoansList extends Component {
    state = {
        currentListItem: 'active'
    }

    // Меняем активную вкладку
    changeActiveItem = (e) => {
        this.setState({
            currentListItem: e.target.id
        })
    }

    renderLoansList = () => {
        this.props.loansList.map(element => (
            <div>

            </div>
        ))
    }

    render(){
        return(
            <div className={'loans-list'}>
                <div className={'loans-list__menu'}>
                    <div
                        id={'active'}
                        className={`loans-list__menu-item ${this.state.currentListItem === 'active' ? 'loans-list__menu-item_active' : ''}`}
                        onClick={this.changeActiveItem}>
                        Активные
                    </div>
                    <div id={'overdue'}
                         className={`loans-list__menu-item ${this.state.currentListItem === 'overdue' ? 'loans-list__menu-item_active' : ''}`}
                         onClick={this.changeActiveItem}>
                        Просроченные
                    </div>
                    <div id={'returned'}
                         className={`loans-list__menu-item ${this.state.currentListItem === 'returned' ? 'loans-list__menu-item_active' : ''}`}
                         onClick={this.changeActiveItem}>
                        Возвращённые
                    </div>
                </div>

                <div className={'loans-list__list'}>

                </div>
            </div>
        )
    }
}