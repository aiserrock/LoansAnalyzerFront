import {post} from "../http_client/LoansClient";

// Контроллер для авторизации
export default class AuthController {
    // Делаем запрос аутентификации на сервере, с предоставленными логином
    // и паролем
    // @return json объект, содержащий токен и тип токена
    // Если произошла ошибка, вернется null.
    async auth(login: string, password: string) {
        try {
            let response = await post('/login', `username=${login}&password=${password}`,
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            return response.data;
        } catch (e) {
            return null;
        }
    }
}