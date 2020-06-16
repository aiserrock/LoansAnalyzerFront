import {dispatchAction} from '../universalFunctions'
import {post} from '../../http_client/LoansClient'
import {AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT} from './actionTypes'


export function auth(login, password) {
    return async (dispatch) => {
        try {
            let response = await post('/login', `username=${login}&password=${password}`,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                },
            )

            const data = await response.data

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