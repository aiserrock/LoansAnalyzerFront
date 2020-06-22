import {get, put} from "../http_client/LoansClient";

// Контроллер, который обрабатывает запросы пользовательских данных
// !!! Если была получена ошибка, то методы будут возвращать её код
// 401 - ошибка авторизации, 404 - отсутствует, 422 - ошибка парсинга
export default class UsersController {
    // Получение пользователя по его идентификатору
    // @param token - токен авторизации пользователя
    // @param id - идентификатор пользователя
    // @return Возвращает список найденных пользователей
    async getUserById(token: string, id: string) {
        try {
            let response = await get(`/users/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Access-Control-Allow-Origin": "*",
                    },
                });

            return response.data;
        } catch (e) {
            return e?.response?.status;
        }
    }

    // Обновление пользователя по его идентификатору
    // @param token - токен авторизации пользователя
    // @param id - идентификатор пользователя
    // @param data - данные пользователя, которые надо обновить
    // @return Возвращает объект нового пользователя
    async updateUserById(token: string, id: string, data) {
        try {
            let response = await put(`/users/${id}`, data,
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

            return response.data;
        } catch (e) {
            return e?.response?.status;
        }
    }
}