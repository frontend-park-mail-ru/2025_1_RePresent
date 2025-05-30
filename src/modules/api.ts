'use strict';

import { stopBalanceChecks } from './lowBalanceAlert';
import { reAlert } from './re-alert';
import { loadPath } from './router';

export interface APIresponse {
    service: {
        error: string;
        success: string;
    };
    body: any;
}

/**
 * Обертка запросов к API
 */
export class API {
    /**
     * Адрес API, подставляемый сервером из конфига перед отправкой клиенту
     */
    public static readonly API_ORIGIN = 'ENV_API_ORIGIN/api/ENV_API_VERSION';

    /**
     * Путь к стандартному изображению
     */
    public static readonly PLACEHOLDER_IMAGE_PATH = '/static/images/default-pic.png';

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
            stopBalanceChecks();
        }

        if (response.status >= 500) {
            reAlert({
                message: 'Сервис временно недоступен',
                type: 'error',
                lifetimeS: '30',
            });
        }

        return response;
    }
}
