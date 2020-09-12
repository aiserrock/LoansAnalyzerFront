import {
    ERROR_UPDATE_LOAN, FETCH_LIST_END,
    FETCH_LIST_ERROR,
    FETCH_LIST_SUCCESS, INIT_STATUS_BAR, RESET_LIST,
    SUCCESS_UPDATE_LOAN,
} from './actionTypes'

const initialState = {
    loans: [],
    isEndOfList: false,
    isError: false,
    changeSuccess: false,
    statusBar: {}
}

export default function loansReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_LIST_SUCCESS:
            return {
                ...state, loans: state.loans.concat(action.item), isError: false,
            }
        case FETCH_LIST_END:
            return {
                ...state, isEndOfList: true,
            }
        case FETCH_LIST_ERROR:
            return {
                ...state, loans: [], isError: true,
            }
        case ERROR_UPDATE_LOAN:
            return {
                ...state, changeSuccess: false
            }
        case SUCCESS_UPDATE_LOAN:
            return {
                ...state, changeSuccess: true
            }
        case RESET_LIST:
            return {
                ...state, loans: [], isEndOfList: false,
            }
        case INIT_STATUS_BAR:
            return {
                ...state, statusBar: action.item
            }
        default:
            return state
    }
}