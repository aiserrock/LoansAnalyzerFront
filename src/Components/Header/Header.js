import React, {Component} from 'react'
import './Header.scss'
import img from '../../img/logo.png'
import {NavLink} from 'react-router-dom'

export default class Header extends Component {
    state = {
        activeTab: '',
    }

    changeActiveTab = (e) => {
        this.setState({
            activeTab: e.target.id,
        })
    }

    logout = () => {

    }

    render() {
        return (
            <div className={'header'}>
                <div className={'header__logo'}>
                    <img src={img} alt="logo"/>
                </div>

                <div className={'header__nav-bar'}>
                    <NavLink
                        id={'loans'}
                        onClick={this.changeActiveTab}
                        className={`header__nav-item ${this.state.activeTab === 'loans' ? 'header__nav-item_active' : ''}`}
                        to={'/loans'}>
                        Займы
                    </NavLink>
                    <NavLink
                        id={'clients'}
                        onClick={this.changeActiveTab}
                        className={`header__nav-item ${this.state.activeTab === 'clients' ? 'header__nav-item_active' : ''}`}
                        to={'/clients'}>
                        Клиенты
                    </NavLink>
                </div>

                <div className={'header__logout'}>
                    <i className="fa fa-sign-out fa-animate" aria-hidden="true" onClick={this.logout}></i>
                    <p>Выйти</p>
                </div>
            </div>
        )
    }
}