'use strict';

import { API, APIresponse } from '../modules/api';

/**
 * Ответ получения баланса
 */
interface GetBalanceResponse extends APIresponse {
    balance: number;
}

/**
 * Запрос пополнения счета
 */
interface TopUpRequest {
    value: string;
    currency: string;
    return_url: string;
    description: string;
    idempotence_key: string;
}

/**
 * Ответ пополнения счета
 */
interface TopUpResponse {
    confirmation_url: string;
}

export class PaymentAPI {
    /**
     * Получить баланс текущего пользователя
     * @returns {Promise<GetBalanceResponse>} - ответ API
     */
    static async getBalance(): Promise<GetBalanceResponse> {
        const response = await API.fetch('/payment/balance', {
            method: 'GET',
        });
        return response.json();
    }

    /**
     * Пополнить счет текущего пользователя
     * @param {TopUpRequest} request - запрос
     * @returns {Promise<APIresponse>} - ответ API
     */
    static async topUp(request: TopUpRequest): Promise<TopUpResponse> {
        const response = await API.fetch('/payment/transactions', {
            method: 'POST',
            body: JSON.stringify(request),
        });
        return response.json();
    }
}
