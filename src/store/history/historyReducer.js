import {ERROR_CREATE_PAYOUT, SUCCESS_CREATE_PAYOUT} from './actionTypes'


const initialState = {
    payoutIsCreated: true
}

export default function historyReducer(state = initialState, action) {
    switch (action.type) {
        case ERROR_CREATE_PAYOUT:
            return {
                payoutIsCreated: false
            }
        case SUCCESS_CREATE_PAYOUT:
            return {
                payoutIsCreated: true
            }
        default:
            return state
    }
}