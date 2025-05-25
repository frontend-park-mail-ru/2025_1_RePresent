'use strict';

import './commonCSS/index.scss';

import { startBalanceChecks } from './modules/lowBalanceAlert';
import { loadPath } from './modules/router';
import './modules/swipes';

async function start() {
    await loadPath(location.pathname);
    startBalanceChecks();
}

start();
