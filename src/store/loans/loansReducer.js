import {
    ERROR_CREATE_LOAN, ERROR_UPDATE_LOAN,
    FETCH_LIST_ERROR,
    FETCH_LIST_SUCCESS, RESET_LIST,
    SUCCESS_CREATE_LOAN,
    SUCCESS_UPDATE_LOAN,
} from './actionTypes'

const initialState = {
    loans: [],
    isError: false,
    createSuccess: false,
    updateSuccess: false,
}

export default function loansReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_LIST_SUCCESS:
            return {
                ...state, loans: state.loans.concat(action.item), isError: false,
            }
        case FETCH_LIST_ERROR:
            return {
                ...state, loans: [], isError: true,
            }
        case ERROR_CREATE_LOAN:
            return {
                ...state, createSuccess: false
            }
        case SUCCESS_CREATE_LOAN:
            return {
                ...state, createSuccess: true
            }
        case ERROR_UPDATE_LOAN:
            return {
                ...state, updateSuccess: false
            }
        case SUCCESS_UPDATE_LOAN:
            return {
                ...state, updateSuccess: true
            }
        case RESET_LIST:
            return {
                ...state, loans: []
            }
        default:
            return state
    }
}