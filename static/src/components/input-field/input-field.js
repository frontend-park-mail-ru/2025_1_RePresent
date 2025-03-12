'use strict';

import { Input } from '../../input.js';

/**
 * Генератор ошибок поля
 * @callback InputField~getError
 * @param {string} value - значение текстового поля
 * @returns {string} - сообщение об ошибке или пустая строка, если ошибок нет
 */

/**
 * Поле текстового ввода
 */
export class InputField extends Input {
    #errorElement;
    #prevValue = '';

    /**
     * Конструктор компонента
     * @param {Node} parent - родительский узел компонента
     */
    constructor(parent) {
        super(parent, 'input-field/input-field');
    }

    /**
     * Показать сообщение об ошибке
     * @param {string} errorMsg - сообщение об ошибке
     */
    showError(errorMsg) {
        this.#errorElement.innerText = errorMsg;
        this.rootElement.classList.add('error');
    }

    /**
     * Спрятать сообщение об ошибке
     */
    hideError() {
        this.rootElement.classList.remove('error');
    }

    /**
     * Валидировать значение поля
     * @returns {boolean} - корректно ли значение поля
     */
    validate() {
        const inputValue = this.inputElement.value.trim();
        const isValid = super.validate(inputValue);
        if (isValid) {
            this.hideError();
        }
        if (!isValid) {
            this.showError(this.props.getError(inputValue));
        }
        return isValid;
    }

    /**
     * Отрисовка
     * @param {Object} props - параметры компонента
     * @param {string} props.type - статус объявления
     * @param {string} props.name - имя объявления
     * @param {string} props.placeholder - краткая статистика объявления
     * @param {InputField~getError} getError - генератор ошибок поля
     */
    render(props) {
        if (!(['text', 'email', 'password'].includes(props.type))) {
            throw Error('Invalid type');
        }
        props.validate = props.getError ? (value) => { return props.getError(value) == ''; } : undefined;
        super.render(props);
        this.#errorElement = this.rootElement.querySelector('.error-msg');
        this.inputElement = this.rootElement.querySelector('#' + props.name);
        this.inputElement.onblur = () => {
            const inputValue = this.inputElement.value.trim();
            if (inputValue == this.#prevValue) {
                return isValid;
            }
            this.validate.bind(this)();
            this.#prevValue = inputValue;
        }
    }
}
