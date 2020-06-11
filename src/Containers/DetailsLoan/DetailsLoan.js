import React, {Component} from 'react'
import './DetailsLoan.scss'
import {connect} from 'react-redux'

class DetailsLoan extends Component {
    render(){
        return(
            <div className={''}>
                Детали займа
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

export default connect(mapStateToProps,mapDispatchToProps)(DetailsLoan)