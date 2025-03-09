'use strict';

export class API {
    static get API_ORIGIN() {
        return 'ENV_API_ORIGIN/api/ENV_API_VERSION';
    }

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
