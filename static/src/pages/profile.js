'use strict';

import { Component } from "../component.js";
import { loadPath, isUserAuthed } from "../main.js";
import { Button } from "../components/button.js";

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
        isUserAuthed().then(isAuthed => {
            if (!isAuthed) {
                loadPath('/signin');
                return;
            }
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
            try {        
                const response = await fetch('http://localhost:8080/auth/logout', {
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (response.ok) {
                    const data = await response.body;
                    console.log(data);
                    loadPath('/signin');
                } else {
                    alert("Ошибка выхода");
                }
            } catch (error) {
                console.error(error);
            }
        });
        logoutButton.render();
    }
}
