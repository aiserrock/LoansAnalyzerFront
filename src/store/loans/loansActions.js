import LoansController from '../../controllers/LoansController'
import ClientController from '../../controllers/ClientController'
import {dispatchAction} from '../universalFunctions'
import {
    CHANGE_STATUS, ERROR_UPDATE_LOAN, FETCH_LIST_END,
    FETCH_LIST_ERROR,
    FETCH_LIST_SUCCESS, INIT_STATUS_BAR, RESET_LIST,
    SUCCESS_UPDATE_LOAN,
} from './actionTypes'

export function getStatistics() {
    return async (dispatch, getState) => {
        const token = getState().authReducer.data.access_token
        const data = await LoansController.prototype.getLoans(token, null, null, null, true)
        dispatch(dispatchAction(INIT_STATUS_BAR, data))
    }
}

export function getLoans(skip, search, status) {
    return async (dispatch, getState) => {
        const token = getState().authReducer.data.access_token
        const data = await LoansController.prototype.getLoans(token, skip, search, status, false)

        if (Array.isArray(data)) {
            if (data.length === 0) {
                dispatch(dispatchAction(FETCH_LIST_END, null))
            } else {
                const allData = []

                for (let loan of data) {
                    if (loan.clients_id) {
                        const client = await ClientController.prototype.getClientById(token, loan.clients_id)
                        if (Object.prototype.toString.call(client) === '[object Object]')
                            allData.push({
                                client, loan,
                            })
                    }
                }
                dispatch(dispatchAction(FETCH_LIST_SUCCESS, allData))
            }
        } else
            dispatch(dispatchAction(FETCH_LIST_ERROR, null))
    }
}

export function createLoan(info) {
    return async (dispatch, getState) => {
        const token = getState().authReducer.data.access_token
        const data = await LoansController.prototype.createLoan(token, info)
        if (Object.prototype.toString.call(data) === '[object Object]') {
            dispatch(dispatchAction(SUCCESS_UPDATE_LOAN, data))
        } else dispatch(dispatchAction(ERROR_UPDATE_LOAN, null))
    }
}

export function updateLoan(id, info) {
    return async (dispatch, getState) => {
        const token = getState().authReducer.data.access_token
        const data = await LoansController.prototype.updateLoanById(token, id, info)
        if (Object.prototype.toString.call(data) === '[object Object]') {
            dispatch(dispatchAction(SUCCESS_UPDATE_LOAN, data))
        } else dispatch(dispatchAction(ERROR_UPDATE_LOAN, null))
    }
}

export function resetList() {
    return (dispatch) => {
        dispatch(dispatchAction(RESET_LIST, null))
    }
}

export function changeStatus(status) {
    return (dispatch) => {
        dispatch(dispatchAction(CHANGE_STATUS, status))
    }
}