'use strict';

import { PageSignUp } from '../components/page-sign-up/page-sign-up';
import { PageSignIn } from '../components/page-sign-in/page-sign-in';
import { PageMyBanners } from '../components/page-my-banners/page-my-banners';
import { PageMySlots } from '../components/page-my-slots/page-my-slots';
import { PageProfile } from '../components/page-profile/page-profile';
import { Props } from './component';
import { dispatcher } from './dispatcher';
import { ProfileAPI } from '../api/profileApi';
import { store } from './store';
import { PageReviews } from '../components/page-reviews/page-reviews';

const root = document.getElementById('root') as HTMLElement;

/**
 * Интерфейс для описания структуры объекта, хранящего информацию о странице
 */
interface PageInfo {
    class: new (root: HTMLElement) => { render: () => void };
    title: string;
    roleRequired: 'none' | 'authed' | 'advertiser' | 'platform';
}

/**
 * @constant {Object.<string, PageInfo>} соответствие между путями URL и параметрами страниц
 */
const pathPageInfo: { [key: string]: PageInfo } = {
    '/signup': { class: PageSignUp, title: 'ReTarget - Создать аккаунт', roleRequired: 'none' },
    '/signin': { class: PageSignIn, title: 'ReTarget - Войти в аккаунт', roleRequired: 'none' },
    '/my-banners': { class: PageMyBanners, title: 'ReTarget - Мои объявления', roleRequired: 'advertiser' },
    '/my-slots': { class: PageMySlots, title: 'ReTarget - Мои слоты', roleRequired: 'platform' },
    '/profile': { class: PageProfile, title: 'ReTarget - Мой профиль', roleRequired: 'authed' },
    '/reviews': { class: PageReviews, title: 'ReTarget - Отзывы пользователей', roleRequired: 'authed' },
};

/**
 * Загрузить страницу по ее пути
 * @param {string} path - путь страницы
 * @param {Props?} state - параметры страницы
 * @param {boolean?} replace - заменить текущую страницу в истории
 */
export async function loadPath(path: string, state: Props = {}, replace: boolean = false): Promise<void> {
    if (!(path in pathPageInfo)) {
        // TODO: remove this and show 404 page instead
        path = '/signin';
    }

    const nextTitle = pathPageInfo[path].title;
    const nextURL = location.origin + path;
    if (replace) {
        history.replaceState(state, nextTitle, nextURL);
    }
    if (!replace) {
        history.pushState(state, nextTitle, nextURL);
    }

    await renderPage(path);
}

/**
 * Отрисовать страницу по ее пути
 * @param {string} path - путь страницы
 */
async function renderPage(path: string): Promise<void> {
    dispatcher.clearAll();
    store.clear();

    const pageInfo = pathPageInfo[path];

    if (pageInfo.roleRequired != 'none') {
        const profile = await ProfileAPI.getMyInfo();
        if (!profile) {
            return;
        }
        store.update({ key: 'profile', value: profile });
        updateColorScheme(profile.role);

        if (pageInfo.roleRequired == 'advertiser' && profile.role != 1 ||
            pageInfo.roleRequired == 'platform' && profile.role != 2
        ) {
            if (profile.role == 1) {
                loadPath('/my-banners', {}, true);
            }
            if (profile.role == 2) {
                loadPath('/my-slots', {}, true);
            }
            return;
        }
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

/**
 * Обновить цветовую схему сайта
 * @param {1 | 2} role - роль пользователя
 */
function updateColorScheme(role: 1 | 2): void {
    if (role == 1) {
        root.setAttribute('style', '');
    }
    if (role == 2) {
        root.setAttribute('style', '--active-primary: var(--active-secondary); --active-primary-dark: var(--active-secondary-dark);');
    }
}
