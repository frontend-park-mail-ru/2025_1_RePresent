'use strict';

import { Form } from '../form/form.js';
import { UserAPI } from '../../api/userApi.js';
import { InputField } from '../input-field/input-field.js';

/**
 * Форма регистрации
 */
export class FormSignUp extends Form {
    organizationGetError(value) {
        const isValid = value.trim().length >= 5;
        if (isValid) {
            return '';
        }
        if (!isValid) {
            return 'Минимум 5 символов';
        }
    }

    emailGetError(value) {
        const emailRegexp = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
        const isValid = emailRegexp.test(value);
        if (isValid) {
            return '';
        }
        if (!isValid) {
            return 'Некорректный email';
        }
    }

    passwordGetError(value) {
        const isValid = value.length >= 8 && value.match(/[a-z]+/) && value.match(/[A-Z]+/) && value.match(/[0-9]+/);
        if (isValid) {
            return '';
        }
        if (!isValid) {
            return 'Минимум 8 символов, содержит заглавные и строчные буквы и цифры';
        }
    }

    getPasswordRepeatGetError(passwordInput) {
        return (value) => {
            const password = passwordInput.getValue();
            const isValid = password == value;
            if (!password || isValid) {
                return '';
            }
            if (!isValid) {
                return 'Пароли не совпадают';
            }
        };
    }

    /**
     * Обработчик нажатия на кнопку отправки формы
     */
    async #onSubmit() {
        const username = this.props.inputs.organizationInput.getValue();
        const email = this.props.inputs.emailInput.getValue();
        const password = this.props.inputs.passwordInput.getValue();
        const role = 1;

        const response = await UserAPI.signUp({ username: username, email: email, password: password, role: role });

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
    render() {
        const props = { class: 'form-block' };

        super.renderRoot(props);

        const root = this.rootElement;

        props.inputs = {
            organizationInput: new InputField(root, { type: 'text', name: 'organization', placeholder: 'Название организации', getError: this.organizationGetError }),
            emailInput: new InputField(root, { type: 'email', name: 'email', placeholder: 'Email', getError: this.emailGetError }),
            passwordInput: new InputField(root, { type: 'password', name: 'password', placeholder: 'Пароль', getError: this.passwordGetError }),
            passwordRepeatInput: null,
        };
        const passwordRepeatGetError = this.getPasswordRepeatGetError(props.inputs.passwordInput);
        props.inputs.passwordRepeatInput = new InputField(root, { type: 'password', name: 'password-repeat', placeholder: 'Повторите пароль', getError: passwordRepeatGetError });

        props.submitLabel = 'Создать аккаунт';
        props.onSubmit = this.#onSubmit.bind(this);

        root.insertAdjacentHTML('beforeend', '<h1>Создать аккаунт Рекламодателя</h1>');

        super.renderFull(props);

        props.inputs.passwordInput.inputElement.addEventListener('blur', () => {
            props.inputs.passwordRepeatInput.validate();
        });
    }
}
