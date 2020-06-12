import axios from 'axios';

// Корневой урл для обращения к серверу
let url = 'https://loans-analyzer.herokuapp.com';

// Гет запрос к серверу с путём
// @param {string} path - Путь запроса к серверу, указывается с / в начале
// @return {Promise} - асинхронный запрос к сети
export function get(path: string, data?: any): Promise {
    return axios.get(url + path, data);
}

// Пост запрос к серверу с путём
// @param {string} path - Путь запроса к серверу, указывается с / в начале
// @param {any} data - данные для запроса
// @return {Promise} - асинхронный запрос к сети
export function post(path: string, data?: any): Promise {
    return axios.post(url + path, data);
}

// Пут запрос к серверу с путём
// @param {string} path - Путь запроса к серверу, указывается с / в начале
// @param {any} data - данные для запроса
// @return {Promise} - асинхронный запрос к сети
export function put(path: string, data?: any): Promise {
    return axios.put(url + path, data);
}
