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

        const signUpButton = new Button(formBlock, 'primary', 'Продолжить');
        signUpButton.render();

        const signInButton = new Button(offerBlock,'subtle', 'Войти', () => {
            loadPath('/signin');
        });
        signInButton.render();
    }
}