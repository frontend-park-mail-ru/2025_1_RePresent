'use strict';

import './menu-section.css';

import { dispatcher } from '../../modules/dispatcher';
import { Component } from '../../component';
import { MenuList, MenuListProps } from '../menu-list/menu-list';
import { MenuBannerEditor } from '../menu-banner-editor/menu-banner-editor';
import { store } from '../../modules/store';

/**
 * Раздел меню
 */
export class MenuSection extends Component {
    private selectedMenuName: string = 'editor';

    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'menu-section/menu-section', {});

        dispatcher.on('menu-select', (selectedName: string) => {
            this.selectedMenuName = selectedName;
            this.renderMenu();
        });

        dispatcher.on('store-updated-selectedBanner', () => {
            dispatcher.dispatch('menu-select', this.selectedMenuName);
        });

        dispatcher.on('banner-delete', () => {
            dispatcher.dispatch('menu-select', '');
        });
    }

    /**
     * Отрисовка выбранного меню
     */
    private renderMenu() {
        const hasSelectedBanner = store.get('selectedBanner') as boolean;
        if (!hasSelectedBanner) {
            return;
        }

        const menuContents = this.rootElement.getElementsByClassName('menu-contents')[0] as HTMLElement;
        menuContents.innerHTML = '';

        switch (this.selectedMenuName) {
            case 'editor':
                new MenuBannerEditor(menuContents).render();
                break;
            default:
                break;
        }
    }

    /**
     * Отрисовка
     */
    render(): void {
        super.render();

        const props: MenuListProps = {
            items: [
                { label: 'Редактор', menuName: 'editor' },
                { label: 'Статистика', menuName: 'statistics' },
                { label: 'Оплата', menuName: 'billing' },
                { label: 'Платформы', menuName: 'platforms' },
            ],
        };

        new MenuList(this.rootElement).render(props);

        this.rootElement.insertAdjacentHTML('beforeend', '<div class="menu-contents"></div>');
    }
}
