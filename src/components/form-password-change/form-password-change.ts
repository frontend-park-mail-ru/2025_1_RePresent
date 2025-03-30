'use strict';

import './form-password-change.css';

import { Form, FormProps } from '../form/form';
import { InputField } from '../input-field/input-field';
import { Input } from '../../input';

/**
 * Форма изменения пароля
 */
export class FormPasswordChange extends Form {
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
    private async onSubmit(): Promise<void> {
        // TODO API call
    }

    /**
     * Отрисовка
     */
    render(): void {
        const props: FormProps = {
            inputs: {},
            hasCancel: true,
            submitLabel: 'Изменить пароль',
            onSubmit: this.onSubmit.bind(this),
            className: 'form-password-change',
        };

        super.renderRoot(props);

        const root = this.rootElement;

        props.inputs.passwordInput = new InputField(root, {
            label: 'Новый пароль',
            type: 'password',
            name: 'password',
            placeholder: 'Новый пароль',
            getError: this.passwordGetError.bind(this),
        });

        const passwordRepeatGetError = this.getPasswordRepeatGetError(props.inputs.passwordInput);
        props.inputs.passwordRepeatInput = new InputField(root, {
            label: 'Повторите пароль',
            type: 'password',
            name: 'password-repeat',
            placeholder: 'Повторите пароль',
            getError: passwordRepeatGetError,
        });

        super.renderFull(props);

        props.inputs.passwordInput.inputElement.addEventListener('blur', () => {
            props.inputs.passwordRepeatInput.validate();
        });
    }
}
