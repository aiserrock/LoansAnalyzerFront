import {post} from "../http_client/LoansClient";

// Контроллер для авторизации
export class AuthController {
    // Делаем запрос аутентификации на сервере, с предоставленными логином
    // и паролем
    // @return json объект, содержащий токен и тип токена
    // Если произошла ошибка, вернется null.
    async auth(password: string, login: string) {
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