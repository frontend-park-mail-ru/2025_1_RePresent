'use strict';

import { Component } from "../component.js";
import { loadPath } from "../main.js";

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
                    <button id="open-sign-in" class="subtle">Войти</button>
                </div>
                <div class="form-block">
                    <h1>Создать аккаунт Рекламодателя</h1>
                    <div class="input-field">
                        <input type="text" name="organization" id="organization" placeholder="Название организации">
                        <p class="error-msg"></p>
                    </div>
                    <div class="input-field error">
                        <input type="text" name="email" id="email" placeholder="Email">
                        <p class="error-msg">Некорректный Email</p>
                    </div>
                    <div class="input-field error">
                        <input type="password" name="password" id="password" placeholder="Пароль">
                        <p class="error-msg">Не менее 8 символов</p>
                    </div>
                    <div class="input-field">
                        <input type="password" name="password-repeat" id="password-repeat" placeholder="Повторите пароль">
                        <p class="error-msg"></p>
                    </div>
                    <button class="primary">Продолжить</button>
                </div>
            </div>
        </div>
        `;
    }

    render() {
        this.parent.innerHTML = '';

        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        document.getElementById('open-sign-in').onclick = () => {
            loadPath('/signin');
        }
    }
}
