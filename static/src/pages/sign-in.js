'use strict';

import { Component } from "../component.js";
import { loadPath } from "../main.js";
import { InputField } from "../components/input-field.js";
import { Button } from "../components/button.js";

export class SignInPage extends Component {
    get pageRoot() {
        return document.getElementById('sign-in');
    }

    getHTML() {
        return `
        <div id="sign-in" class="sign-in-up">
            <div class="container">
                <div class="form-block">
                    <h1>Войти в аккаунт Рекламодателя</h1>
                </div>
                <div class="offer-block">
                    <h1>Добро пожаловать!</h1>
                    <p>Впервые у нас? Создайте аккаунт!</p>
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

        const emailInput = new InputField(formBlock, 'email', 'email', 'Email');
        emailInput.render();

        const passwordInput = new InputField(formBlock, 'password', 'password', 'Пароль');
        passwordInput.render();

        const signInButton = new Button(formBlock, 'primary', 'Войти');
        signInButton.render();

        const signUpButton = new Button(offerBlock,'subtle', 'Создать', () => {
            loadPath('/signup');
        });
        signUpButton.render();
    }
}