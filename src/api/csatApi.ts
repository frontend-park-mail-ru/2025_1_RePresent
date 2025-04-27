'use strict';

import { API, APIresponse } from '../modules/api';

/**
 * Интерфейс для описания отзыва CSAT
 */
export interface CsatReview {
    page_id: string;
    question: string;
    rating: number;
    comment: string;
}

export class CsatAPI {
    /**
     * Получить вопрос по странице или null
     * @param {string} page_id - имя страницы
     * @returns {Promise<APIresponse>} - ответ API
     */
    static async getQuestion(page_id: string): Promise<APIresponse> {
        const now = Date.now();

        const cacheDataStr = localStorage.getItem('csatShowCache');
        let cacheData: { [key: string]: number } = {};

        if (cacheDataStr) {
            cacheData = JSON.parse(cacheDataStr);
        }

        const lastShownTime = cacheData[page_id];
        const COOLDOWN_MS = 24 * 60 * 60 * 1000;

        if (lastShownTime && (now - lastShownTime) < COOLDOWN_MS) {
            return {
                service: {
                    error: 'cooldown',
                    success: '',
                },
            } as APIresponse;
        }

        cacheData[page_id] = now;
        localStorage.setItem('csatShowCache', JSON.stringify(cacheData));

        const response = await API.fetch(`/csat/show/${page_id}`, {
            method: 'GET',
        });
        return response.json();
    }

    /**
     * Отправить отзыв CSAT
     * @param {CsatReview} csatReview - отзыв
     * @returns {Promise<APIresponse>} - ответ API
     */
    static async submitReview(csatReview: CsatReview): Promise<APIresponse> {
        const response = await API.fetch('/csat/send', {
            method: 'POST',
            body: JSON.stringify(csatReview),
        });
        return response.json();
    }

    /**
     * Получить все отзывы CSAT
     * @returns {Promise<APIresponse>} - ответ API
     */
    static async getMyReviews(): Promise<APIresponse> {
        const response = await API.fetch('/csat/my-reviews', {
            method: 'GET',
        });
        return response.json();
    }
}
