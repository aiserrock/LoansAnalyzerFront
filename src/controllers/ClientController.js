import {get, post, put, del} from "../http_client/LoansClient";

// Контроллер, который обрабатывает запросы замймов
// !!! Если была получена ошибка, то методы будут возвращать её код
// 400 - не найдено, 409 - конфликт (уже есть клиент в базе)
// 401 - ошибка авторизации, 404 - отсутствует, 422 - ошибка парсинга
export default class ClientController {
    // Получение списка займов.
    // @param token - токен авторизации пользователя
    // @param skip - сколько записей пропустить, реализует пагинацию
    // @return Возвращает список найденных клиентов
    async getClients(token: string, skip = 0) {
        try {
            let param = '';
            if (skip !== 0 && skip !== null) {
                param = `?skip=${skip}`;
            }
            let response = await get(`/clients/${param}`,
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

    // Создание клиента
    // @param token - токен авторизации пользователя
    // @param name - имя нового клиента
    // @param phone - телефон нового клиента
    // @return Возвращает объект нового клиента
    async createClient(token: string, name: string, phone: string) {
        try {
            let response = await post(`/clients/?name=${name}&phone=${phone}`,
                null, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

            return response.data;
        } catch (e) {
            return e.response.status;
        }
    }

    // Получение клиента по идентификатору
    // @param token - токен авторизации пользователя
    // @param id - идентификатор клиента
    // @return Возвращает объект найденного клиента
    async getClientById(token: string, id: string) {
        try {
            let response = await get(`/clients/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

            return response.data;
        } catch (e) {
            console.log(e.response)
            return e.response.status;
        }
    }

    // Обновление данных клиента
    // @param token - токен авторизации пользователя
    // @param id - идентификатор клиента
    // @param data - новые данные клиента
    // @return Возвращает объект обновленного клиента
    async updateClient(token: string, id: string, data) {
        try {
            let response = await put(`/clients/${id}`, data,
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

    // Удаление клиента
    // @param token - токен авторизации пользователя
    // @param id - идентификатор клиента
    async deleteClient(token: string, id: string) {
        try {
            let response = await del(`/clients/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

            return response.data;
        } catch (e) {
            console.log(e.response);
            return e.response.status;
        }
    }
}