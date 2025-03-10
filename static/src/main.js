'use strict';

import { SignUpPage } from './components/sign-up/sign-up.js';
import { SignInPage } from './components/sign-in/sign-in.js';
import { BannersPage } from './components/banners/banners.js';
import { ProfilePage } from './components/profile/profile.js';

const root = document.getElementById('root');

/**
 * @constant {Object.<string, Object>} соответствие между путями URL, классами компонентов и названиями страниц
 */
const pathToJSClass = {
    '/signup': { class: SignUpPage, title: 'ReTarget - Sign up' },
    '/signin': { class: SignInPage, title: 'ReTarget - Sign in' },
    '/my-banners': { class: BannersPage, title: 'ReTarget - Мои Объявления' },
    '/profile': { class: ProfilePage, tile: 'ReTarget - Мой профиль' },
};

/**
 * Загрузить страницу по ее пути
 * @param {*} path - путь страницы
 * @param  {...any} params - параметры страницы
 */
export function loadPath(path, ...params) {
    if (!(path in pathToJSClass)) {
        throw Error(`No such path: "${path}"`);
    }

    const pageClass = pathToJSClass[path].class;
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
