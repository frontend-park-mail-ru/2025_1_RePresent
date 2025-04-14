'use strict';

import './page-profile\.scss';

import { Component } from '../../component';
import { FormProfilePublic } from '../form-profile-public/form-profile-public';
import { WalletOptions } from '../wallet-options/wallet-options';
import { InputField } from '../input-field/input-field';
import { Navbar } from '../navbar/navbar';
import { API } from '../../modules/api';
import { ImageUpload } from '../image-upload/image-upload';
import { Profile, ProfileAPI } from '../../api/profileApi';
import { store } from '../../modules/store';
import { Button } from '../button/button';
import { UserAPI } from '../../api/userApi';
import { loadPath } from '../../modules/router';

/**
 * Страница профиля пользователя
 */
export class PageProfile extends Component {
    private readonly DEFAULT_AVATAR = '../../static/images/default-pic.png';
    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'page-profile/page-profile', {});
    }

    /**
     * Получить URL аватара
     * @returns {string} - URL аватара
     */
    private getAvatarURL(): string {
        return `${API.API_ORIGIN}/avatar/download?nocache=${Date.now()}`;
    }

    /**
     * Обработчик загрузки аватара
     * @param {File} file - файл
     * @returns {Promise<string>} - новый src файла, или старый в случае ошибки загрузки
     */
    private async uploadAvatar(file: File): Promise<string> {
        const response = await ProfileAPI.uploadAvatar(file);
        if (response.service.error) {
            console.log(response.service.error);
        }

        return this.getAvatarURL();
    }

    /**
     * Отрисовка раздела загрузки аватара
     */
    private renderAvatarSection(): void {
        const publicSection = this.rootElement.getElementsByClassName('public-section')[0] as HTMLElement;

        new ImageUpload(publicSection).render(
            {
                imgSrc: this.getAvatarURL(),
                imgAlt: 'аватар',
                btnLabel: 'Изменить изображение',
                uploadCallback: this.uploadAvatar.bind(this),
            }
        );
        const img = publicSection.querySelector('img');
        if (img) {
            img.onerror = () => {
                img.src = this.DEFAULT_AVATAR;
            };
        }
    }

    /**
     * Обработчик нажатия на кнопку выхода из аккаунта
     */
    private async onLogOutClick(): Promise<void> {
        if (!confirm('Вы уверены, что хотите выйти?')) {
            return;
        }

        const response = await UserAPI.logOut();
        if (response.service.error) {
            return;
        }

        loadPath('/signin');
    }

    /**
     * Отрисовка страницы
     */
    public render(): void {
        super.render();

        // TODO make Page class for pages, which will render navbar
        const navbarContainer = this.rootElement.getElementsByClassName('navbar-container')[0] as HTMLElement;
        new Navbar(navbarContainer).render({ userAuthed: true, userRole: 'advertiser' });

        const publicSection = this.rootElement.getElementsByClassName('public-section')[0] as HTMLElement;

        this.renderAvatarSection();

        const formProfilePublic = new FormProfilePublic(publicSection);
        formProfilePublic.render();

        const privateSection = this.rootElement.getElementsByClassName('private-section')[0] as HTMLElement;

        const walletOptions = new WalletOptions(privateSection);
        walletOptions.render();

        privateSection.insertAdjacentHTML('beforeend', '<h1>Настройки</h1>');

        const roleNum = store.get<Profile>('profile').role;
        const roleField = new InputField(privateSection, {
            label: 'Роль',
            name: 'role',
            placeholder: 'Ваша роль',
            type: 'text',
            default: (roleNum == 1) ? 'Рекламодатель' : 'Платформа',
            disabled: true,
        });
        roleField.render();

        const logOutButton = new Button(privateSection);
        logOutButton.render({ label: 'Выйти из аккаунта', type: 'danger', onClick: this.onLogOutClick.bind(this) });
    }
}
