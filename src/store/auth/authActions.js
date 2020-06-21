import {dispatchAction} from '../universalFunctions'
import AuthController from '../../controllers/AuthController'
import {AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT} from './actionTypes'

console.log(new Date(new Date().getTime() + 3600 * 24000))

export function auth(login, password) {
    return async (dispatch) => {
        try {
            const data = await AuthController.prototype.auth(password, login)

            if (data !== null) {
                const expirationDate = new Date(new Date().getTime() + 3600 * 24000)
                localStorage.setItem('expirationDate', expirationDate)
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

// Функция авто выхода
export function autoLogOut(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

//Функция атво входа
export function autoLogin() {
    return dispatch => {
        const data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : ''
        if (!data) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                localStorage.removeItem('expirationDate')
                dispatch(logout())
            } else {
                dispatch(dispatchAction(AUTH_SUCCESS, data))
                dispatch(autoLogOut((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}