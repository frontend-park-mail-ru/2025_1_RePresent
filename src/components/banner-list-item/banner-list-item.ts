'use strict';

import './banner-list-item.css';

import { Component, Props } from '../../component';
import { dispatcher } from '../../modules/dispatcher';

export interface BannerListItemProps extends Props {
    bannerId: number;
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
        const renderProps = {
            status: ['active', 'awaiting', 'rejected'][props.Status - 1],
            selected: props.selected ? 'selected' : '',
            name: props.Title,
            stats: props.Description,
        };
        super.render(renderProps);

        this.rootElement.addEventListener('click', this.onClick.bind(this));
    }
}
