'use strict';

import './banner-list-item.css';

import { Component, Props } from '../../component';

/**
 * Интерфейс для описания параметров компонента
 */
export interface Banner extends Props {
    status: number;
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
     * @param {Banner} props - параметры компонента
     */
    render(props: Banner): void {
        const renderProps = {
            status: ['active', 'awaiting', 'rejected'][props.status - 1],
            name: props.name,
            stats: props.stats,
        };
        super.render(renderProps);
    }
}
