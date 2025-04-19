'use strict';

import './banner-list-item\.scss';

import { Component, Props } from '../../component';
import { dispatcher } from '../../modules/dispatcher';

/**
 * Интерфейс для описания параметров компонента
 */
export interface BannerListItemProps extends Props {
    bannerId: number;
    name: string;
    stats: string;
    status: 'active' | 'awaiting' | 'rejected';
    selected: boolean;
}

/**
 * Элемент списка объявлений
 */
export class BannerListItem extends Component {
    protected props: BannerListItemProps;

    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'banner-list-item/banner-list-item', {});
    }

    /**
     * Обработчик нажатия на компонентт
     */
    private onClick() {
        if (this.props.selected) {
            return;
        }
        dispatcher.dispatch('banner-select', this.props.bannerId);
    }

    /**
     * Отрисовка
     * @param {BannerListItemProps} props - параметры компонента
     */
    render(props: BannerListItemProps): void {
        const selected = props.selected ? 'selected' : '';
        super.render({ ...props, selected });

        this.rootElement.addEventListener('click', this.onClick.bind(this));
    }
}
