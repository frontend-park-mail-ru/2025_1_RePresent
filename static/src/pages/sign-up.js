'use strict';

import { Component } from "../component.js";
import { loadPath } from "../main.js";
import { InputField } from "../components/input-field.js";
import { Button } from "../components/button.js";

export class SignUpPage extends Component {
    get pageRoot() {
        return document.getElementById('sign-up');
    }

    getHTML() {
        return `
        <div id="sign-up" class="sign-in-up">
            <div class="container">
                <div class="offer-block">
                    <h1>С возвращением!</h1>
                    <p>Войдите в аккаунт, чтобы получить доступ к размещению</p>
                </div>
                <div class="form-block">
                    <h1>Создать аккаунт Рекламодателя</h1>
                </div>
            </div>
        </div>
        `;
    }

    render() {
        this.parent.innerHTML = '';

        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const formBlock = this.parent.querySelector('.form-block');
        const offerBlock = this.parent.querySelector('.offer-block');;

        const organizationInput = new InputField(formBlock, 'text', 'organization', 'Название организации');
        organizationInput.render();

        const emailInput = new InputField(formBlock, 'email', 'email', 'Email');
        emailInput.render();

        const passwordInput = new InputField(formBlock, 'password', 'password', 'Пароль');
        passwordInput.render();

        const passwordRepeatInput = new InputField(formBlock, 'password', 'password-repeat', 'Повторите пароль');
        passwordRepeatInput.render();

        const signUpButton = new Button(formBlock, 'primary', 'Продолжить', async () => {
            try {
                organizationInput.validate();
                emailInput.validate();
                passwordInput.validate();

                const username = organizationInput.getValue();
                const email = emailInput.getValue();
                const password = passwordInput.getValue();
                const role = 1;
        
                const response = await fetch('http://localhost:8080/auth/signup', {
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                        role,
                    }),
                });
        
                if (response.ok) {
                    const data = await response.body;
                    console.log(data);
                    loadPath('/my-banners');
                } else {
                    // TODO: Обработка ошибок
                    const errorMessage = await response.text();
                    console.error(errorMessage);
                    passwordInput.inputElement.setCustomValidity('Ошибка');
                    passwordInput.inputElement.reportValidity();
                }
            } catch (error) {
                console.error(error);
            }
        });
        signUpButton.render();

        const signInButton = new Button(offerBlock,'subtle', 'Войти', () => {
            loadPath('/signin');
        });
        signInButton.render();
    }
}