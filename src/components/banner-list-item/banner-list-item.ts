'use strict';

import './banner-list-item.css';

import { Component } from '../../component';

/**
 * Интерфейс для описания параметров компонента
 */
interface BannerListItemProps {
    status: string;
    name: string;
    stats: string;
}

/**
 * Элемент списка объявлений
 */
export class BannerListItem extends Component {
    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'banner-list-item/banner-list-item', {});
    }

    /**
     * Отрисовка
     * @param {BannerListItemProps} props - параметры компонента
     */
    render(props: BannerListItemProps): void {
        super.render(props);
    }
}
