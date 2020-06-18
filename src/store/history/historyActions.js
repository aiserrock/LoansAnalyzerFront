import HistoryController from '../../controllers/HistoryController'
import {dispatchAction} from '../universalFunctions'
import {ERROR_CREATE_PAYOUT, SUCCESS_CREATE_PAYOUT} from './actionTypes'

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

