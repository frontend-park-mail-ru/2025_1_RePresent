'use strict';

import './commonCSS/index.scss';

import { CSAT } from './components/csat/csat';

const REFERRER_PAGE: Record<string, string> = {
    'https://re-target.ru/profile': 'Profile',
    'https://re-target.ru/my-banners': 'BannerEditor',
};

const root = document.getElementById('root') as HTMLElement;
const referrerNoParams = root.dataset['referrerUrl'].split('?')[0];
const page = REFERRER_PAGE[referrerNoParams];

if (page) {
    const csat = new CSAT(root);
    csat.render({ page });
}
