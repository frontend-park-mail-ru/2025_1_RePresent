'use strict';

import './global.css';

import { PageSignUp } from './components/page-sign-up/page-sign-up';
import { PageSignIn } from './components/page-sign-in/page-sign-in';
import { PageMyBanners } from './components/page-my-banners/page-my-banners';
import { PageProfile } from './components/page-profile/page-profile';
import { Props } from './component';
import { dispatcher } from './modules/dispatcher';

const root = document.getElementById('root') as HTMLElement;

/**
 * Интерфейс для описания структуры объекта, хранящего информацию о странице
 */
interface PageInfo {
    class: new (root: HTMLElement) => { render: () => void };
    title: string;
}

/**
 * @constant {Object.<string, PageInfo>} соответствие между путями URL, классами компонентов и названиями страниц
 */
const pathToJSClass: { [key: string]: PageInfo } = {
    '/signup': { class: PageSignUp, title: 'ReTarget - Sign up' },
    '/signin': { class: PageSignIn, title: 'ReTarget - Sign in' },
    '/my-banners': { class: PageMyBanners, title: 'ReTarget - Мои Объявления' },
    '/profile': { class: PageProfile, title: 'ReTarget - Мой профиль' },
};

/**
 * Загрузить страницу по ее пути
 * @param {string} path - путь страницы
 * @param {Props?} state - параметры страницы
 */
export function loadPath(path: string, state: Props = {}): void {
    if (!(path in pathToJSClass)) {
        throw Error(`No such path: "${path}"`);
    }

    dispatcher.clearAll();

    const pageClass = pathToJSClass[path].class;
    root.innerHTML = '';
    const page = new pageClass(root);
    page.render();

    const nextTitle = pathToJSClass[path].title;
    const nextURL = window.location.origin + path;
    history.pushState(state, nextTitle, nextURL);
    document.title = nextTitle;
}

// TODO: remove this and show 404 page instead
const startPath = window.location.pathname in pathToJSClass ? window.location.pathname : '/signin';
loadPath(startPath);
