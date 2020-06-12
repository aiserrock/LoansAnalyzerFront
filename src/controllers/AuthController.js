import {post} from "../http_client/LoansClient";

// Контроллер для авторизации
export class AuthController {
    // Делаем запрос аутентификации на сервере, с предоставленными логином
    // и паролем
    // @return json объект, содержащий токен и тип токена
    async auth(password: string, login: string) {
        let response = await post('/login',
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "data": `grant_type=&username=${login}&password=${password}`,
                }
            }
        );

        return response.data;
    }
}