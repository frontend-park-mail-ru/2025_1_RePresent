'use strict';

import { Component } from '../../component';
import { loadPath } from '../..';
import { Button } from '../button/button';
import { UserAPI } from '../../api/userApi';

/**
 * Страница профиля пользователя
 */
export class PageProfile extends Component {
    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'page-profile/page-profile', {});
    }

    /**
     * Отрисовка страницы
     */
    render(): void {
        super.render();

        UserAPI.getCurrentUser()
            .catch(err => {
                if (err.message === 'Unauthorized') {
                    loadPath('/signup');
                    return;
                }
                throw err;
            });

        const main = this.parent.querySelector('.main') as HTMLElement;
        const buttonContainer = main.querySelector('.button-container') as HTMLElement;

        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'center';
        buttonContainer.style.alignItems = 'center';
        buttonContainer.style.height = '100vh';

        const logoutButton = new Button(buttonContainer);
        logoutButton.render({
            type: 'danger',
            label: 'Выйти из аккаунта',
            onClick: async () => {
                const response = await UserAPI.logOut();
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    loadPath('/signin');
                } else {
                    alert('Ошибка выхода');
                }
            },
        });
    }
}
