'use strict';

import { Component } from '../../component';
import { loadPath } from '../..';
import { Button } from '../button/button';
import { FormSignIn } from '../form-sign-in/form-sign-in';

/**
 * Страница входа
 */
export class PageSignIn extends Component {
    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'page-sign-in/page-sign-in', {});
    }

    /**
     * Отрисовка страницы
     */
    render(): void {
        super.render();

        const container = this.parent.querySelector('.container') as HTMLElement;
        const formBlock = new FormSignIn(container);
        formBlock.render();

        container.insertAdjacentHTML('beforeend', '<div class="offer-block"><h1>Добро пожаловать!</h1><p>Впервые у нас? Создайте аккаунт!</p></div>');

        const offerBlock = this.parent.querySelector('.offer-block') as HTMLElement;
        const signUpButton = new Button(offerBlock);
        signUpButton.render({
            type: 'subtle',
            label: 'Создать',
            onClick: () => {
                loadPath('/signup', history.state);
            },
        });
    }
}
