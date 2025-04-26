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
        const ONE_MINUTE = 60 * 1000;

        if (lastShownTime && (now - lastShownTime) < ONE_MINUTE) {
            return {
                service: {
                    error: '',
                    success: '',
                },
                body: {
                    success: false,
                    message: 'Запрос для этого page_id был сделан недавно. Попробуйте позже.',
                    data: null
                }
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
        // const response = await API.fetch('/csat/send', {
        //     method: 'POST',
        //     body: JSON.stringify(csatReview),
        // });
        // return response.json();

        let init = {} as RequestInit;
        init.mode = 'cors';
        init.credentials = 'include';
        if (!init.headers) {
            init.headers = {
                'Content-Type': 'application/json',
            };
        }
        init.body = JSON.stringify(csatReview);
        const response = await fetch('http://109.120.190.243:8035/api/v1/csat/send') as Response;
        return <APIresponse><unknown>response;
    }

    static async getMyReviews(): Promise<APIresponse> {
        let init = {} as RequestInit;
        init.mode = 'cors';
        init.credentials = 'include';
        if (!init.headers) {
            init.headers = {
                'Content-Type': 'application/json',
            };
        }
        const response = await fetch('http://109.120.190.243:8035/api/v1/csat/') as Response;
        return <APIresponse><unknown>response;

        // const response = await API.fetch('/csat/my-reviews', {
        //     method: 'GET',
        // });
        // return response.json();


        // return {
        //     service: {
        //         error: '',
        //         success: 'Отзывы',
        //     },
        //     body: {
        //         reviews: [
        //             {
        //                 page_id: 'Profile',
        //                 question: 'Понравился ли профиль?',
        //                 comment: 'Все круто',
        //                 rating: 5,
        //             } as CsatReview,
        //             {
        //                 page_id: 'Profile',
        //                 question: 'Понравился ли профиль?',
        //                 comment: 'Все норм',
        //                 rating: 3,
        //             } as CsatReview,
        //         ]
        //     },
        // };
    }
}
