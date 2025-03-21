'use strict';

import './menu-section.css';

import { dispatcher } from '../../modules/dispatcher';
import { Component } from '../../component';
import { MenuList, MenuListProps } from '../menu-list/menu-list';
import { MenuBannerEditor } from '../menu-banner-editor/menu-banner-editor';

/**
 * Интерфейс для описания параметров компонента
 */
interface MenuSectionProps extends MenuListProps {
    bannerId: number;
}

/**
 * Список меню
 */
export class MenuSection extends Component {
    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'menu-section/menu-section', {});

        dispatcher.on('menu-select', this.onMenuSelect.bind(this));
    }

    /**
     * Обработчик выбора меню, отображающий меню
     * @param selectedName - имя выбранного меню
     */
    private onMenuSelect(selectedName: string) {
        const menuContents = this.rootElement.getElementsByClassName('menu-contents')[0] as HTMLElement;
        menuContents.innerHTML = '';

        switch (selectedName) {
            case 'editor':
                new MenuBannerEditor(menuContents).render({ bannerId: this.props.bannerId });
                break;
            default:
                break;
        }
    }

    /**
     * Отрисовка
     * @param {MenuSectionProps} props - параметры компонента
     */
    render(props: MenuSectionProps): void {
        super.render(props);

        new MenuList(this.rootElement).render(props);

        this.rootElement.insertAdjacentHTML('beforeend', '<div class="menu-contents"></div>');
    }
}
