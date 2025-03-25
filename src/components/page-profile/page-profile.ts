'use strict';

import './page-profile.css';

import { Component } from '../../component';
import { loadPath } from '../..';
import { UserAPI } from '../../api/userApi';
import { PfpOptions } from '../pfp-options/pfp-options';
import { FormProfilePublic } from '../form-profile-public/form-profile-public';
import { WalletOptions } from '../wallet-options/wallet-options';
import { InputField } from '../input-field/input-field';
import { FormEmailVerify } from '../form-email-verify/form-email-verify';
import { FormPasswordChange } from '../form-password-change/form-password-change';

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

        const publicSection = this.rootElement.getElementsByClassName('public-section')[0] as HTMLElement;

        const pfpOptions = new PfpOptions(publicSection);
        pfpOptions.render();

        const formProfilePublic = new FormProfilePublic(publicSection);
        formProfilePublic.render();

        const privateSection = this.rootElement.getElementsByClassName('private-section')[0] as HTMLElement;

        const walletOptions = new WalletOptions(privateSection);
        walletOptions.render();

        privateSection.insertAdjacentHTML('beforeend', '<h1>Настройки</h1>');

        const roleField = new InputField(privateSection, {
            label: 'Роль',
            name: 'role',
            placeholder: 'Ваша роль',
            type: 'text',
        });
        roleField.render();

        const emailOptions = new FormEmailVerify(privateSection);
        emailOptions.render();

        const formPasswordChange = new FormPasswordChange(privateSection);
        formPasswordChange.render();
    }
}
