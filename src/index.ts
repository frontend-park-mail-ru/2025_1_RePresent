'use strict';

import './commonCSS/global.scss';

import { loadPath } from './modules/router';

loadPath(location.pathname);
