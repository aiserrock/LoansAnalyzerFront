import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'toasted-notes/src/styles.css'
import "react-sweet-progress/lib/style.css"
import '@lls/react-light-calendar/dist/index.css'
import Header from './Components/Header/Header'
import Loans from './Containers/Loans/Loans'
import DetailsLoan from './Containers/DetailsLoan/DetailsLoan'
import Clients from './Containers/Clients/Clients'
import ClientInterface from './Containers/ClientInterface/ClientInterface'
import Auth from './Containers/Auth/Auth'
import {autoLogin, logout} from './store/auth/authActions'
import PaymentSchedule from './Containers/PaymentSchedule/PaymentSchedule'
import Page404 from './Components/Page404/Page404'

class App extends Component {
    componentDidMount =  () => {
        this.props.autoLogin()
    }

    render() {
        return (
            <div className={'app'}>
                <div className="app__container">
                    <div className={'app__menu'}>
                        <Header logout={this.props.logout} isAuth={this.props.isAuth}/>
                    </div>

                    <div className="app__content">
                        <Switch>
                            <Route path='/' component={Auth} exact/>
                            <Route path='/loans' component={Loans}/>
                            <Route path='/clients' component={Clients}/>
                            <Route path='/details-loan/:number' component={DetailsLoan}/>
                            <Route path='/extract/:number' component={ClientInterface}/>
                            <Route path={'/payment-schedule/:number'} component={PaymentSchedule}/>
                            <Route component={Page404}/>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuth: state.authReducer.isAuth,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout()),
        autoLogin: () => dispatch(autoLogin()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)