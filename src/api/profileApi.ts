'use strict';

import { API, APIresponse } from '../modules/api';

/**
 * Интерфейс для описания данных профиля
 */
export interface Profile {
    username: string;
    email: string;
    description: string;
    balance: number;
    role: number;
}

export class ProfileAPI {
    /**
     * Получить информацию профиля
     * @returns {Promise<Profile> | null} - ответ API
     */
    static async getMyInfo(): Promise<Profile> | null {
        const response = await API.fetch('/profile/my', {
            method: 'GET',
            headers: {},
        });
        const json = await response.json();
        return json['body'] || null;
    }

    /**
     * Обновить информацию профиля
     * @param {Profile} profile - информация профиля
     * @returns {Promise<APIresponse>} - ответ API
     */
    static async updateMyInfo(profile: Profile): Promise<APIresponse> {
        const response = await API.fetch('/profile/edit', {
            method: 'PUT',
            body: JSON.stringify(profile),
        });
        return response.json();
    }

    /**
     * Загрузить аватар для профиля
     * @param {File} file - файл
     * @returns {Promise<APIresponse>} - ответ API
     */
    static async uploadAvatar(file: File): Promise<APIresponse> {
        const formData = new FormData();
        formData.append('avatar', file);

        const response = await API.fetch(`/avatar/upload`, {
            method: 'PUT',
            headers: {},
            body: formData,
        });
        return response.json();
    }
}
