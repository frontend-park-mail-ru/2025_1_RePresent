'use strict';

import './commonCSS/index.scss';

import { loadPath } from './modules/router';
import './modules/re-alert';
import './modules/swipes';

loadPath(location.pathname);
