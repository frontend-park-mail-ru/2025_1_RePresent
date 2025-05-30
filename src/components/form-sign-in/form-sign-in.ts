'use strict';

import { Form, FormProps } from '../form/form';
import { UserAPI } from '../../api/userApi';
import { loadPath } from '../../modules/router';
import { InputField } from '../input-field/input-field';
import { emailGetError, passwordGetError } from '../../modules/validation';
import { startBalanceChecks } from '../../modules/lowBalanceAlert';
import { reAlert } from '../../modules/re-alert';

/**
 * Форма входа
 */
export class FormSignIn extends Form {
    /**
     * Обработчик нажатия на кнопку отправки формы
     */
    private async onSubmit(): Promise<void> {
        const email = this.props.inputs.emailInput.getValue();
        const password = this.props.inputs.passwordInput.getValue();
        const role = 1;

        const response = await UserAPI.logIn({ email, password, role });

        if (response.service.error) {
            this.props.inputs.passwordInput.showError('Неправильный email или пароль');
            return;
        }

        const redirectPath = history.state['signInRedirectPath'] || '/my-banners';
        loadPath(redirectPath);

        reAlert({
            message: 'Вы вошли',
            type: 'success',
            lifetimeS: '5',
        });

        startBalanceChecks();
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
                getError: emailGetError,
            }),
            passwordInput: new InputField(root, {
                type: 'password',
                name: 'password',
                placeholder: 'Пароль',
                getError: passwordGetError,
            }),
        };

        root.insertAdjacentHTML('beforeend', '<h1>Войти в аккаунт</h1>');

        super.renderFull(props);
    }
}
