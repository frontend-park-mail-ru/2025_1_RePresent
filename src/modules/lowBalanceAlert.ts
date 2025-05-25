'use strict';

import { BannerAPI } from '../api/bannerApi';
import { PaymentAPI } from '../api/paymentApi';

const LOW_BALANCE_THRESHOLD_RUB = 100;
const BALANCE_CHECK_INTERVAL_S = 5 * 60;

let balanceCheckInterval: NodeJS.Timeout;

async function checkInfo() {
    const balanceResponse = await PaymentAPI.getBalance();
    if (balanceResponse.service.error) {
        return;
    }
    const banners = await BannerAPI.getAll();
    if (!banners) {
        return;
    }
    const hasActiveBanners = banners.some(b => b.status == 1);
    if (hasActiveBanners && balanceResponse.balance < LOW_BALANCE_THRESHOLD_RUB) {
        alert('Низкий баланс. Перейдите в профиль, чтобы пополнить его');
    }
}

export function startBalanceChecks() {
    stopBalanceChecks();
    balanceCheckInterval = setInterval(checkInfo, BALANCE_CHECK_INTERVAL_S * 1000);
    checkInfo();
}

export function stopBalanceChecks() {
    clearInterval(balanceCheckInterval);
}
