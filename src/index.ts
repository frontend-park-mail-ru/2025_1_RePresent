'use strict';

import './commonCSS/index.scss';

import { loadPath } from './modules/router';

loadPath(location.pathname);
