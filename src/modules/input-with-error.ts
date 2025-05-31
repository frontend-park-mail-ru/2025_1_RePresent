'use strict';

import { Input, InputProps } from './input';

/**
 * Генератор ошибок поля
 * @callback InputWithError~getError
 * @param {string} value - значение поля
 * @param {(value: string) => void} setValue - функция установки значения поля
 * @returns {string} - сообщение об ошибке или пустая строка, если ошибок нет
 */
type GetErrorCallback = (value: string, setValue: (value: string) => void) => string;

/**
 * Интерфейс для описания параметров компонента
 */
export interface InputWithErrorProps extends InputProps {
    getError?: GetErrorCallback;
}

/**
 * input компонент с отображением ошибок
 */
export class InputWithError extends Input {
    private errorElement: HTMLElement;
    private prevValue: string = '';

    /**
     * Показать сообщение об ошибке
     * @param {string} errorMsg - сообщение об ошибке
     */
    showError(errorMsg: string): void {
        this.errorElement.innerText = errorMsg;
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
            this.showError(this.props.getError(inputValue, this.setValue.bind(this)));
        }
        return isValid;
    }

    /**
     * Валидировать значение поля, если поле было редактировано
     */
    validateIfChanged(): void {
        const inputValue = this.inputElement.value.trim();
        if (inputValue === this.prevValue) {
            return;
        }
        this.validate();
        this.prevValue = inputValue;
    }

    /**
     * Установить значение поля
     * @param {string} value - значение поля
     */
    private setValue(value: string): void {
        this.inputElement.value = value;
    }

    /**
     * Отрисовка
     * @param {InputWithErrorProps} props - параметры компонента
     */
    render(props?: InputWithErrorProps): void {
        props = props || this.props as InputWithErrorProps;

        props.validate = props.getError ? (value: string) => props.getError!(value, this.setValue.bind(this)) === '' : undefined;
        super.render(props);

        this.errorElement = this.rootElement.querySelector('.error-msg') as HTMLElement;
        this.inputElement = this.rootElement.querySelector('#' + props.name) as HTMLInputElement;
        this.inputElement.oninput = this.validateIfChanged.bind(this);
    }
}
