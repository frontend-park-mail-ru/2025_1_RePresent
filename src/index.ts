'use strict';

import './commonCSS/index.scss';
import { startBalanceChecks } from './modules/lowBalanceAlert';

import { loadPath } from './modules/router';
import './modules/swipes';

loadPath(location.pathname);
startBalanceChecks(); 
