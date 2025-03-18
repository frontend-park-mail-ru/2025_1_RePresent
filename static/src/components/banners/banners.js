'use strict';

import { Component } from '../../component.js';
import { loadPath } from '../../main.js';
import { BannerListItem } from '../banner-list-item/banner-list-item.js';
import { UserAPI } from '../../api/userApi.js';
import { BannerAPI } from '../../api/bannerApi.js';
import { Button } from '../button/button.js';

/**
 * Страница панели управления объявлениями
 */
export class BannersPage extends Component {
    /**
     * Конструктор компонента
     * @param {Node} parent - родительский узел компонента
     */
    constructor(parent) {
        super(parent, 'banners/banners');
    }

    render() {
        super.render();

        const adList = this.parent.querySelector('.list');

        UserAPI.getCurrentUser()
            .then(async (user) => {
                const response = await BannerAPI.getAll(user.id);
                if (response.ok) {
                    const data = await response.json();
                    data.forEach(element => {
                        const elProps = { status: ['active', 'awaiting', 'rejected'][element.status - 1], name: element.title, stats: element.description };
                        new BannerListItem(adList).render(elProps);
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
        const profileButton = new Button(this.parent);
        profileButton.render({
            type: 'subtle', text: 'Профиль', onClick: () => {
                loadPath('/profile');
            },
        });
        profileButton.rootElement.style.margin = '1rem';
    }
}
