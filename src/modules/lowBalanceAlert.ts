'use strict';

import { BannerAPI } from '../api/bannerApi';
import { PaymentAPI } from '../api/paymentApi';
import { Profile } from '../api/profileApi';
import { reAlert } from './re-alert';
import { store } from './store';

const LOW_BALANCE_THRESHOLD_RUB = 100;
const BALANCE_CHECK_INTERVAL_S = 5 * 60;

let balanceCheckInterval: NodeJS.Timeout;

async function checkInfo() {
    const balanceResponse = await PaymentAPI.getBalance();
    if (balanceResponse.service?.error) {
        return;
    }
    const banners = await BannerAPI.getAll();
    if (!banners) {
        return;
    }
    const hasActiveBanners = banners.some(b => b.status == 1);
    if (hasActiveBanners && balanceResponse.balance < LOW_BALANCE_THRESHOLD_RUB) {
        reAlert({
            message: 'Низкий баланс. Перейдите в профиль, чтобы пополнить его',
            type: 'error',
            lifetimeS: '30',
        });
    }
}

export function startBalanceChecks() {
    stopBalanceChecks();
    const profile = store.get<Profile>('profile');
    if (profile?.role != 1) {
        return;
    }
    balanceCheckInterval = setInterval(checkInfo, BALANCE_CHECK_INTERVAL_S * 1000);
    checkInfo();
}

export function stopBalanceChecks() {
    clearInterval(balanceCheckInterval);
}
