'use strict';

import { Input } from '../input';

/**
 * Проверка валидности email
 * @param {string} value - значение email
 * @returns {string} - сообщение об ошибке или пустая строка, если ошибок нет
 */
export function emailGetError(value: string): string {
    const emailRegexp = /^[^@]+@[^@]+\.[^@]+$/;
    const isValid = emailRegexp.test(value);
    if (isValid) {
        return '';
    }
    return 'Некорректный email';
}

/**
 * Проверка валидности пароля
 * @param {string} value - значение пароля
 * @returns {string} - сообщение об ошибке или пустая строка, если ошибок нет
 */
export function passwordGetError(value: string): string {
    const isValid =
        value.length >= 8 &&
        /[a-z]+/.test(value) &&
        /[A-Z]+/.test(value) &&
        /[0-9]+/.test(value);
    if (isValid) {
        return '';
    }
    return 'Минимум 8 символов, содержит заглавные, строчные буквы и цифры';
}

/**
 * Получить функцию для проверки повторного ввода пароля
 * @param {Input} passwordInput - поле ввода пароля
 * @returns {(value: string) => string} - функция для проверки повторного ввода пароля
 */
export function getPasswordRepeatGetError(passwordInput: Input): (value: string) => string {
    return (value: string) => {
        const password = passwordInput.getValue();
        const isValid = password === value;
        if (!password || isValid) {
            return '';
        }
        return 'Пароли не совпадают';
    };
}

/**
 * Проверка валидности названия организации
 * @param {string} value - значение названия организации
 * @returns {string} - сообщение об ошибке или пустая строка, если ошибок нет
 */
export function organizationGetError(value: string): string {
    const isValid = value.trim().length >= 5;
    if (isValid) {
        return '';
    }
    return 'Минимум 5 символов';
}

/**
 * Проверка валидности кода подтверждения
 * @param {string} value - значение email
 * @returns {string} - сообщение об ошибке или пустая строка, если ошибок нет
 */
export function codeGetError(value: string): string {
    const isValid = value.trim().length > 0;
    if (isValid) {
        return '';
    }
    return 'Введите код';
}
