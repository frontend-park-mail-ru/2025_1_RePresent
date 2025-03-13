'use strict';

import { Component } from '../../component.js';
import { loadPath } from '../../main.js';
import { Button } from '../button/button.js';
import { FormSignIn } from '../form-sign-in/form-sign-in.js';

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

    render() {
        super.render();

        const container = this.parent.querySelector('.container');
        const formBlock = new FormSignIn(container);
        formBlock.render();

        container.insertAdjacentHTML('beforeend', '<div class="offer-block"><h1>Добро пожаловать!</h1><p>Впервые у нас? Создайте аккаунт!</p></div>');

        const offerBlock = this.parent.querySelector('.offer-block');
        const signUpButton = new Button(offerBlock);
        signUpButton.render({
            type: 'subtle', text: 'Создать', onClick: () => {
                loadPath('/signup');
            },
        });
    }
}
