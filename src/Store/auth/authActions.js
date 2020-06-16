import {dispatchAction} from '../universalFunctions'
import AuthController from '../../controllers/AuthController'
import {AUTH_ERROR, AUTH_SUCCESS} from './actionTypes'


export function auth(login, password) {
    return async (dispatch) => {
        try {

            const data = await AuthController.prototype.auth((login, password))

            console.log(login, password,data)

            localStorage.setItem('data', JSON.stringify(data))
            dispatch(dispatchAction(AUTH_SUCCESS, data))
        }
        catch (e) {
            dispatch(dispatchAction(AUTH_ERROR, null))
        }
    }
}

export function logout() {
    return (dispatch, getState) => {
    }
}