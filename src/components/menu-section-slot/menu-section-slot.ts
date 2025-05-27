'use strict';

import { dispatcher } from '../../modules/dispatcher';
import { Component } from '../../modules/component';
import { MenuList, MenuListProps } from '../menu-list/menu-list';
import { MenuSlotEditor } from '../menu-slot-editor/menu-slot-editor';
import { MenuBannerSlotStatistics } from '../menu-banner-slot-statistics/menu-banner-slot-statistics';
import { store } from '../../modules/store';
import { Slot } from '../../api/slotApi';

/**
 * Раздел меню слотов
 */
export class MenuSectionSlot extends Component {
    private selectedMenuName: string = '';

    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'menu-section-slot/menu-section-slot', {});

        dispatcher.on('menu-select', (selectedName: string) => {
            this.selectedMenuName = selectedName;
            this.renderMenu();
        });

        dispatcher.on('store-updated-hasSlots', () => {
            this.render();
        });

        dispatcher.on('store-updated-selectedSlot', () => {
            this.render();
            if (this.selectedMenuName == '') {
                this.selectedMenuName = 'editor';
            }
            dispatcher.dispatch('menu-select', this.selectedMenuName);
        });

        dispatcher.on('slot-delete', () => {
            dispatcher.dispatch('menu-select', '');
        });
    }

    /**
     * Отрисовка выбранного меню
     */
    private renderMenu() {
        const hasSelectedSlot = store.get<boolean>('selectedSlot');
        if (!hasSelectedSlot) {
            return;
        }

        const menuContents = this.rootElement.getElementsByClassName('menu-contents')[0] as HTMLElement;
        menuContents.innerHTML = '';

        switch (this.selectedMenuName) {
            case 'editor':
                new MenuSlotEditor(menuContents).render();
                break;
            case 'statistics':
                new MenuBannerSlotStatistics(menuContents).render({ type: 'slot' });
                break;
            default:
                break;
        }
    }

    /**
     * Отрисовка сообщения при отсутствии выбранного слота
     */
    private renderEmptyState(): void {
        const hasSlots = store.get<boolean>('hasSlots');
        let emptyStateMsg;
        if (hasSlots) {
            emptyStateMsg = 'Чтобы начать работу, выберите слот';
        }
        if (!hasSlots) {
            emptyStateMsg = 'Чтобы начать размещать рекламу, создайте слот';
        }
        this.rootElement.insertAdjacentHTML('beforeend', `<p class="empty-state-msg">${emptyStateMsg}</p>`);
    }

    /**
     * Отрисовка
     */
    render(): void {
        super.render();

        const selectedSlot = store.get<Slot>('selectedSlot');
        if (!selectedSlot) {
            this.renderEmptyState();
            return;
        }

        const props: MenuListProps = {
            items: (selectedSlot.beingCreated) ?
                [
                    { label: 'Редактор', menuName: 'editor' },
                ]
                : [
                    { label: 'Редактор', menuName: 'editor' },
                    { label: 'Статистика', menuName: 'statistics' },
                ],
        };

        new MenuList(this.rootElement).render(props);

        this.rootElement.insertAdjacentHTML('beforeend', '<div class="menu-contents"></div>');
    }
}
