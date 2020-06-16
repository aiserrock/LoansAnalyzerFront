import {combineReducers} from 'redux'
import authReducer from './auth/authReducer'
import loansReducer from  './loans/loansReducer'

export default combineReducers({
    authReducer, loansReducer
})