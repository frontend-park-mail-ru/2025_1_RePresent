'use strict';

import './page-my-banners\.scss';

import { Component } from '../../modules/component';
import { ListBanner } from '../list-banner/list-banner';
import { MenuSectionBanner } from '../menu-section-banner/menu-section-banner';
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
        const bannerList = new ListBanner(contentsSection);
        bannerList.render();

        const menuSection = new MenuSectionBanner(contentsSection);
        menuSection.render();
    }
}
