'use strict';

import { Form } from '../form/form.js';
import { UserAPI } from '../../api/userApi.js';
import { loadPath } from '../../main.js';
import { InputField } from '../input-field/input-field.js';

/**
 * Форма входа
 */
export class FormSignIn extends Form {
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

    /**
     * Обработчик нажатия на кнопку отправки формы
     */
    async #onSubmit() {
        const email = this.props.inputs.emailInput.getValue();
        const password = this.props.inputs.passwordInput.getValue();
        const role = 1;

        const response = await UserAPI.logIn({ email: email, password: password, role: role });

        if (response.ok) {
            loadPath('/my-banners');
        } else {
            this.props.inputs.passwordInput.showError('Неправильный email или пароль');
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
            emailInput: new InputField(root, { type: 'email', name: 'email', placeholder: 'Email', getError: this.emailGetError }),
            passwordInput: new InputField(root, { type: 'password', name: 'password', placeholder: 'Пароль', getError: this.passwordGetError }),
        };

        props.submitLabel = 'Войти';
        props.onSubmit = this.#onSubmit.bind(this);

        root.insertAdjacentHTML('beforeend', '<h1>Войти в аккаунт Рекламодателя</h1>');

        super.renderFull(props);
    }
}
