import {AUTH_ERROR, AUTH_LOGOUT, AUTH_SUCCESS} from './actionTypes'

const data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : ''
localStorage.setItem('data', JSON.stringify(data))
const isAuth = data !== ''

const initialState = {
    isError: false,
    data: data,
    isAuth: isAuth,
}

export default function с(state = initialState, action) {
    switch (action.type) {
        default:
        case AUTH_SUCCESS:
            return {
                ...state, isAuth: true, data: action.item, isError: false,
            }
        case AUTH_LOGOUT:
            return {
                ...state, isAuth: false, data: {}
            }
        case AUTH_ERROR:
            return {
                ...state, isError: true
            }
            return state
    }
}