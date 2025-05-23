'use strict';

import { dispatcher } from '../../modules/dispatcher';
import { Component } from '../../modules/component';
import { MenuList, MenuListProps } from '../menu-list/menu-list';
import { MenuBannerEditor } from '../menu-banner-editor/menu-banner-editor';
import { store } from '../../modules/store';

/**
 * Раздел меню объявлений
 */
export class MenuSectionBanner extends Component {
    private selectedMenuName: string = '';

    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'menu-section-banner/menu-section-banner', {});

        dispatcher.on('menu-select', (selectedName: string) => {
            this.selectedMenuName = selectedName;
            this.renderMenu();
        });

        dispatcher.on('store-updated-hasBanners', () => {
            this.render();
        });

        dispatcher.on('store-updated-selectedBanner', () => {
            this.render();
            store.update({ key: 'fileId', value: '' });
            if (this.selectedMenuName == '') {
                this.selectedMenuName = 'editor';
            }
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
        const hasSelectedBanner = store.get<boolean>('selectedBanner');
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
     * Отрисовка сообщения при отсутствии выбранного объявления
     */
    private renderEmptyState(): void {
        const hasBanners = store.get<boolean>('hasBanners');
        let emptyStateMsg;
        if (hasBanners) {
            emptyStateMsg = 'Чтобы начать работу, выберите объявление';
        }
        if (!hasBanners) {
            emptyStateMsg = 'Чтобы начать работу, создайте объявление';
        }
        this.rootElement.insertAdjacentHTML('beforeend', `<p class="empty-state-msg">${emptyStateMsg}</p>`);
    }

    /**
     * Отрисовка
     */
    render(): void {
        super.render();

        const hasSelectedBanner = store.get<boolean>('selectedBanner');
        if (!hasSelectedBanner) {
            this.renderEmptyState();
            return;
        }

        const props: MenuListProps = {
            items: [
                { label: 'Редактор', menuName: 'editor' },
                // { label: 'Статистика', menuName: 'statistics' },
                // { label: 'Оплата', menuName: 'billing' },
            ],
        };

        new MenuList(this.rootElement).render(props);

        this.rootElement.insertAdjacentHTML('beforeend', '<div class="menu-contents"></div>');
    }
}
