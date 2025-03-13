'use strict';

import { Component } from '../../component.js';

/**
 * Обработчик нажатия на кнопку
 * @callback Button~clickCallback
 * @param {Event} event - событие нажатия кнопки
 */

/**
 * Кнопка
 */
export class Button extends Component {
    /**
     * Конструктор компонента
     * @param {Node} parent - родительский узел компонента
     */
    constructor(parent) {
        super(parent, 'button/button');
    }

    /**
     * Отрисовка
     * @param {Object} props - параметры компонента
     * @param {string} props.type - тип кнопки
     * @param {string} props.text - текст кнопки
     * @param {string} props.disabled - отключена ли кнопка
     * @param {clickCallback} props.onClick - обработчик нажатия кнопки
     */
    render(props) {
        props.disabled = props.disabled ? 'disabled' : '';
        super.render(props);

        this.rootElement.addEventListener('click', props.onClick);
    }
}
