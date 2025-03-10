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
    #type;
    #text;
    #onClick;
    #disabled;
    #loading;

    /**
     * Инициализация параметров
     * @param {Node} parent - родитель
     * @param {string} type - тип кнопки
     * @param {string} text - текст кнопки
     * @param {clickCallback} onClick - валидатор значения поля
     */
    constructor(parent, type, text, onClick = null) {
        super(parent);
        this.#type = type;
        this.#text = text;
        this.#onClick = onClick;
        this.#disabled = false;
        this.#loading = false;
    }

    getHTML() {
        const template = Handlebars.templates['components/button/button'];
        return template({ type: this.#type, disabled: this.#disabled ? 'disabled' : '', text: this.#text });
    }

    render() {
        if (!this.parent) {
            throw new Error('Родительский элемент не существует');
        }

        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.element = this.parent.querySelector(`button.${this.#type}`);

        if (this.#onClick) {
            this.element.addEventListener('click', this.#onClick);
        }
    }

    update() {
        if (this.element) {
            this.element.disabled = this.#disabled;
            this.element.textContent = this.#loading ? 'Загрузка...' : this.#text;
        }
    }

    disable() {
        this.#disabled = true;
        this.update();
    }

    enable() {
        this.#disabled = false;
        this.update();
    }

    setLoading(loading) {
        this.#loading = loading;
        this.update();
    }
}
