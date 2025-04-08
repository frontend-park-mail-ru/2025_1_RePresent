'use strict';

import { API, APIresponse } from '../modules/api';

/**
 * Интерфейс для описания параметров объявления
 */
export interface Banner {
    id: number;
    title: string;
    description: string;
    content: string;
    link: string;
    balance: number;
    status: number;
    owner: number;
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
        const response = await API.fetch(`/banner/${banner.id}`, {
            method: 'PUT',
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
        formData.append('image', file);

        const response = await API.fetch(`/banner/upload`, {
            method: 'PUT',
            body: formData,
        });
        return response.json();
    }

    /**
     * Получить iframe баннера
     * @param {number} bannerId - id баннера
     * @returns {Promise<string>} - ответ API
     */
    static async getIframe(bannerId: number): Promise<string> {
        const response = await API.fetch(`/banner/iframe/${bannerId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.text();
    }
}
