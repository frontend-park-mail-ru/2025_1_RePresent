'use strict';

import { API } from "../modules/api.js";

export class BannerAPI {
    static getAll(userId) {
        return API.fetch(`/banner/user/${userId}/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }
}
