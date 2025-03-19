'use strict';

import { API } from '../modules/api';

export class BannerAPI {
    /**
     * Получить все баннеры для указанного пользователя
     * @param {number} userId - ID пользователя
     * @returns {Promise<Response>} - ответ API
     */
    static getAll(userId: number): Promise<Response> {
        return API.fetch(`/banner/user/${userId}/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
