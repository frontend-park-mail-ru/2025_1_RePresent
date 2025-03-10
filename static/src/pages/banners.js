'use strict';

import { Component } from "../component.js";
import { loadPath } from "../main.js";
import { AdListItem } from "../components/ad-list-item.js";
import { UserAPI } from "../api/userApi.js";
import { BannerAPI } from "../api/bannerApi.js";
import { Button } from "../components/button.js";

export class BannersPage extends Component {

    getHTML() {
        return `
        <div class="navbar"></div>

        <div class="contents">
        <div class="ad-list">
            <h1>Мои объявления</h1>
            <button class="primary">Создать объявление</button>
            <div class="list">
                <p class="none-msg">Нет объявлений</p>
            </div>
        </div>
            <div class="main-section"></div>
        </div>  
        `;
    }

    render() {
        this.parent.innerHTML = '';

        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const adList = this.parent.querySelector('.list');

        UserAPI.getCurrentUser()
            .then(async (user) => {
                const response = await BannerAPI.getAll(user.id);
                if (response.ok) {
                    const data = await response.json();
                    data.forEach(element => {
                        new AdListItem(adList, ["active", "awaiting", "rejected"][element.status - 1], element.title, element.description).render();
                    });
                } else {
                    loadPath('/signin');
                }
                return adList;
            })
            .catch(err => {
                if (err.message == 'Unauthorized') {
                    loadPath('/signup');
                    return;
                }
                throw err;
            });

        // temporary
        const profileButton = new Button(this.parent, 'subtle', 'Профиль', () => {
            loadPath('/profile');
        });
        profileButton.render();
        profileButton.element.style.margin = '1rem';
    }
}
