'use strict';

import './../commonCSS/re-alert.scss';

interface AlertProps {
    message: string;
    type: 'success' | 'error';
    lifetimeS: '5' | '30';
}

document.body.insertAdjacentHTML('beforeend', '<div class="alerts-container"></div>');
const alertsContainer = document.body.querySelector('.alerts-container') as HTMLElement;

export function reAlert(props: AlertProps): void {
    const alert = document.createElement('p');
    alert.innerText = props.message;
    alert.classList.add('alerts-container__alert');
    alert.classList.add(`alerts-container__alert_${props.type}`);

    alert.addEventListener('click', () => alert.remove());
    setTimeout(() => alert.remove(), (+props.lifetimeS) * 1000);

    alertsContainer.insertAdjacentElement('afterbegin', alert);
}
