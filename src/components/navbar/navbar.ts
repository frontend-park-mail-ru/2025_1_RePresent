'use strict';

import './navbar\.scss';

import { Component } from '../../component';
import { LinkInner, LinkInnerProps } from '../link-inner/link-inner';
import { API } from '../../modules/api';
import { store } from '../../modules/store';
import { Profile } from '../../api/profileApi';
import { dispatcher } from '../../modules/dispatcher';
import { loadPath } from '../../modules/router';

/**
 * Интерфейс для описания параметров компонента
 */
interface NavbarProps {
    userAuthed: boolean;
    userRole: 'advertiser' | 'platform';
}

/**
 * Строка навигации
 */
export class Navbar extends Component {
    protected props: NavbarProps;

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
        if (!this.props.userAuthed) {
            return;
        }

        if (this.props.userRole == 'advertiser') {
            this.renderPageLinks([{ label: 'Платформы', path: '/my-banners' }, { label: 'Мои объявления', path: '/my-banners' }]);
            return;
        }

        if (this.props.userRole == 'platform') {
            this.renderPageLinks([{ label: 'Объявления', path: '/banners' }, { label: 'Интеграция', path: '/integration' }, { label: 'Мои партнеры', path: '/my-partners' }]);
        }
    }

    /**
     * Отрисовка зоны пользователя
     */
    private renderUserSection(): void {
        if (!this.props.userAuthed) {
            return;
        }

        const userSection = this.rootElement.getElementsByClassName('user-section')[0] as HTMLElement;
        const username = store.get<Profile>('profile').username;
        userSection.insertAdjacentHTML('beforeend', `<p class="username">${username}</p>`);

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
     * @param {NavbarProps?} props - параметры компонента
     */
    render(props?: NavbarProps): void {
        super.render(props);

        this.renderPagesSection();
        this.renderUserSection();
    }
}
