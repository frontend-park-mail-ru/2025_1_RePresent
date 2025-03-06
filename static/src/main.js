'use strict';

import { SignUpPage } from './pages/sign-up.js';
import { SignInPage } from './pages/sign-in.js';

const root = document.getElementById('root');

const pathToJSClass = {
    '/signup': { class: SignUpPage, title: 'ReTarget - Sign up' },
    '/signin': { class: SignInPage, title: 'ReTarget - Sign in' },
};

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
const startPath = window.location.pathname in pathToJSClass ? window.location.pathname : '/signup';
loadPath(startPath);
