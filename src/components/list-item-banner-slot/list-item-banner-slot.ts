'use strict';

import './list-item-banner-slot.scss';

import { Component, Props } from '../../modules/component';
import { dispatcher } from '../../modules/dispatcher';

/**
 * Интерфейс для описания параметров компонента
 */
export interface ListItemBannerSlotProps extends Props {
    itemId: number | string;
    name: string;
    stats: string;
    status: 'active' | 'awaiting' | 'rejected';
    selected: boolean;
}

/**
 * Элемент списка объявлений/слотов
 */
export class ListItemBannerSlot extends Component {
    protected props: ListItemBannerSlotProps;

    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'list-item-banner-slot/list-item-banner-slot', {});
    }

    /**
     * Обработчик нажатия на компонент
     */
    private onClick() {
        if (this.props.selected) {
            return;
        }
        dispatcher.dispatch('item-select', this.props.itemId);
    }

    /**
     * Отрисовка
     * @param {ListItemBannerSlotProps} props - параметры компонента
     */
    render(props: ListItemBannerSlotProps): void {
        const selected = props.selected ? 'selected' : '';
        super.render({ ...props, selected });

        this.rootElement.addEventListener('click', this.onClick.bind(this));
    }
}
