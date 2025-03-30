'use strict';

import './global.css';

import { PageSignUp } from './components/page-sign-up/page-sign-up';
import { PageSignIn } from './components/page-sign-in/page-sign-in';
import { PageMyBanners } from './components/page-my-banners/page-my-banners';
import { PageProfile } from './components/page-profile/page-profile';

const root = document.getElementById('root') as HTMLElement;

/**
 * Интерфейс для описания структуры объекта, хранящего информацию о странице
 */
interface PageInfo {
    class: new (root: HTMLElement) => { render: (...params: any[]) => void };
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
 * @param {...any} params - параметры страницы
 */
export function loadPath(path: string, ...params: any[]): void {
    if (!(path in pathToJSClass)) {
        throw Error(`No such path: "${path}"`);
    }

    const pageClass = pathToJSClass[path].class;
    root.innerHTML = '';
    const page = new pageClass(root);
    page.render(...params);

    const nextTitle = pathToJSClass[path].title;
    const nextURL = window.location.origin + path;
    window.history.replaceState({}, nextTitle, nextURL);
    document.title = nextTitle;
}

// TODO: remove this and show 404 page instead
const startPath = window.location.pathname in pathToJSClass ? window.location.pathname : '/signin';
loadPath(startPath);
