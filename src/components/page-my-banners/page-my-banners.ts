'use strict';

import './page-my-banners.css';

import { Component } from '../../component';
import { loadPath } from '../..';
import { UserAPI } from '../../api/userApi';
import { BannerAPI } from '../../api/bannerApi';
import { Button } from '../button/button';
import { BannerList } from '../banner-list/banner-list';
import { Banner } from '../banner-list-item/banner-list-item';

/**
 * Интерфейс для описания данных пользователя
 */
interface User {
    id: number;
}

/**
 * Страница панели управления объявлениями
 */
export class PageMyBanners extends Component {
    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'page-my-banners/page-my-banners', {});
    }

    private async getBanners(userId: number): Promise<Banner[]> {
        const response = await BannerAPI.getAll(userId);
        if (response.ok) {
            return await response.json();
        }

        loadPath('/signin');
    }

    /**
     * Отрисовка страницы
     */
    render(): void {
        super.render();

        const contentsSection = this.rootElement.getElementsByClassName('contents')[0] as HTMLElement;
        const bannerList = new BannerList(contentsSection);
        bannerList.render({ banners: [] });

        UserAPI.getCurrentUser()
            .then(async (user: User) => {
                const banners = await this.getBanners(user.id);
                bannerList.render({ banners });
            })
            .catch(err => {
                if (err.message === 'Unauthorized') {
                    loadPath('/signup');
                    return;
                }
                throw err;
            });

        // Временная кнопка для перехода в профиль
        const profileButton = new Button(this.parent);
        profileButton.render({
            type: 'subtle',
            text: 'Профиль',
            onClick: () => {
                loadPath('/profile');
            },
        });
    }
}
