'use strict';

import './global.scss';

import { CSAT } from './components/csat/csat';

const root = document.getElementById('root') as HTMLElement;
const csat = new CSAT(root);
console.log(location.pathname); // temp
csat.render({ page: 'Profile' }); // temp
