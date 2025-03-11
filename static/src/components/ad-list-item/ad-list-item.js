'use strict';

import { Component } from '../../component.js';

/**
 * Элемент списка объявлений
 */
export class AdListItem extends Component {
    /**
     * Конструктор компонента
     * @param {Node} parent - родительский узел компонента
     */
    constructor(parent) {
        super(parent, 'ad-list-item/ad-list-item');
    }

    /**
     * Отрисовка
     * @param {Object} props - параметры компонента
     * @param {string} props.status - статус объявления
     * @param {string} props.name - имя объявления
     * @param {string} props.stats - краткая статистика объявления
     */
    render(props) {
        super.render(props);
    }
}
