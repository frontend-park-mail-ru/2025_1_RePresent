'use strict';

import './commonCSS/index.scss';

import { loadPath } from './modules/router';
import './modules/swipes';

loadPath(location.pathname);
