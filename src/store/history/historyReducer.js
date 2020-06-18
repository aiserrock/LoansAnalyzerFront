import {
    ERROR_CREATE_PAYOUT,
    GET_HISTORY_LOAN_ERROR,
    GET_HISTORY_LOAN_SUCCESS,
    SUCCESS_CREATE_PAYOUT,
} from './actionTypes'


const initialState = {
    payoutIsCreated: true,
    historyLoans: [],
}

export default function historyReducer(state = initialState, action) {
    switch (action.type) {
        case GET_HISTORY_LOAN_ERROR:
            return {
                ...state ,historyLoans: [],
            }
        case GET_HISTORY_LOAN_SUCCESS:
            return {
                ...state ,historyLoans: state.historyLoans.concat(action.item),
            }
        case ERROR_CREATE_PAYOUT:
            return {
                ...state ,payoutIsCreated: false
            }
        case SUCCESS_CREATE_PAYOUT:
            return {
                ...state ,payoutIsCreated: true
            }
        default:
            return state
    }
}