import React, {Component} from 'react'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import Loans from './Containers/Loans/Loans'
import DetailsLoan from './Containers/DetailsLoan/DetailsLoan'
import Clients from './Containers/Clients/Clients'
import ClientInterface from './Containers/ClientInterface/ClientInterface'
import Auth from './Containers/Auth/Auth'
import Header from './Components/Header/Header'
import {Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'


class App extends Component {
    render(){
        return(
            <div className={'app'}>
                <div className="app__container">
                    <div className={'app__menu'}>
                        <Header/>
                    </div>

                    <div className="app__content">
                        <Switch>
                            <Route path='/' component={Auth} exact/>
                            <Route path='/loans' component={Loans}/>
                            <Route path='/clients' component={Clients}/>
                            <Route path='/details-loan/:number' component={DetailsLoan}/>
                            <Route path='/extract/:number' component={ClientInterface}/>
                        </Switch>
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

export default connect(mapStateToProps,mapDispatchToProps)(App)