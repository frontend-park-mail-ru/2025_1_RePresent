'use strict';

import { API } from '../modules/api';

/**
 * Интерфейс для описания структуры учетных данных
 */
interface Credentials {
    username?: string;
    email: string;
    password: string;
    role: number;
}

export class UserAPI {
    /**
     * Получить текущего пользователя
     * @returns {Promise<any>} - данные текущего пользователя
     */
    static async getCurrentUser(): Promise<any> {
        const response = await API.fetch('/auth/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        return response.json();
    }

    /**
     * Зарегистрировать нового пользователя
     * @param {Credentials} credentials - учетные данные пользователя
     * @returns {Promise<Response>} - ответ API
     */
    static signUp(credentials: Credentials): Promise<Response> {
        return API.fetch('/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
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
            headers: {
                'Content-Type': 'application/json',
            },
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
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
