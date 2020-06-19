import HistoryController from '../../controllers/HistoryController'
import {dispatchAction} from '../universalFunctions'
import {
    ERROR_CREATE_PAYOUT,
    GET_HISTORY_LOAN_ERROR,
    GET_HISTORY_LOAN_SUCCESS, RESET_HISTORY,
    SUCCESS_CREATE_PAYOUT,
} from './actionTypes'


export function createPayout(info) {
    return async (dispatch, getState) => {
        const token = getState().authReducer.data.access_token
        const data = await HistoryController.prototype.createHistoryLoanRow(token, info)

        if (Object.prototype.toString.call(data) === '[object Object]') {
            dispatch(dispatchAction(SUCCESS_CREATE_PAYOUT, null))
        } else {
            dispatch(dispatchAction(ERROR_CREATE_PAYOUT, null))
        }
    }
}

export function getHistoryLoans(id, skip) {
    return async (dispatch, getState) => {
        const token = getState().authReducer.data.access_token
        const data = await HistoryController.prototype.getAllHistoryLoansById(token, id, skip)

        if (Array.isArray(data)) {
            dispatch(dispatchAction(GET_HISTORY_LOAN_SUCCESS, data))
        } else
            dispatch(dispatchAction(GET_HISTORY_LOAN_ERROR, null))
    }
}

export function updateHistory(id, info) {
    return async (dispatch, getState) => {
        const token = getState().authReducer.data.access_token
        const data = await HistoryController.prototype.updateHistory(token, id, info)

        if (Object.prototype.toString.call(data) === '[object Object]') {
            dispatch(dispatchAction(SUCCESS_CREATE_PAYOUT, null))
        } else {
            dispatch(dispatchAction(ERROR_CREATE_PAYOUT, null))
        }
    }
}

export function deleteHistoryLoanById(id) {
    return async (dispatch, getState) => {
        const token = getState().authReducer.data.access_token
        const data = await HistoryController.prototype.deleteHistoryLoanById(token, id)
        console.log(data)
    }
}

export function resetHistory() {
    return (dispatch) => {
        dispatch(dispatchAction(RESET_HISTORY, null))
    }
}