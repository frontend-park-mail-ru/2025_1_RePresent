'use strict';

import './navbar.scss';

import { Component } from '../../modules/component';
import { LinkInner, LinkInnerProps } from '../link-inner/link-inner';
import { API } from '../../modules/api';
import { store } from '../../modules/store';
import { Profile } from '../../api/profileApi';
import { dispatcher } from '../../modules/dispatcher';
import { loadPath } from '../../modules/router';

/**
 * Строка навигации
 */
export class Navbar extends Component {
    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'navbar/navbar', {});

        dispatcher.on('store-updated-profile', () => {
            this.render();
        });
        dispatcher.on('avatar-updated', () => {
            this.render();
        });
    }

    /**
     * Отрисовка ссылок строки навигации
     * @param links - список ссылок
     */
    private renderPageLinks(links: LinkInnerProps[]): void {
        const pagesList = this.rootElement.getElementsByClassName('pages-list')[0] as HTMLElement;
        for (let link of links) {
            new LinkInner(pagesList).render(link);
        }
    }

    /**
     * Отрисовка зоны страниц
     */
    private renderPagesSection(): void {
        const profile = store.get<Profile>('profile');

        if (!profile) {
            return;
        }

        if (profile.role == 1) {
            this.renderPageLinks([{ label: 'Мои объявления', path: '/my-banners' }]);
        }

        if (profile.role == 2) {
            this.renderPageLinks([{ label: 'Мои слоты', path: '/my-slots' }]);
        }
    }

    /**
     * Отрисовка зоны пользователя
     */
    private renderUserSection(): void {
        const profile = store.get<Profile>('profile');

        if (!profile) {
            return;
        }

        const userSection = this.rootElement.getElementsByClassName('user-section')[0] as HTMLElement;
        userSection.insertAdjacentHTML('beforeend', `<p class="username">${profile.username}</p>`);

        const pfpImage = this.rootElement.getElementsByClassName('pfp-image')[0] as HTMLImageElement;
        pfpImage.src = `${API.API_ORIGIN}/avatar/download?nocache=${Date.now()}`;
        pfpImage.onerror = () => {
            pfpImage.onerror = null;
            pfpImage.src = API.PLACEHOLDER_IMAGE_PATH;
        };

        const profileLink = this.rootElement.getElementsByClassName('profile-link')[0] as HTMLLinkElement;
        profileLink.onclick = (event) => {
            event.preventDefault();
            loadPath('/profile');
        };
    }

    /**
     * Отрисовка
     */
    public render(): void {
        const userAuthed = store.get<boolean>('profile');
        super.render({ userAuthed });

        this.renderPagesSection();
        this.renderUserSection();
    }
}
