'use strict';

import { API, APIresponse } from '../modules/api';

/**
 * Запрос пополнения статистики баннера/слота
 */
interface GetStatsRequest {
    from: Date;
    to: Date;
    activity: string;
    banner?: number;
    slot?: string;
}

export class AdvAPI {
    /**
     * Форматировать дату
     * @param {Date} date - дата
     * @returns {string} - строка даты
     */
    private static formatDateUTC(date: Date): string {
        return `${date.getUTCFullYear()}-${('0' + (date.getUTCMonth() + 1)).slice(-2)}-${('0' + date.getUTCDate()).slice(-2)}`;
    }

    /**
     * Получить статистику баннера/слота
     * @param {GetStatsRequest} request - запрос
     * @returns {Promise<APIresponse>} - ответ API
     */
    static async getStats(request: GetStatsRequest): Promise<APIresponse> {
        const requestStr = {
            from: this.formatDateUTC(request.from),
            to: this.formatDateUTC(request.to),
            activity: request.activity,
            banner: request.banner?.toString() || '',
            slot: request.slot || '',
        };
        const response = await API.fetch('/adv/my-metrics?' + new URLSearchParams(requestStr).toString(), {
            method: 'GET',
        });
        return response.json();
    }
}
