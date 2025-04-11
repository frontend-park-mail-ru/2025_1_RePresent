'use strict';

import { loadPath } from './router';

export interface APIresponse {
    service: {
        error: string;
        success: string;
    };
}

/**
 * Обертка запросов к API
 */
export class API {
    /**
     * Адрес API, подставляемый сервером из конфига перед отправкой клиенту
     */
    static get API_ORIGIN(): string {
        return 'ENV_API_ORIGIN/api/ENV_API_VERSION';
    }

    /**
     * Обертка fetch с обработкой неавторизованного запроса (JSON body по умолчанию)
     * @param {string} inputRelative - путь, относительно /api/version/
     * @param {RequestInit} init - параметры fetch
     * @returns {Promise<Response>} response - ответ API
     */
    static async fetch(inputRelative: string, init?: RequestInit): Promise<Response> {
        if (!init) {
            init = {};
        }
        init.mode = 'cors';
        init.credentials = 'include';
        if (!init.headers) {
            init.headers = {
                'Content-Type': 'application/json',
            };
        }

        const response = await fetch(this.API_ORIGIN + inputRelative, init);

        if (response.status === 401) {
            loadPath('/signin', { signInRedirectPath: location.pathname });
        }

        if (response.status >= 500) {
            alert('Сервис временно недоступен');
        }

        return response;
    }
}
