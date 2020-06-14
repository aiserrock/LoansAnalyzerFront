import React, {Component} from 'react'
import './Auth.scss'
import {connect} from 'react-redux'

class Auth extends Component {
    constructor() {
        super();
        this.login = React.createRef()
        this.password = React.createRef()
    }

    onClose = () => {
        this.props.interactWithPayout(false, null)
    }

    payed = () => {

    }

    render(){
        return(
            <div className={'auth'}>
              <div className="auth__content">
                  <h2 className={'mb-5'}>
                      Авторизуйтесь
                  </h2>
                  <div className="input-section">
                      <div className={'input-section__input'}>
                          <label>Логин</label>
                          <input ref={this.login} type="number"/>
                      </div>
                      <div className={'input-section__input'}>
                          <label>Пароль</label>
                          <input ref={this.password} type="number"/>
                      </div>
                      <button className={'btn btn-success mt-4 mr-auto'} onClick={this.payed}>
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

    }
}

function mapDispatchToProps(dispatch) {
    return{

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth)