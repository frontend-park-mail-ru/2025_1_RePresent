'use strict';

import './page-my-banners.css';

import { Component } from '../../component';
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
        bannerList.render();

        const menuSection = new MenuSection(contentsSection);
        menuSection.render({
            items: [
                { label: 'Редактор', menuName: 'editor' },
                { label: 'Статистика', menuName: 'statistics' },
                { label: 'Оплата', menuName: 'billing' },
                { label: 'Платформы', menuName: 'platforms' },
            ],
        });
    }
}
