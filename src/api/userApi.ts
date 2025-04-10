'use strict';

import { API, APIresponse } from '../modules/api';

/**
 * Интерфейс для описания данных аутентификации
 */
interface Credentials {
    username?: string;
    email: string;
    password: string;
    role: number;
}

export class UserAPI {
    /**
     * Зарегистрировать нового пользователя
     * @param {Credentials} credentials - учетные данные пользователя
     * @returns {Promise<APIresponse>} - ответ API
     */
    static async signUp(credentials: Credentials): Promise<APIresponse> {
        const response = await API.fetch('/auth/signup', {
            method: 'POST',
            body: JSON.stringify({
                username: credentials.username,
                email: credentials.email,
                password: credentials.password,
                role: credentials.role,
            }),
        });
        return response.json();
    }

    /**
     * Войти в систему
     * @param {Credentials} credentials - учетные данные пользователя
     * @returns {Promise<APIresponse>} - ответ API
     */
    static async logIn(credentials: Credentials): Promise<APIresponse> {
        const response = await API.fetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
                role: credentials.role,
            }),
        });
        return response.json();
    }

    /**
     * Выйти из системы
     * @returns {Promise<APIresponse>} - ответ API
     */
    static async logOut(): Promise<APIresponse> {
        const response = await API.fetch('/auth/logout', {
            method: 'POST',
            headers: {},
        });
        return response.json();
    }
}
