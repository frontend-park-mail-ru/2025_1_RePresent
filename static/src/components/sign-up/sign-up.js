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
    get pageRoot() {
        return document.getElementById('sign-up');
    }

    getHTML() {
        const template = Handlebars.templates['components/sign-up/sign-up'];
        return template();
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
        this.parent.innerHTML = '';

        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const formBlock = this.parent.querySelector('.form-block');
        const offerBlock = this.parent.querySelector('.offer-block');

        const organizationInput = new InputField(formBlock, 'text', 'organization', 'Название организации', this.organizationGetError);
        organizationInput.render();

        const emailInput = new InputField(formBlock, 'email', 'email', 'Email', this.emailGetError);
        emailInput.render();

        const passwordInput = new InputField(formBlock, 'password', 'password', 'Пароль', this.passwordGetError);
        passwordInput.render();

        const passwordRepeatGetError = this.getPasswordRepeatGetError(passwordInput);
        const passwordRepeatInput = new InputField(formBlock, 'password', 'password-repeat', 'Повторите пароль', passwordRepeatGetError);
        passwordRepeatInput.render();

        const signUpButton = new Button(formBlock, 'primary', 'Продолжить', async () => {
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
                const data = response.body;
                console.log(data);
                loadPath('/my-banners');
            } else {
                // TODO: Обработка ошибок
                const errorMessage = await response.text();
                console.error(errorMessage);
                if (errorMessage.includes('username')) {
                    organizationInput.showError(errorMessage);
                }
                if (errorMessage.includes('email')) {
                    emailInput.showError(errorMessage);
                }
            }
        });
        signUpButton.render();

        const signInButton = new Button(offerBlock, 'subtle', 'Войти', () => {
            loadPath('/signin');
        });
        signInButton.render();
    }
}
