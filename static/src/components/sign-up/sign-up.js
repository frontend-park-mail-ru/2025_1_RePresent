'use strict';

import { Component } from '../../component.js';
import { loadPath } from '../../main.js';
import { Button } from '../button/button.js';
import { FormSignUp } from '../form-sign-up/form-sign-up.js';

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

    /**
     * Отрисовка
     */
    render() {
        super.render();

        const container = this.parent.querySelector('.container');
        const formBlock = new FormSignUp(container);
        formBlock.render();

        const offerBlock = this.parent.querySelector('.offer-block');
        const signInButton = new Button(offerBlock);
        signInButton.render({
            type: 'subtle', text: 'Войти', onClick: () => {
                loadPath('/signin');
            },
        });
    }
}
