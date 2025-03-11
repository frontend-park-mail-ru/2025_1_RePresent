'use strict';

import { Component } from './component.js';

/**
 * Валидатор текстового поля
 * @callback Input~validateCallback
 * @param {string} value - значение текстового поля
 * @returns {boolean} - корректно ли value
 */

/**
 * Базовый класс для input элементов с поддержкой валидации
 */
export class Input extends Component {
    #validatedValue = null;
    #validateValue;

    /**
     * Элемент input, должен быть установлен в производном классе
     */
    inputElement;

    /**
     * Отрисовка
     * @param {Node} parent - родитель
     * @param {Input~validateCallback} validate - валидатор значения поля
     */
    render(props) {
        super.render(props);
        this.#validateValue = props.validate;
    }

    /**
     * Проверяет, успешна ли валидация.
     * При успехе сохраняет содержимое компонента для getValue(), иначе сохраняет null.
     * @returns {boolean} - успешна ли валидация
     */
    validate() {
        if (!this.#validateValue) {
            return true;
        }
        const isValid = this.#validateValue(this.inputElement.value);
        if (isValid) {
            this.#validatedValue = this.inputElement.value;
        }
        if (!isValid) {
            this.#validatedValue = null;
        }
        return isValid;
    }

    /**
     * Содержимое компонента или null, если валидация не пройдена.
     * @returns {?any} - содержимое компонента
     */
    getValue() {
        if (!this.#validateValue) {
            return this.inputElement.value;
        }
        return this.#validatedValue;
    }
}
