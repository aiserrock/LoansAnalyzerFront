import ClientController from '../../controllers/ClientController'
import {dispatchAction} from '../universalFunctions'
import {ERROR_CHANGE_C, GET_CLIENTS_ERROR, GET_CLIENTS_SUCCESS, SUCCESS_CHANGE_C} from './actionTypes'

export function getClients(skip) {
    return async (dispatch, getState) => {
        const token = getState().authReducer.data.access_token
        const data = await ClientController.prototype.getClients(token, skip)

        if (Array.isArray(data)) {
            dispatch(dispatchAction(GET_CLIENTS_SUCCESS, data))
        } else
            dispatch(dispatchAction(GET_CLIENTS_ERROR, null))
    }
}

export function createClient(name, phone) {
    return async (dispatch, getState) => {
        const token = getState().authReducer.data.access_token
        const data = await ClientController.prototype.createClient(token, name, phone)
        if (Object.prototype.toString.call(data) === '[object Object]') {
            dispatch(dispatchAction(SUCCESS_CHANGE_C, null))
        } else {
            dispatch(dispatchAction(ERROR_CHANGE_C, null))
        }
    }
}

export function updateClient(id, info) {
    return async (dispatch, getState) => {
        const token = getState().authReducer.data.access_token
        const data = await ClientController.prototype.updateClient(token, id, info)
        if (Object.prototype.toString.call(data) === '[object Object]') {
            dispatch(dispatchAction(SUCCESS_CHANGE_C, null))
        } else {
            dispatch(dispatchAction(ERROR_CHANGE_C, null))
        }
    }
}

export function deleteClient(id) {
    return async (dispatch, getState) => {
        const token = getState().authReducer.data.access_token
        const data = await ClientController.prototype.deleteClient(token, id)
        console.log(data)
    }
}