import React, {Component} from 'react'
import './Header.scss'
import img from '../../img/logo.png'
import {NavLink} from 'react-router-dom'

export default class Header extends Component {
    state = {
        activeTab: '',
        menuIsOpen: false,
    }

    interactWithMenu = () => {
        this.setState({
            menuIsOpen: !this.state.menuIsOpen,
        })
    }

    changeActiveTab = (e) => {
        this.setState({
            activeTab: e.target.id,
        })
    }

    renderNavMenu = () => {
        if(this.props.isAuth)
        {
            return (
                <>
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
                    <div className={'link'} onClick={this.props.logout}>
                        <i className="fa fa-sign-out" aria-hidden="true" ></i>
                        <span>Выйти</span>
                    </div>
                </>
            )
        }
        else
            return (
                <div className={'link'} onClick={this.props.logout}>
                    <i className="fa fa-sign-out" aria-hidden="true" ></i>
                    <span>Войти</span>
                </div>
            )
    }

    render() {
        return (
            <div className={'header'}>
                <NavLink to={'/'} className={'header__logo'}>
                    <img src={img} alt="logo"/>
                </NavLink>

                <div className={'d-none d-sm-block h'}>
                    <div className="header__content">
                        <div className={'header__nav-bar h'}>
                            {
                                this.renderNavMenu()
                            }
                        </div>
                    </div>
                </div>

                <div className={'header__mobile d-block d-sm-none'}>
                    <div
                        onClick={this.interactWithMenu}
                        className="toggle-menu ">
                        ☰
                    </div>
                    <div className={'mobile-content h'}>
                        {
                            this.state.menuIsOpen
                                ? this.renderNavMenu()
                                : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}