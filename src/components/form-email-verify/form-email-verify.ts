'use strict';

import './form-email-verify.css';

import { Form, FormProps } from '../form/form';
import { InputField } from '../input-field/input-field';

/**
 * Форма публичных данных профиля
 */
export class FormEmailVerify extends Form {
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
     * Проверка валидности кода подтверждения
     * @param {string} value - значение email
     * @returns {string} - сообщение об ошибке или пустая строка, если ошибок нет
     */
    codeGetError(value: string): string {
        const isValid = value.trim().length > 0;
        if (isValid) {
            return '';
        }
        return 'Введите код';
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
            submitLabel: 'Подтвердить',
            onSubmit: this.onSubmit.bind(this),
            className: 'form-email-verify',
        };

        super.renderRoot(props);

        const root = this.rootElement;

        props.inputs = {
            organizationInput: new InputField(root, {
                type: 'email',
                label: 'Email',
                name: 'email',
                placeholder: 'Введите email',
                getError: this.emailGetError.bind(this),
            }),
            descriptionInput: new InputField(root, {
                type: 'text',
                label: 'Код',
                name: 'verification-code',
                placeholder: 'Введите код',
                getError: this.codeGetError.bind(this),
            }),
        };

        super.renderFull(props);
    }
}
