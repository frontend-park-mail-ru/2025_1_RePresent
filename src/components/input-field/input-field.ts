'use strict';

import './input-field.css';

import { Input, InputProps } from '../../input';

/**
 * Генератор ошибок поля
 * @callback InputField~getError
 * @param {string} value - значение текстового поля
 * @returns {string} - сообщение об ошибке или пустая строка, если ошибок нет
 */
type GetErrorCallback = (value: string) => string;

/**
 * Интерфейс для описания параметров поля ввода
 */
interface InputFieldProps extends InputProps {
    type: 'text' | 'email' | 'password';
    name: string;
    placeholder: string;
    label?: string;
    getError?: GetErrorCallback;
}

/**
 * Поле текстового ввода
 */
export class InputField extends Input {
    #errorElement: HTMLElement;
    #prevValue: string = '';

    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     * @param {InputFieldProps} props - параметры компонента
     */
    constructor(parent: HTMLElement, props: InputFieldProps) {
        super(parent, 'input-field/input-field', props);
    }

    /**
     * Показать сообщение об ошибке
     * @param {string} errorMsg - сообщение об ошибке
     */
    showError(errorMsg: string): void {
        this.#errorElement.innerText = errorMsg;
        this.rootElement.classList.add('error');
    }

    /**
     * Спрятать сообщение об ошибке
     */
    hideError(): void {
        this.rootElement.classList.remove('error');
    }

    /**
     * Валидировать значение поля
     * @returns {boolean} - корректно ли значение поля
     */
    validate(): boolean {
        const inputValue = this.inputElement.value.trim();
        const isValid = super.validate();
        if (isValid) {
            this.hideError();
        } else {
            this.showError(this.props.getError ? this.props.getError(inputValue) : '');
        }
        return isValid;
    }

    /**
     * Валидировать значение поля, если поле было редактировано
     */
    validateIfChanged(): void {
        const inputValue = this.inputElement.value.trim();
        if (inputValue === this.#prevValue) {
            return;
        }
        this.validate();
        this.#prevValue = inputValue;
    }

    /**
     * Отрисовка
     * @param {InputFieldProps} props - параметры компонента
     */
    render(props?: InputFieldProps): void {
        props = props || this.props as InputFieldProps;

        if (!['text', 'email', 'password'].includes(props.type)) {
            throw new Error('Invalid type');
        }

        props.validate = props.getError ? (value: string) => props.getError!(value) === '' : undefined;
        super.render(props);

        this.#errorElement = this.rootElement.querySelector('.error-msg') as HTMLElement;
        this.inputElement = this.rootElement.querySelector('#' + props.name) as HTMLInputElement;
        this.inputElement.onblur = this.validateIfChanged.bind(this);
    }
}
