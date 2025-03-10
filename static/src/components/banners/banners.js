'use strict';

import { Component } from '../../component.js';
import { loadPath } from '../../main.js';
import { AdListItem } from '../ad-list-item/ad-list-item.js';
import { UserAPI } from '../../api/userApi.js';
import { BannerAPI } from '../../api/bannerApi.js';
import { Button } from '../button/button.js';

export class BannersPage extends Component {

    getHTML() {
        const template = Handlebars.templates['components/banners/banners'];
        return template();
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
                        new AdListItem(adList, ['active', 'awaiting', 'rejected'][element.status - 1], element.title, element.description).render();
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
