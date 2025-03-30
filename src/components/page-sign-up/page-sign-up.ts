'use strict';

import { Component } from '../../component';
import { loadPath } from '../..';
import { Button } from '../button/button';
import { FormSignUp } from '../form-sign-up/form-sign-up';

/**
 * Страница регистрации
 */
export class PageSignUp extends Component {
    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'page-sign-up/page-sign-up', {});
    }

    /**
     * Отрисовка страницы
     */
    render(): void {
        super.render();

        const container = this.parent.querySelector('.container') as HTMLElement;
        const formBlock = new FormSignUp(container);
        formBlock.render();

        const offerBlock = this.parent.querySelector('.offer-block') as HTMLElement;
        const signInButton = new Button(offerBlock);
        signInButton.render({
            type: 'subtle',
            label: 'Войти',
            onClick: () => {
                loadPath('/signin');
            },
        });
    }
}
