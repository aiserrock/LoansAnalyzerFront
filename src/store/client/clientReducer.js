import {ERROR_CHANGE_C, GET_CLIENTS_ERROR, GET_CLIENTS_SUCCESS, SUCCESS_CHANGE_C} from './actionTypes'

const initialState = {
    clients: [],
    successChanged: false,
}

export default function clientReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CLIENTS_SUCCESS:
            return {
                ...state, clients: state.clients.concat(action.item)
            }
        case GET_CLIENTS_ERROR:
            return {
                ...state, clients: []
            }
        case ERROR_CHANGE_C:
            return {
                ...state, successChanged: false
            }
        case SUCCESS_CHANGE_C:
            return  {
                ...state, successChanged: true
            }
        default:
            return state
    }
}