'use strict';

import { Component } from '../../component.js';
import { loadPath } from '../../main.js';
import { InputField } from '../input-field/input-field.js';
import { Button } from '../button/button.js';
import { UserAPI } from '../../api/userApi.js';

export class SignInPage extends Component {
    get pageRoot() {
        return document.getElementById('sign-in');
    }

    getHTML() {
        const template = Handlebars.templates['components/sign-in/sign-in'];
        return template();
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
        const isValid = value.trim().length > 0;
        if (isValid) {
            return '';
        }
        if (!isValid) {
            return 'Введите пароль';
        }
    }

    render() {
        this.parent.innerHTML = '';

        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const formBlock = this.parent.querySelector('.form-block');
        const offerBlock = this.parent.querySelector('.offer-block');

        const emailInput = new InputField(formBlock, 'email', 'email', 'Email', this.emailGetError);
        emailInput.render();

        const passwordInput = new InputField(formBlock, 'password', 'password', 'Пароль', this.passwordGetError);
        passwordInput.render();

        const signInButton = new Button(formBlock, 'primary', 'Войти', async () => {
            const formIsValid = [emailInput, passwordInput].map(input => input.validate()).every(isValid => isValid == true);
            if (!formIsValid) {
                return;
            }

            const email = emailInput.getValue();
            const password = passwordInput.getValue();
            const role = 1;

            const response = await UserAPI.logIn({ email: email, password: password, role: role });

            if (response.ok) {
                const data = response.body;
                console.log(data);
                loadPath('/my-banners');
            } else {
                // TODO: Обработка ошибок
                const errorMessage = await response.text();
                console.error(errorMessage);
                passwordInput.showError('Неправильный email или пароль');
            }
        });
        signInButton.render();

        const signUpButton = new Button(offerBlock, 'subtle', 'Создать', () => {
            loadPath('/signup');
        });
        signUpButton.render();

    }
}
