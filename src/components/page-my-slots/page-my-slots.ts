'use strict';

import './page-my-slots.scss';

import { Component } from '../../modules/component';
import { ListSlot } from '../list-slot/list-slot';
import { MenuSectionSlot } from '../menu-section-slot/menu-section-slot';
import { Navbar } from '../navbar/navbar';

/**
 * Страница панели управления слотами
 */
export class PageMySlots extends Component {
    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'page-my-slots/page-my-slots', {});
    }

    /**
     * Отрисовка страницы
     */
    render(): void {
        super.render();

        // TODO make Page class for pages, which will render navbar
        const navbarContainer = this.rootElement.getElementsByClassName('navbar-container')[0] as HTMLElement;
        new Navbar(navbarContainer).render({ userAuthed: true, userRole: 'platform' });

        const contentsSection = this.rootElement.getElementsByClassName('contents')[0] as HTMLElement;
        const slotList = new ListSlot(contentsSection);
        slotList.render();

        const menuSection = new MenuSectionSlot(contentsSection);
        menuSection.render();
    }
}
