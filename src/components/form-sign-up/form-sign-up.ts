'use strict';

import '../../sign-in-up.css';

import { Form, FormProps } from '../form/form';
import { UserAPI } from '../../api/userApi';
import { loadPath } from '../..';
import { InputField } from '../input-field/input-field';
import { Input } from '../../input';

/**
 * Форма регистрации
 */
export class FormSignUp extends Form {
    /**
     * Проверка валидности названия организации
     * @param {string} value - значение названия организации
     * @returns {string} - сообщение об ошибке или пустая строка, если ошибок нет
     */
    organizationGetError(value: string): string {
        const isValid = value.trim().length >= 5;
        if (isValid) {
            return '';
        }
        return 'Минимум 5 символов';
    }

    /**
     * Проверка валидности email
     * @param {string} value - значение email
     * @returns {string} - сообщение об ошибке или пустая строка, если ошибок нет
     */
    emailGetError(value: string): string {
        const emailRegexp = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
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
    passwordGetError(value: string): string {
        const isValid =
            value.length >= 8 &&
            /[a-z]+/.test(value) &&
            /[A-Z]+/.test(value) &&
            /[0-9]+/.test(value);
        if (isValid) {
            return '';
        }
        return 'Минимум 8 символов, содержит заглавные и строчные буквы и цифры';
    }

    /**
     * Получить функцию для проверки повторного ввода пароля
     * @param {Input} passwordInput - поле ввода пароля
     * @returns {(value: string) => string} - функция для проверки повторного ввода пароля
     */
    getPasswordRepeatGetError(passwordInput: Input): (value: string) => string {
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
     * Обработчик нажатия на кнопку отправки формы
     */
    async #onSubmit(): Promise<void> {
        const username = this.props.inputs.organizationInput.getValue();
        const email = this.props.inputs.emailInput.getValue();
        const password = this.props.inputs.passwordInput.getValue();
        const role = 1;

        const response = await UserAPI.signUp({ username, email, password, role });

        if (response.ok) {
            loadPath('/my-banners');
        } else {
            const errorMessage = (await response.json())['error'];
            if (errorMessage.includes('username')) {
                this.props.inputs.organizationInput.showError(errorMessage);
            }
            if (errorMessage.includes('email')) {
                this.props.inputs.emailInput.showError(errorMessage);
            }
        }
    }

    /**
     * Отрисовка
     */
    render(): void {
        const props: FormProps = { inputs: {}, submitLabel: 'Создать аккаунт', onSubmit: this.#onSubmit.bind(this), className: 'form-block' };

        super.renderRoot(props);

        const root = this.rootElement;

        props.inputs = {
            organizationInput: new InputField(root, {
                type: 'text',
                name: 'organization',
                placeholder: 'Название организации',
                getError: this.organizationGetError.bind(this),
            }),
            emailInput: new InputField(root, {
                type: 'email',
                name: 'email',
                placeholder: 'Email',
                getError: this.emailGetError.bind(this),
            }),
            passwordInput: new InputField(root, {
                type: 'password',
                name: 'password',
                placeholder: 'Пароль',
                getError: this.passwordGetError.bind(this),
            }),
        };

        const passwordRepeatGetError = this.getPasswordRepeatGetError(props.inputs.passwordInput);
        props.inputs.passwordRepeatInput = new InputField(root, {
            type: 'password',
            name: 'password-repeat',
            placeholder: 'Повторите пароль',
            getError: passwordRepeatGetError,
        });

        root.insertAdjacentHTML('beforeend', '<h1>Создать аккаунт Рекламодателя</h1>');

        super.renderFull(props);

        props.inputs.passwordInput.inputElement.addEventListener('blur', () => {
            props.inputs.passwordRepeatInput.validate();
        });
    }
}
