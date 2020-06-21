import {AUTH_ERROR, AUTH_LOGOUT, AUTH_SUCCESS} from './actionTypes'

const initialState = {
    isError: false,
    data: {},
    isAuth: false,
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state, isAuth: true, data: action.item, isError: false,
            }
        case AUTH_LOGOUT:
            return {
                ...state, isAuth: false, data: {},
            }
        case AUTH_ERROR:
            return {
                ...state, isError: true,
            }
        default:
            return state
    }
}