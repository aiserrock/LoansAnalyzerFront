import LoansController from '../../controllers/LoansController'
import ClientController from '../../controllers/ClientController'
import {dispatchAction} from '../universalFunctions'
import {
    ERROR_CREATE_LOAN, ERROR_UPDATE_LOAN,
    FETCH_LIST_ERROR,
    FETCH_LIST_SUCCESS,
    SUCCESS_CREATE_LOAN,
    SUCCESS_UPDATE_LOAN,
} from './actionTypes'

export function getLoans(skip, search) {
    return async (dispatch, getState) => {
        const token = getState().authReducer.data.access_token
        const data = await LoansController.prototype.getLoans(token, skip, search)

        if(Array.isArray(data)) {
            const allData = []
            for(let loan of data) {
                const client = await ClientController.prototype.getClientById(token, loan.clients_id)
                allData.push({
                    client, loan
                })
            }
            dispatch(dispatchAction(FETCH_LIST_SUCCESS, allData))
        }
        else
            dispatch(dispatchAction(FETCH_LIST_ERROR, null))
    }
}

export function createLoan(data) {
    return async (dispatch, getState) => {
        const token = getState().authReducer.data.access_token
        const data = await LoansController.prototype.createLoan(token, data)
        if(Object.prototype.toString.call(data) === '[object Object]') {
            dispatch(dispatchAction(SUCCESS_CREATE_LOAN, data))
        }
        else dispatch(dispatchAction(ERROR_CREATE_LOAN, null))
    }
}

export function updateLoan(id, data) {
    return async (dispatch, getState) => {
        const token = getState().authReducer.data.access_token
        const data = await LoansController.prototype.updateLoanById(token, id, data)
        if(Object.prototype.toString.call(data) === '[object Object]') {
            dispatch(dispatchAction(SUCCESS_UPDATE_LOAN, data))
        }
        else dispatch(dispatchAction(ERROR_UPDATE_LOAN, null))
    }
}