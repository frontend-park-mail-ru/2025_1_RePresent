'use strict';

import { API, APIresponse } from '../modules/api';

/**
 * Интерфейс для описания параметров объявления
 */
export interface Banner {
    ID: number;
    Title: string;
    Description: string;
    Content: string;
    Link: string;
    Balance: number;
    Status: number;
    OwnerID: number;
    beingCreated?: boolean;
}

export class BannerAPI {
    /**
     * Получить все баннеры текущего пользователя
     * @returns {Promise<Banner[]>} - ответ API
     */
    static async getAll(): Promise<Banner[]> {
        const response = await API.fetch('/banner', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    }

    /**
     * Создать баннер для текущего пользователя
     * @param {Banner} banner - баннер
     * @returns {Promise<APIresponse>} - ответ API
     */
    static async create(banner: Banner): Promise<APIresponse> {
        const response = await API.fetch('/banner/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(banner),
        });
        return response.json();
    }

    /**
     * Создать баннер для текущего пользователя
     * @param {Banner} banner - баннер
     * @returns {Promise<APIresponse>} - ответ API
     */
    static async update(banner: Banner): Promise<APIresponse> {
        const response = await API.fetch(`/banner/${banner.ID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(banner),
        });
        return response.json();
    }

    /**
     * Загрузить файл на баннер
     * @param {File} file - файл
     * @returns {Promise<APIresponse>} - ответ API
     */
    static async upload(file: File): Promise<APIresponse> {
        const formData = new FormData();
        formData.append('file', file);

        const response = await API.fetch(`/banner/upload`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        });
        return response.json();
    }
}
