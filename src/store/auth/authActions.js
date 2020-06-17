import {dispatchAction} from '../universalFunctions'
import AuthController from '../../controllers/AuthController'
import {AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT} from './actionTypes'


export function auth(login, password) {
    return async (dispatch) => {
        try {
            const data = await AuthController.prototype.auth(password, login)

            if (data !== null) {
                localStorage.setItem('data', JSON.stringify(data))
                dispatch(dispatchAction(AUTH_SUCCESS, data))
            } else {
                dispatch(dispatchAction(AUTH_ERROR, null))
            }
        } catch (e) {
            dispatch(dispatchAction(AUTH_ERROR, null))
        }
    }
}

export function logout() {
    return async (dispatch) => {
        localStorage.removeItem('data')
        dispatch(dispatchAction(AUTH_LOGOUT, null))
    }
}