'use strict';

import './banner-slot-list-item.scss';

import { Component, Props } from '../../modules/component';
import { dispatcher } from '../../modules/dispatcher';

/**
 * Интерфейс для описания параметров компонента
 */
export interface BannerSlotListItemProps extends Props {
    itemId: number;
    name: string;
    stats: string;
    status: 'active' | 'awaiting' | 'rejected';
    selected: boolean;
}

/**
 * Элемент списка объявлений/слотов
 */
export class BannerSlotListItem extends Component {
    protected props: BannerSlotListItemProps;

    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'banner-slot-list-item/banner-slot-list-item', {});
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
     * @param {BannerSlotListItemProps} props - параметры компонента
     */
    render(props: BannerSlotListItemProps): void {
        const selected = props.selected ? 'selected' : '';
        super.render({ ...props, selected });

        this.rootElement.addEventListener('click', this.onClick.bind(this));
    }
}
