import {get, post, put, del} from "../http_client/LoansClient";

// Контроллер, который обрабатывает запросы истории
// !!! Если была получена ошибка, то методы будут возвращать её код
// 400 - не найдено, 409 - конфликт (уже есть клиент в базе)
// 401 - ошибка авторизации, 404 - отсутствует, 422 - ошибка парсинга
export class HistoryController {
    // Получение истории займа
    // @param token - токен авторизации пользователя
    // @param id - row id займа
    // @return Возвращает запись истории
    async getHistoryLoanById(token: string, id: string) {
        try {
            let response = await get(`/history_loans/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

            return response.data;
        } catch (e) {
            return e.response.status;
        }
    }

    // Получение истории займа
    // @param token - токен авторизации пользователя
    // @param id - id займа
    // @param skip - сколько записей пропустить, реализует пагинацию
    // @return Возвращает список займов из истории
    async getAllHistoryLoansById(token: string, id: string, skip) {
        let skipStr = skip === null || skip === undefined ? '' : `&skip=${skip}`;
        try {
            let response = await get(`/history_loans/?loans_id=${id}${skipStr}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

            return response.data;
        } catch (e) {
            return e.response.status;
        }
    }

    // Обновление записи истории займа
    // @param token - токен авторизации пользователя
    // @param id - id займа
    // @param data - данные займа, которые нужно обновить
    // @return Возвращает объект обновленной записи
    async updateHistory(token: string, id: string, data) {
        try {
            let response = await put(`/history_loans/${id}`, data,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

            return response.data;
        } catch (e) {
            return e.response.status;
        }
    }

    // Создание записи истории займа
    // @param token - токен авторизации пользователя
    // @param data - данные истории займа, которые нужно создать
    // @return Возвращает объект созданной записи
    async createHistoryLoanRow(token: string, data) {
        try {
            let response = await post(`/history_loans/`, data,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

            return response.data;
        } catch (e) {
            return e.response.status;
        }
    }


    // Удаление записи истории займа
    // @param token - токен авторизации пользователя
    // @param id - row id займа
    // @return ничего не возвращает
    async deleteHistoryLoanById(token: string, id: string) {
        try {
            let response = await del(`/history_loans/?history_loan_row_id=${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
        } catch (e) {
            return e.response.status;
        }
    }
}