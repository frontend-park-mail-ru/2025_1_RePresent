'use strict';

import { Component } from '../../component.js';
import { loadPath } from '../../main.js';
import { InputField } from '../input-field/input-field.js';
import { Button } from '../button/button.js';
import { UserAPI } from '../../api/userApi.js';

/**
 * Страница входа
 */
export class SignInPage extends Component {
    /**
     * Конструктор компонента
     * @param {Node} parent - родительский узел компонента
     */
    constructor(parent) {
        super(parent, 'sign-in/sign-in');
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
        super.render();

        const formBlock = this.parent.querySelector('.form-block');
        const offerBlock = this.parent.querySelector('.offer-block');

        const emailInput = new InputField(formBlock);
        emailInput.render({ type: 'email', name: 'email', placeholder: 'Email', getError: this.emailGetError });

        const passwordInput = new InputField(formBlock);
        passwordInput.render({ type: 'password', name: 'password', placeholder: 'Пароль', getError: this.passwordGetError });

        const signInButton = new Button(formBlock);
        signInButton.render({
            type: 'primary', text: 'Войти', onClick: async () => {
                const formIsValid = [emailInput, passwordInput].map(input => input.validate()).every(isValid => isValid == true);
                if (!formIsValid) {
                    return;
                }

                const email = emailInput.getValue();
                const password = passwordInput.getValue();
                const role = 1;

                const response = await UserAPI.logIn({ email: email, password: password, role: role });

                if (response.ok) {
                    loadPath('/my-banners');
                } else {
                    passwordInput.showError('Неправильный email или пароль');
                }
            }
        });

        const signUpButton = new Button(offerBlock);
        signUpButton.render({
            type: 'subtle', text: 'Создать', onClick: () => {
                loadPath('/signup');
            }
        });
    }
}
