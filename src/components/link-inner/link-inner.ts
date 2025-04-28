'use strict';

import './link-inner\.scss';

import { Component } from '../../modules/component';
import { loadPath } from '../../modules/router';

/**
 * Интерфейс для описания параметров компонента
 */
export interface LinkInnerProps {
    label: string;
    path: string;
}

/**
 * Ссылка на внутреннюю страницу
 */
export class LinkInner extends Component {
    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'link-inner/link-inner', {});
    }

    /**
     * Отрисовка
     * @param {LinkInnerProps} props - параметры компонента
     */
    render(props: LinkInnerProps): void {
        super.render(props);

        this.rootElement.onclick = (event) => {
            event.preventDefault();
            loadPath(props.path);
        };
    }
}
