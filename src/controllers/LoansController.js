import {get, post, put} from '../http_client/LoansClient'

// Контроллер, который обрабатывает запросы замймов
// !!! Если была получена ошибка, то методы будут возвращать её код
// 401 - ошибка авторизации, 404 - отсутствует, 422 - ошибка парсинга
export default class LoansController {
    // Получение списка займов.
    // @param token - токен авторизации пользователя
    // @param skip - сколько записей пропустить, реализует пагинацию
    // @param search - строка поиска, если производится поиск, параметр опционален
    // @param status - строка статуса займа, если нужна фильтрация, параметр опционален
    // @param statistics - если этот параметр true, то метод get_loans возвращает статистику
    // @return Возвращает список найденных займов
    // Чтобы сделать отступ, указываем первые два параметра
    // Чтобы сделать поиск, указываем три параметра, при этом skip=null
    async getLoans(token: string, skip = 0, search: string, status: string, statistics: boolean) {
        try {
            let param = {}
            if (skip !== null) {
                param['skip'] = skip
            }
            if (search !== undefined && search !== null) {
                param['search'] = search
            }
            if (status !== undefined && status !== null && status !== '') {
                param['status'] = status.toUpperCase()
            }
            if (statistics !== undefined && statistics !== null) {
                param['statistics'] = statistics
            }
            let p = ''
            if (Object.keys(param).length !== 0) {
                p = `?${new URLSearchParams(param).toString()}`
            }
            let response = await get(`/loans/${p}`,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': `Bearer ${token}`,
                    },
                })

            return response.data
        } catch (e) {
            return e?.response?.status
        }
    }

    // Создание займа
    // @param token - токен авторизации пользователя
    // @param data - данные займа
    // @return Возвращает созданный объект
    async createLoan(token: string, data) {
        try {
            let response = await post('/loans/', data, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization':
                        `Bearer ${token}`
                    ,
                },
            })

            return response.data
        } catch (e) {
            return e?.response?.status
        }
    }

    // Получение одного займа по id
    // @param token - токен авторизации пользователя
    // @param id - идентификатор займа
    // @return один объект займа
    async getLoanById(token: string, id) {
        try {
            let response = await get(
                `/loans/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Access-Control-Allow-Origin': '*',
                    },
                })

            return response.data
        } catch (e) {
            return e?.response?.status
        }
    }

    // Обновление займа по id
    // @param token - токен авторизации пользователя
    // @param id - идентификатор займа
    // @param data - данные займа
    // @return Возвращает обновленный объект
    async updateLoanById(token: string, id, data) {
        try {
            let response = await put(
                `/loans/${id}`, data, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                })

            return response.data
        } catch (e) {
            return e?.response?.status
        }
    }
}
