'use strict';

import './form-password-change\.scss';

import { Form, FormProps } from '../form/form';
import { InputField } from '../input-field/input-field';
import { getPasswordRepeatGetError, passwordGetError } from '../../modules/validation';

/**
 * Форма изменения пароля
 */
export class FormPasswordChange extends Form {
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
            getError: passwordGetError,
        });

        const passwordRepeatGetError = getPasswordRepeatGetError(props.inputs.passwordInput);
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
