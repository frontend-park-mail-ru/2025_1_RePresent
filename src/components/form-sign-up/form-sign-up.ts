'use strict';

import { Form, FormProps } from '../form/form';
import { UserAPI } from '../../api/userApi';
import { loadPath } from '../../modules/router';
import { InputField } from '../input-field/input-field';
import { emailGetError, getPasswordRepeatGetError, organizationGetError, passwordGetError, roleGetError } from '../../modules/validation';
import { InputSelect } from '../input-select/input-select';
import { reAlert } from '../../modules/re-alert';

/**
 * Форма регистрации
 */
export class FormSignUp extends Form {
    /**
     * Обработчик нажатия на кнопку отправки формы
     */
    private async onSubmit(): Promise<void> {
        const username = this.props.inputs.organizationInput.getValue();
        const email = this.props.inputs.emailInput.getValue();
        const password = this.props.inputs.passwordInput.getValue();
        const role = this.props.inputs.roleInput.getValue() == 'advertiser' ? 1 : 2;

        const response = await UserAPI.signUp({ username, email, password, role });

        if (response.service.error) {
            const errorMessage = response.service.error;
            if (errorMessage.includes('username')) {
                this.props.inputs.organizationInput.showError(errorMessage);
            }
            if (errorMessage.includes('email')) {
                this.props.inputs.emailInput.showError(errorMessage);
            }
            return;
        }

        const redirectPath = history.state['signInRedirectPath'] || '/my-banners';
        loadPath(redirectPath);

        reAlert({
            message: 'Вы зарегистрировались',
            type: 'success',
            lifetimeS: '5',
        });
    }

    /**
     * Отрисовка
     */
    render(): void {
        const props: FormProps = { inputs: {}, submitLabel: 'Создать аккаунт', onSubmit: this.onSubmit.bind(this), className: 'form-block' };

        super.renderRoot(props);

        const root = this.rootElement;

        props.inputs = {
            organizationInput: new InputField(root, {
                type: 'text',
                name: 'organization',
                placeholder: 'Название организации',
                getError: organizationGetError,
            }),
            roleInput: new InputSelect(root, {
                name: 'role',
                options: [
                    { value: 'advertiser', label: 'Рекламодатель' },
                    { value: 'platform', label: 'Площадка' },
                ],
                placeholder: 'Выберите роль',
                getError: roleGetError,
            }),
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

        const passwordRepeatGetError = getPasswordRepeatGetError(props.inputs.passwordInput);
        props.inputs.passwordRepeatInput = new InputField(root, {
            type: 'password',
            name: 'password-repeat',
            placeholder: 'Повторите пароль',
            getError: passwordRepeatGetError,
        });

        root.insertAdjacentHTML('beforeend', '<h1>Создать аккаунт</h1>');

        super.renderFull(props);

        props.inputs.passwordInput.inputElement.addEventListener('blur', () => {
            props.inputs.passwordRepeatInput.validate();
        });
    }
}
