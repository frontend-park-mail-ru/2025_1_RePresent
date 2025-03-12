'use strict';

import { Component } from '../../component.js';
import { loadPath } from '../../main.js';
import { InputField } from '../input-field/input-field.js';
import { Button } from '../button/button.js';
import { UserAPI } from '../../api/userApi.js';

/**
 * Страница регистрации
 */
export class SignUpPage extends Component {
    /**
     * Конструктор компонента
     * @param {Node} parent - родительский узел компонента
     */
    constructor(parent) {
        super(parent, 'sign-up/sign-up');
    }

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
            const isValid = passwordInput.getValue() == value;
            if (isValid) {
                return '';
            }
            if (!isValid) {
                return 'Пароли не совпадают';
            }
        };
    }

    render() {
        super.render();

        const formBlock = this.parent.querySelector('.form-block');

        const organizationInput = new InputField(formBlock);
        organizationInput.render({ type: 'text', name: 'organization', placeholder: 'Название организации', getError: this.organizationGetError });

        const emailInput = new InputField(formBlock);
        emailInput.render({ type: 'email', name: 'email', placeholder: 'Email', getError: this.emailGetError });

        const passwordInput = new InputField(formBlock);
        passwordInput.render({ type: 'password', name: 'password', placeholder: 'Пароль', getError: this.passwordGetError });

        const passwordRepeatGetError = this.getPasswordRepeatGetError(passwordInput);
        const passwordRepeatInput = new InputField(formBlock);
        passwordRepeatInput.render({ type: 'password', name: 'password-repeat', placeholder: 'Повторите пароль', getError: passwordRepeatGetError });

        passwordInput.inputElement.addEventListener('blur', () => {
            passwordRepeatInput.validate();
        });

        const signUpButton = new Button(formBlock);
        signUpButton.render({
            type: 'primary', text: 'Продолжить', onClick: async () => {
                const formIsValid = [organizationInput, emailInput, passwordInput, passwordRepeatInput].map(input => input.validate()).every(isValid => isValid == true);
                if (!formIsValid) {
                    return;
                }

                const username = organizationInput.getValue();
                const email = emailInput.getValue();
                const password = passwordInput.getValue();
                const role = 1;

                const response = await UserAPI.signUp({ username: username, email: email, password: password, role: role });

                if (response.ok) {
                    loadPath('/my-banners');
                } else {
                    const errorMessage = (await response.json())['error'];
                    if (errorMessage.includes('username')) {
                        organizationInput.showError(errorMessage);
                    }
                    if (errorMessage.includes('email')) {
                        emailInput.showError(errorMessage);
                    }
                }
            }
        });

        const offerBlock = this.parent.querySelector('.offer-block');
        const signInButton = new Button(offerBlock);
        signInButton.render({
            type: 'subtle', text: 'Войти', onClick: () => {
                loadPath('/signin');
            }
        });
    }
}
