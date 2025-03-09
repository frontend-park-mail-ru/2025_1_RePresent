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

    static signUp(credentials) {
        return API.fetch('/auth/signup', {
            method: 'POST',
            body: JSON.stringify({
                username: credentials.username,
                email: credentials.email,
                password: credentials.password,
                role: credentials.role,
            }),
        });
    }

    static logIn(credentials) {
        return API.fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
                role: credentials.role,
            }),
        });
    }

    static logOut() {
        return API.fetch('/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }
}
