'use strict';

import './page-my-banners.css';

import { Component } from '../../component';
import { loadPath } from '../..';
import { User, UserAPI } from '../../api/userApi';
import { BannerAPI } from '../../api/bannerApi';
import { BannerList } from '../banner-list/banner-list';
import { MenuSection } from '../menu-section/menu-section';
import { Navbar } from '../navbar/navbar';

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

    /**
     * Отрисовка страницы
     */
    render(): void {
        super.render();

        // TODO make Page class for pages, which will render navbar
        const navbarContainer = this.rootElement.getElementsByClassName('navbar-container')[0] as HTMLElement;
        new Navbar(navbarContainer).render({ userAuthed: true, userRole: 'advertiser' });

        const contentsSection = this.rootElement.getElementsByClassName('contents')[0] as HTMLElement;
        const bannerList = new BannerList(contentsSection);
        bannerList.render({ banners: [] });

        const menuSection = new MenuSection(contentsSection);
        menuSection.render({
            bannerId: 1, // TODO get from API or NavigationAPI
            items: [
                { label: 'Редактор', menuName: 'editor' },
                { label: 'Статистика', menuName: 'statistics' },
                { label: 'Оплата', menuName: 'billing' },
                { label: 'Платформы', menuName: 'platforms' },
            ],
        });

        UserAPI.getCurrentUser()
            .then(async (user: User) => {
                const banners = await BannerAPI.getAll(user.id);
                bannerList.render({ banners });
            })
            .catch(err => {
                if (err.message === 'Unauthorized') {
                    loadPath('/signup');
                    return;
                }
                throw err;
            });
    }
}
