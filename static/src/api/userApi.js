'use strict';

import { API } from "../modules/api.js";

export class UserAPI {
    static async getCurrentUser() {
        const response = await API.fetch('/auth/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        return response.json();
    }
}
