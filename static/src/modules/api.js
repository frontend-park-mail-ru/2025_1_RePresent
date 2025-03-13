'use strict';

/**
 * Обертка запросов к API
 */
export class API {
    /**
     * Адрес API, подставляемый сервером из конфига перед отправкой клиенту
     */
    static get API_ORIGIN() {
        return 'ENV_API_ORIGIN/api/ENV_API_VERSION';
    }

    /**
     * Обертка fetch с обработкой неавторизованного запроса
     * @param {string} inputRelative - путь, относительно /api/version/
     * @param {Object} init - параметры fetch
     * @returns {Response} response - ответ API
     */
    static async fetch(inputRelative, init) {
        if (!init) {
            init = {};
        }
        init.mode = 'cors';
        init.credentials = 'include';
        const response = await fetch(this.API_ORIGIN + inputRelative, init);
        if (response.status == 401) {
            throw new Error('Unauthorized');
        }
        return response;
    }
}
