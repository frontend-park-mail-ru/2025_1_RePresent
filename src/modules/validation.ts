'use strict';

import { Input } from './input';

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
    const minLength = 5, maxLength = 30;
    const isValid = value.length >= minLength && value.length <= maxLength;
    if (isValid) {
        return '';
    }
    return `От ${minLength} до ${maxLength} символов`;
}

/**
 * Проверка валидности описания организации
 * @param {string} value - значение описания организации
 * @returns {string} - сообщение об ошибке или пустая строка, если ошибок нет
 */
export function orgDescriptionGetError(value: string): string {
    const maxLength = 200;
    const isValid = value.length <= maxLength;
    if (isValid) {
        return '';
    }
    return `До ${maxLength} символов`;
}

/**
 * Проверка валидности кода подтверждения
 * @param {string} value - значение email
 * @returns {string} - сообщение об ошибке или пустая строка, если ошибок нет
 */
export function codeGetError(value: string): string {
    const isValid = value.length > 0;
    if (isValid) {
        return '';
    }
    return 'Введите код';
}

/**
 * Минимальная и максимальная суммы пополнения баланса
 */
export const topUpAmountMinRub = 100;
export const topUpAmountMaxRub = 100_000;

/**
 * Проверка валидности суммы пополнения баланса
 * @param {string} value - значение суммы пополнения
 * @returns {string} - сообщение об ошибке или пустая строка, если ошибок нет
 */
export function topUpAmountGetError(value: string): string {
    const amount = Number(value);
    const isValid = /^\d+$/.test(value)
        && amount >= topUpAmountMinRub
        && amount <= topUpAmountMaxRub;
    if (isValid) {
        return '';
    }
    return `Целое число, от ${topUpAmountMinRub} до ${topUpAmountMaxRub} руб.`;
}

/**
 * Минимальная и максимальная суммы показа объявления
 */
export const perShowMinRub = 0.01;
export const perShowMaxRub = 1;

/**
 * Проверка валидности суммы показа объявления
 * @param {string} value - значение суммы показа
 * @returns {string} - сообщение об ошибке или пустая строка, если ошибок нет
 */
export function perShowGetError(value: string): string {
    const amount = Number(value);
    const isValid = amount >= perShowMinRub && amount <= perShowMaxRub;
    if (isValid) {
        return '';
    }
    return `От ${perShowMinRub} до ${perShowMaxRub} руб.`;
}

/**
 * Проверка валидности названия объявления
 * @param {string} value - значение названия объявления
 * @returns {string} - сообщение об ошибке или пустая строка, если ошибок нет
 */
export function bannerTitleGetError(value: string): string {
    const minLength = 3, maxLength = 30;
    const isValid = value.length >= minLength && value.length <= maxLength;
    if (isValid) {
        return '';
    }
    return `От ${minLength} до ${maxLength} символов`;
}

/**
 * Регулярное выражение для проверки на URL
 */
const URLregex = /^(https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

/**
 * Проверка валидности ссылки объявления
 * @param {string} value - значение ссылки объявления
 * @returns {string} - сообщение об ошибке или пустая строка, если ошибок нет
 */
export function bannerLinkGetError(value: string): string {
    const maxLength = 100;
    if (!URLregex.test(value)) {
        return 'Неверный URL';
    }
    if (value.length > maxLength) {
        return `До ${maxLength} символов`;
    }
    return '';
}

/**
 * Проверка валидности описания объявления
 * @param {string} value - значение описания объявления
 * @returns {string} - сообщение об ошибке или пустая строка, если ошибок нет
 */
export function bannerDescriptionGetError(value: string): string {
    const maxLength = 100;
    const isValid = value.length <= maxLength;
    if (isValid) {
        return '';
    }
    return `До ${maxLength} символов`;
}

/**
 * Проверка валидности комментария CSAT
 * @param {string} value - значение комментария CSAT
 * @returns {string} - сообщение об ошибке или пустая строка, если ошибок нет
 */
export function csatCommentGetError(value: string): string {
    const maxLength = 200;
    const isValid = value.length <= maxLength;
    if (isValid) {
        return '';
    }
    return `До ${maxLength} символов`;
}

/**
 * Проверка валидности выбранной роли
 * @param {string} value - значение роли
 * @returns {string} - сообщение об ошибке или пустая строка, если ошибок нет
 */
export function roleGetError(value: string): string {
    const isValid = value.length > 0;
    if (isValid) {
        return '';
    }
    return 'Выберите роль';
}

/**
 * Поддерживаемые типы изображений
 */
export const ACCEPT_IMAGE = 'image/jpeg, image/png, image/gif';
