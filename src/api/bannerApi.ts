'use strict';

import { API } from '../modules/api';

/**
 * Интерфейс для описания параметров объявления
 */
export interface Banner {
    id: number;
    owner: number;
    title: string;
    description: string;
    url_content: string;
    status: number;
}

export class BannerAPI {
    /**
     * Получить все баннеры для указанного пользователя
     * @param {number} userId - ID пользователя
     * @returns {Promise<Banner[]>} - ответ API
     */
    static async getAll(userId: number): Promise<Banner[]> {
        const response = await API.fetch(`/banner/user/${userId}/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    }
}
