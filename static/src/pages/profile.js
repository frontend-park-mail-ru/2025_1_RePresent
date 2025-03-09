'use strict';

import { Component } from "../component.js";
import { loadPath } from "../main.js";
import { Button } from "../components/button.js";
import { API } from "../modules/api.js";
import { UserAPI } from "../api/userApi.js";

export class ProfilePage extends Component {
    getHTML() {
        return `
        <div class="navbar"></div>

        <div class="contents">
            <div class="main">
                <div class="button-container"></div>
            </div>
        </div>  
        `;
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

        const logoutButton = new Button(buttonContainer, 'danger', 'Выйти в окно', async () => {
            const response = await API.fetch('/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.ok) {
                const data = response.body;
                console.log(data);
                loadPath('/signin');
            } else {
                alert("Ошибка выхода");
            }
        });
        logoutButton.render();
    }
}
