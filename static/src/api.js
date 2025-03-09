'use strict';

export class API {
    static get API_ORIGIN() {
        return 'http://localhost:8080';
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

    static async getCurrentUser() {
        const response = await this.fetch('/auth/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        return response.json();
    }
}
