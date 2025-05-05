'use strict';

import './menu-list-item.scss';

import { dispatcher } from '../../modules/dispatcher';
import { Component, Props } from '../../modules/component';

/**
 * Интерфейс для описания параметров компонента
 */
export interface MenuListItemProps extends Props {
    label: string;
    menuName: string;
    selected?: boolean;
}

/**
 * Элемент списка меню
 */
export class MenuListItem extends Component {
    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'menu-list-item/menu-list-item', {});
    }

    /**
     * Обработчик нажатия на компонентт
     */
    private onClick() {
        if (this.props.selected) {
            return;
        }
        dispatcher.dispatch('menu-select', this.props.menuName);
    }

    /**
     * Отрисовка
     * @param {MenuListItemProps} props - параметры компонента
     */
    render(props: MenuListItemProps): void {
        // Преобразуем boolean в строку 'selected' или пустую строку
        const selected = props.selected ? 'selected' : '';

        super.render({ ...props, selected });

        // Добавляем обработчик события click
        this.rootElement.addEventListener('click', this.onClick.bind(this));
    }
}
