'use strict';

import '../../sign-in-up.css';

import { Form, FormProps } from '../form/form';
import { UserAPI } from '../../api/userApi';
import { loadPath } from '../..';
import { InputField } from '../input-field/input-field';

/**
 * Форма входа
 */
export class FormSignIn extends Form {
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
     * Обработчик нажатия на кнопку отправки формы
     */
    private async onSubmit(): Promise<void> {
        const email = this.props.inputs.emailInput.getValue();
        const password = this.props.inputs.passwordInput.getValue();
        const role = 1;

        const response = await UserAPI.logIn({ email, password, role });

        if (response.ok) {
            const redirectPath = history.state['signInRedirectPath'] || '/my-banners';
            loadPath(redirectPath);
        }

        if (!response.ok) {
            this.props.inputs.passwordInput.showError('Неправильный email или пароль');
        }
    }

    /**
     * Отрисовка
     */
    render(): void {
        const props: FormProps = { inputs: {}, submitLabel: 'Войти', onSubmit: this.onSubmit.bind(this), className: 'form-block' };

        super.renderRoot(props);

        const root = this.rootElement;

        props.inputs = {
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

        root.insertAdjacentHTML('beforeend', '<h1>Войти в аккаунт Рекламодателя</h1>');

        super.renderFull(props);
    }
}
