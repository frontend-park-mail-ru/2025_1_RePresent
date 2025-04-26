'use strict';

import { API, APIresponse } from '../modules/api';

/**
 * Интерфейс для описания отзыва CSAT
 */
interface CsatReview {
    page_id: string;
    question: string;
    rating: number;
    comment: string;
}

export class CsatAPI {
    /**
     * Получить вопрос по странице
     * @param {string} page_id - имя страницы
     * @returns {Promise<APIresponse>} - ответ API
     */
    static async getQuestion(page_id: string): Promise<APIresponse> {
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
}
