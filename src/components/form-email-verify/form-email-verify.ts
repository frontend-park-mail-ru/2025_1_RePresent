'use strict';

import './form-email-verify.scss';

import { Form, FormProps } from '../form/form';
import { InputField } from '../input-field/input-field';
import { codeGetError, emailGetError } from '../../modules/validation';

/**
 * Форма публичных данных профиля
 */
export class FormEmailVerify extends Form {
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
                getError: emailGetError,
            }),
            descriptionInput: new InputField(root, {
                type: 'text',
                label: 'Код',
                name: 'verification-code',
                placeholder: 'Введите код',
                getError: codeGetError,
            }),
        };

        super.renderFull(props);
    }
}
