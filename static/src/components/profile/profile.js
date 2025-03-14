'use strict';

import { Component } from '../../component.js';
import { loadPath } from '../../main.js';
import { Button } from '../button/button.js';
import { UserAPI } from '../../api/userApi.js';

/**
 * Страница профиля пользователя
 */
export class ProfilePage extends Component {
    getHTML() {
        const template = Handlebars.templates['components/profile/profile'];
        return template();
    }

    render() {
        UserAPI.getCurrentUser()
            .catch(err => {
                if (err.message == 'Unauthorized') {
                    loadPath('/signup');
                    return;
                }
                throw err;
            });

        this.parent.innerHTML = '';

        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const main = this.parent.querySelector('.main');
        const buttonContainer = main.querySelector('.button-container');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'center';
        buttonContainer.style.alignItems = 'center';
        buttonContainer.style.height = '100vh';

        const logoutButton = new Button(buttonContainer, 'danger', 'Выйти из аккаунта', async () => {
            const response = await UserAPI.logOut();
            if (response.ok) {
                const data = response.body;
                console.log(data);
                loadPath('/signin');
            } else {
                alert('Ошибка выхода');
            }
        });
        logoutButton.render();
    }
}
