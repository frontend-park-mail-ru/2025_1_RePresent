'use strict';

import './pfp-options.css';

import { Component } from '../../component';
import { Button } from '../button/button';

/**
 * Кнопки отмены и сохранения
 */
export class PfpOptions extends Component {
    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'pfp-options/pfp-options', {});
    }

    /**
     * Отрисовка
     */
    render(): void {
        super.render();

        const changePfpButton = new Button(this.rootElement);
        // TODO make file input
        changePfpButton.render({ label: 'Изменить изображение', type: 'neutral', onClick: null });
    }
}
