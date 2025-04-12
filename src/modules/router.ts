'use strict';

import { PageSignUp } from '../components/page-sign-up/page-sign-up';
import { PageSignIn } from '../components/page-sign-in/page-sign-in';
import { PageMyBanners } from '../components/page-my-banners/page-my-banners';
import { PageProfile } from '../components/page-profile/page-profile';
import { Props } from '../component';
import { dispatcher } from './dispatcher';
import { ProfileAPI } from '../api/profileApi';
import { store } from './store';

const root = document.getElementById('root') as HTMLElement;

/**
 * Интерфейс для описания структуры объекта, хранящего информацию о странице
 */
interface PageInfo {
    class: new (root: HTMLElement) => { render: () => void };
    title: string;
    authRequired: boolean;
}

/**
 * @constant {Object.<string, PageInfo>} соответствие между путями URL и параметрами страниц
 */
const pathPageInfo: { [key: string]: PageInfo } = {
    '/signup': { class: PageSignUp, title: 'ReTarget - Sign up', authRequired: false },
    '/signin': { class: PageSignIn, title: 'ReTarget - Sign in', authRequired: false },
    '/my-banners': { class: PageMyBanners, title: 'ReTarget - Мои Объявления', authRequired: true },
    '/profile': { class: PageProfile, title: 'ReTarget - Мой профиль', authRequired: true },
};

/**
 * Загрузить страницу по ее пути
 * @param {string} path - путь страницы
 * @param {Props?} state - параметры страницы
 */
export function loadPath(path: string, state: Props = {}): void {
    if (!(path in pathPageInfo)) {
        // TODO: remove this and show 404 page instead
        path = '/signin';
    }

    const nextTitle = pathPageInfo[path].title;
    const nextURL = location.origin + path;
    history.pushState(state, nextTitle, nextURL);

    renderPage(path);
}

/**
 * Отрисовать страницу по ее пути
 * @param {string} path - путь страницы
 */
async function renderPage(path: string): Promise<void> {
    dispatcher.clearAll();
    store.clear();

    const pageInfo = pathPageInfo[path];

    if (pageInfo.authRequired) {
        const profile = await ProfileAPI.getMyInfo();
        if (!profile) {
            return;
        }
        store.update({ key: 'profile', value: profile });
    }

    document.title = pathPageInfo[path].title;
    const pageClass = pathPageInfo[path].class;

    root.innerHTML = '';
    const page = new pageClass(root);
    page.render();
}

/**
 * Отрисовать страницу при переходе по истории сайта
 */
window.addEventListener('popstate', () => {
    renderPage(location.pathname);
});
