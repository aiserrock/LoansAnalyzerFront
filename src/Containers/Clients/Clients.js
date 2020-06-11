import React, {Component} from 'react'
import './Clients.scss'
import {connect} from 'react-redux'

class Clients extends Component {
    render(){
        return(
            <div className={''}>
                Список клиентов
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

export default connect(mapStateToProps,mapDispatchToProps)(Clients)