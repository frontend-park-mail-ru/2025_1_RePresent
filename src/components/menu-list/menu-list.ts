'use strict';

import './menu-list\.scss';

import { dispatcher } from '../../modules/dispatcher';
import { Component, Props } from '../../modules/component';
import { MenuListItem, MenuListItemProps } from '../menu-list-item/menu-list-item';

/**
 * Интерфейс для описания параметров компонента
 */
export interface MenuListProps extends Props {
    items: MenuListItemProps[];
}

/**
 * Список меню
 */
export class MenuList extends Component {
    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'menu-list/menu-list', {});

        dispatcher.on('menu-select', this.onMenuSelect.bind(this));
    }

    /**
     * Обработчик выбора меню
     * @param selectedName - имя выбранного меню
     */
    private onMenuSelect(selectedName: string) {
        let props = this.props as MenuListProps;
        props.items.forEach((_, i, arr) => {
            arr[i].selected = arr[i].menuName == selectedName;
        });

        this.render(props);
    }

    /**
     * Отрисовка
     * @param {MenuListProps} props - параметры компонента
     */
    render(props: MenuListProps): void {
        super.render(props);

        props.items.forEach(item => {
            new MenuListItem(this.rootElement).render(item);
        });
    }
}
