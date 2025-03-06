'use strict';

import { loadPath } from "../main.js";

export class SignInPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('sign-in');
    }

    getHTML() {
        return `
        <div id="sign-in" class="sign-in-up">
            <div class="container">
                <div class="form-block">
                    <h1>Войти в аккаунт Рекламодателя</h1>
                    <div class="input-field error">
                        <input type="text" name="email" id="email" placeholder="Email">
                        <p class="error-msg">Некорректный Email</p>
                    </div>
                    <div class="input-field error">
                        <input type="password" name="password" id="password" placeholder="Пароль">
                        <p class="error-msg">Не менее 8 символов</p>
                    </div>
                    <button class="primary">Войти</button>
                </div>
                <div class="offer-block">
                    <h1>Добро пожаловать!</h1>
                    <p>Впервые у нас? Создайте аккаунт!</p>
                    <button id="open-sign-up" class="subtle">Создать</button>
                </div>
            </div>
        </div>
        `;
    }

    render() {
        this.parent.innerHTML = '';

        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        document.getElementById('open-sign-up').onclick = () => {
            loadPath('/signup');
        }
    }
}
