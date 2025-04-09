'use strict';

import { API } from '../modules/api';

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
     * @returns {Promise<Response>} - ответ API
     */
    static signUp(credentials: Credentials): Promise<Response> {
        return API.fetch('/auth/signup', {
            method: 'POST',
            body: JSON.stringify({
                username: credentials.username,
                email: credentials.email,
                password: credentials.password,
                role: credentials.role,
            }),
        });
    }

    /**
     * Войти в систему
     * @param {Credentials} credentials - учетные данные пользователя
     * @returns {Promise<Response>} - ответ API
     */
    static logIn(credentials: Credentials): Promise<Response> {
        return API.fetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
                role: credentials.role,
            }),
        });
    }

    /**
     * Выйти из системы
     * @returns {Promise<Response>} - ответ API
     */
    static logOut(): Promise<Response> {
        return API.fetch('/auth/logout', {
            method: 'POST',
            headers: {},
        });
    }
}
