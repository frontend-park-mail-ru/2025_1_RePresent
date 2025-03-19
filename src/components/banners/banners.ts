'use strict';

import './banners.css';

import { Component } from '../../component';
import { loadPath } from '../..';
import { BannerListItem } from '../banner-list-item/banner-list-item';
import { UserAPI } from '../../api/userApi';
import { BannerAPI } from '../../api/bannerApi';
import { Button } from '../button/button';

/**
 * Интерфейс для описания данных пользователя
 */
interface User {
    id: number;
}

/**
 * Интерфейс для описания данных объявления
 */
interface Banner {
    status: number;
    title: string;
    description: string;
}

/**
 * Страница панели управления объявлениями
 */
export class BannersPage extends Component {
    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'banners/banners', {});
    }

    /**
     * Отрисовка списка объявлений
     * @param {User} user - данные пользователя
     */
    async renderList(user: User): Promise<void> {
        const adList = this.parent.querySelector('.list') as HTMLElement;
        if (!adList) {
            throw new Error('Element with class "list" not found');
        }

        const response = await BannerAPI.getAll(user.id);
        if (response.ok) {
            const data: Banner[] = await response.json();
            data.forEach(element => {
                const elProps = {
                    status: ['active', 'awaiting', 'rejected'][element.status - 1],
                    name: element.title,
                    stats: element.description,
                };
                new BannerListItem(adList).render(elProps);
            });
            return;
        }

        loadPath('/signin');
    }

    /**
     * Отрисовка страницы
     */
    render(): void {
        super.render();

        UserAPI.getCurrentUser()
            .then(async (user: User) => {
                await this.renderList(user);
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
