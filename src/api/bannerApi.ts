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
    max_price: string;
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
        });
        if (!response.ok) {
            return [];
        }
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
            body: JSON.stringify(banner),
        });
        return response.json();
    }

    /**
     * Удалить баннер для текущего пользователя
     * @param {number} bannerId - id баннера
     * @returns {Promise<APIresponse>} - ответ API
     */
    static async delete(bannerId: number): Promise<APIresponse> {
        const response = await API.fetch(`/banner/${bannerId}`, {
            method: 'DELETE',
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
            headers: {},
            body: formData,
        });
        return response.json();
    }

    /**
     * Сгенерировать изображение баннера
     * @param {string} title - название баннера
     * @returns {Promise<Response>} - ответ API
     */
    static async generateImage(title: string): Promise<Response> {
        return API.fetch(`/banner/generate/image?title=${title}`, {
            method: 'POST',
        });
    }

    /**
     * Сгенерировать описание баннера
     * @param {number} bannerId - id баннера
     * @returns {Promise<APIresponse>} - ответ API
     */
    static async generateDescription(bannerId: number): Promise<APIresponse> {
        const response = await API.fetch(`/banner/generate/description/${bannerId}`, {
            method: 'POST',
        });
        return response.json();
    }
}
