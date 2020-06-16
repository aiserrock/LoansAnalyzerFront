import {combineReducers} from 'redux'
import authReducer from './auth/authReducer'
import loansReducer from  './loans/loansReducer'
import historyReducer from './history/historyReducer'
import clientReducer from './client/clientReducer'

export default combineReducers({
    authReducer, loansReducer, historyReducer, clientReducer
})