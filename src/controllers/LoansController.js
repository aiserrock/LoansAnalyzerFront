import {get, post, put} from "../http_client/LoansClient";

// Контроллер, который обрабатывает запросы замймов
export class LoansController {
    // Получение списка займов.
    // @param token - токен авторизации пользователя
    // @param skip - сколько записей пропустить, реализует пагинацию
    async getLoans(token: string, skip = 0) {
        let response = await get(`/loans/?skip=${skip}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        return response.data;
    }

    // Создание займа
    // @param token - токен авторизации пользователя
    // @param data - данные займа
    async createLoan(token: string, data) {
        let response = await post('/loans/', {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`,
            },
            data: data,
        });

        return response.data;
    }

    // Получение одного займа по id
    // @param token - токен авторизации пользователя
    // @param id - идентификатор займа
    async getLoanById(token: string, id) {
        let response = await get(`/loans/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        return response.data;
    }

    // Обновление займа по id
    // @param token - токен авторизации пользователя
    // @param id - идентификатор займа
    // @param data - данные займа
    async updateLoanById(token: string, id, data) {
        let response = await put(`/loans/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": 'application/json',
            },
            data: data,
        });

        return response.data;
    }
}
