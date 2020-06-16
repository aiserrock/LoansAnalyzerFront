import React, {Component} from 'react'
import './Auth.scss'
import {connect} from 'react-redux'
import {auth} from '../../store/auth/authActions'

class Auth extends Component {
    constructor() {
        super();
        this.login = React.createRef()
        this.password = React.createRef()
        this.state = {
            loginIsValid: true,
            passwordIsValid: true,
        }
    }

    validateUserData = () => {
        this.setState({
            loginIsValid: this.login.current.value.replace(/\s+/g, '') !== '',
            passwordIsValid: this.password.current.value.length >= 6,
        })
    }

    tryToAuth = async () => {
        if (this.password && this.login) {
            {
                await this.validateUserData()
                if (this.state.loginIsValid && this.state.passwordIsValid) {
                    await this.props.auth(this.login.current.value, this.password.current.value)
                }
            }
        }
    }

    render(){
        const isValid = !this.props.isError && this.state.loginIsValid && this.state.passwordIsValid

        return(
            <div className={'auth'}>
              <div className="auth__content">
                  <h2 className={'mb-5'}>
                      Авторизуйтесь
                  </h2>
                  <div className="input-section">
                      <div className={'input-section__input'}>
                          <label>Логин</label>
                          <input ref={this.login} type="text"/>
                      </div>
                      <div className={'input-section__input'}>
                          <label>Пароль</label>
                          <input ref={this.password} type="password"/>
                      </div>
                      <small className={!isValid ? 'error' : 'hide'}>Неверный логин или пароль!</small>
                      <button className={'btn btn-success mt-4 mr-auto'} onClick={this.tryToAuth}>
                          Войти
                      </button>
                  </div>
              </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        isError: state.authReducer.isError,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        auth: (login, password) => dispatch(auth(login, password))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth)