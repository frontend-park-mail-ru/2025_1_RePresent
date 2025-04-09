'use strict';

import { Component, Props } from './component';

/**
 * Валидатор текстового поля
 * @callback Input~ValidateCallback
 * @param {string} value - значение текстового поля
 * @returns {boolean} - корректно ли value
 */
export type ValidateCallback = (value: string) => boolean;

/**
 * Интерфейс для описания параметров элемента ввода
 */
export interface InputProps extends Props {
    validate?: ValidateCallback;
}

/**
 * Базовый класс для input элементов с поддержкой валидации
 */
export class Input extends Component {
    #validatedValue: string | null = null;
    #validateValue: ValidateCallback | undefined = undefined;

    /**
     * Элемент input, должен быть установлен в производном классе
     */
    inputElement: HTMLInputElement;

    /**
     * Отрисовка
     * @param {InputProps} props - параметры компонента
     * @param {ValidateCallback} props.validate - валидатор значения поля
     */
    render(props?: InputProps): void {
        super.render(props);
        this.#validateValue = props ? props.validate : undefined;
    }

    /**
     * Проверяет, успешна ли валидация.
     * При успехе сохраняет содержимое компонента для getValue(), иначе сохраняет null.
     * @returns {boolean} - успешна ли валидация
     */
    validate(): boolean {
        if (!this.#validateValue) {
            return true;
        }

        const isValid = this.#validateValue(this.inputElement.value);
        if (isValid) {
            this.#validatedValue = this.inputElement.value;
        } else {
            this.#validatedValue = null;
        }

        return isValid;
    }

    /**
     * Содержимое компонента или null, если валидация не пройдена.
     * @returns {string | boolean | null} - содержимое компонента
     */
    getValue(): string | boolean | null {
        if (!this.#validateValue) {
            return this.inputElement.value;
        }
        return this.#validatedValue;
    }
}
