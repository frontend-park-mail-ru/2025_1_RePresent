'use strict';

import { API, APIresponse } from '../modules/api';

/**
 * Интерфейс для описания параметров слота
 */
export interface Slot {
    slot_name: string;
    is_active: boolean;
    min_price: string;
    format_code: number;
    link?: string;
    beingCreated?: boolean;
}

/**
 * Интерфейс для описания формата отображения слотов
 */
export interface SlotFormat {
    code: number;
    width: number;
    height: number;
    description: string;
}

export class SlotAPI {
    /**
     * Получить все слоты текущего пользователя
     * @returns {Promise<Slot[]>} - ответ API
     */
    static async getAll(): Promise<Slot[]> {
        const response = await API.fetch('/slot/my', {
            method: 'GET',
        });
        if (!response.ok) {
            return [];
        }
        return (await response.json())['body'];
    }

    /**
     * Создать слот для текущего пользователя
     * @param {Slot} slot - слот
     * @returns {Promise<APIresponse>} - ответ API
     */
    static async create(slot: Slot): Promise<APIresponse> {
        const response = await API.fetch('/slot/create', {
            method: 'POST',
            body: JSON.stringify(slot),
        });
        return response.json();
    }

    /**
     * Обновить слот для текущего пользователя
     * @param {Slot} slot - слот
     * @returns {Promise<APIresponse>} - ответ API
     */
    static async update(slot: Slot): Promise<APIresponse> {
        const response = await API.fetch(`/slot/edit`, {
            method: 'PUT',
            body: JSON.stringify(slot),
        });
        return response.json();
    }

    /**
     * Удалить слот для текущего пользователя
     * @param {string} link - ссылка слота
     * @returns {Promise<APIresponse>} - ответ API
     */
    static async delete(link: string): Promise<APIresponse> {
        const response = await API.fetch(`/slot/delete`, {
            method: 'DELETE',
            body: JSON.stringify({ link }),
        });
        return response.json();
    }

    /**
     * Получить все форматы отображения слотов
     * @returns {Promise<SlotFormat[]>} - ответ API
     */
    static async getFormats(): Promise<SlotFormat[]> {
        const response = await API.fetch('/slot/formats', {
            method: 'GET',
        });
        if (!response.ok) {
            return [];
        }
        return (await response.json())['body'];
    }
}
