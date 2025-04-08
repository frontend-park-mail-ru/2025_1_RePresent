'use strict';

import './menu-section.css';

import { dispatcher } from '../../modules/dispatcher';
import { Component } from '../../component';
import { MenuList, MenuListProps } from '../menu-list/menu-list';
import { MenuBannerEditor } from '../menu-banner-editor/menu-banner-editor';
import { store } from '../../modules/store';

/**
 * Интерфейс для описания параметров компонента
 */
interface MenuSectionProps extends MenuListProps { }

/**
 * Список меню
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
     * @param {MenuSectionProps} props - параметры компонента
     */
    render(props: MenuSectionProps): void {
        super.render(props);

        new MenuList(this.rootElement).render(props);

        this.rootElement.insertAdjacentHTML('beforeend', '<div class="menu-contents"></div>');
    }
}
