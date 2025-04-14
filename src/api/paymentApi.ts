'use strict';

import { API, APIresponse } from '../modules/api';

/**
 * Ответ получения баланса
 */
interface GetBalanceResponse extends APIresponse {
    balance: number;
}

/**
 * Ответ пополнения счета
 */
interface TopUpResponse extends APIresponse {
    transactionId: string;
    status: string;
    nextAction: string;
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
     * @param {number} amount - сумма пополнения
     * @returns {Promise<APIresponse>} - ответ API
     */
    static async topUp(amount: number): Promise<TopUpResponse> {
        const response = await API.fetch('/payment/accounts/topup', {
            method: 'PUT',
            body: JSON.stringify({ amount }),
        });
        return response.json();
    }
}
