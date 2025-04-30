'use strict';

import { API, APIresponse } from '../modules/api';

/**
 * Интерфейс для описания параметров слота
 */
export interface Slot {
    id: number;
    title: string;
    status: number;
    perShow: number;
    beingCreated?: boolean;
}

export class SlotAPI {
    /**
     * Получить все слоты текущего пользователя
     * @returns {Promise<Slot[]>} - ответ API
     */
    static async getAll(): Promise<Slot[]> {
        const response = await API.fetch('/slot', {
            method: 'GET',
        });
        if (!response.ok) {
            return [];
        }
        return response.json();
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
        const response = await API.fetch(`/slot/${slot.id}`, {
            method: 'PUT',
            body: JSON.stringify(slot),
        });
        return response.json();
    }

    /**
     * Удалить слот для текущего пользователя
     * @param {number} slotId - id слота
     * @returns {Promise<APIresponse>} - ответ API
     */
    static async delete(slotId: number): Promise<APIresponse> {
        const response = await API.fetch(`/slot/${slotId}`, {
            method: 'DELETE',
        });
        return response.json();
    }
}
