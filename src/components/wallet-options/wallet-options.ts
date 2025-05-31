'use strict';

import './wallet-options.scss';

import { Component } from '../../modules/component';
import { Button } from '../button/button';
import { InputField } from '../input-field/input-field';
import { topUpAmountGetError } from '../../modules/validation';
import { PaymentAPI } from '../../api/paymentApi';
import { Profile } from '../../api/profileApi';
import { store } from '../../modules/store';
import { reAlert } from '../../modules/re-alert';

/**
 * Настройки кошелька
 */
export class WalletOptions extends Component {
    private amountInput: InputField;

    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'wallet-options/wallet-options', {});
    }

    /**
     * Отрисовка текущего баланса
     */
    private async renderAmount(): Promise<void> {
        const walletBalanceElement = this.rootElement.getElementsByClassName('wallet-balance')[0] as HTMLElement;
        const response = await PaymentAPI.getBalance();
        if (response.service?.error) {
            return;
        }

        walletBalanceElement.innerHTML = `${response.balance} руб.`;
    }

    /**
     * Обработчик нажатия на кнопку пополнения
     */
    private async onTopUpClick(): Promise<void> {
        if (!this.amountInput.validate()) {
            return;
        }

        const topUpAmount = <string>this.amountInput.getValue();
        const key = crypto.randomUUID();
        const response = await PaymentAPI.topUp({
            value: topUpAmount,
            currency: 'RUB',
            return_url: `${location.origin}/profile`,
            description: 'Пополнение счета',
            idempotence_key: key,
        });

        if (!response.confirmation_url) {
            reAlert({
                message: 'Ошибка пополнения счета',
                type: 'error',
                lifetimeS: '5',
            });
            return;
        }
        location.href = response.confirmation_url;
    }

    /**
     * Обработчик нажатия на кнопку снятия
     */
    private async onWithdrawClick(): Promise<void> {
        if (!this.amountInput.validate()) {
            return;
        }

        const topUpAmount = +<string>this.amountInput.getValue();
        const response = await PaymentAPI.withdraw({
            amount: topUpAmount,
            return_url: `${location.origin}/profile`,
            description: 'Списание со счета',
        });

        if (!response.confirmation_url) {
            reAlert({
                message: 'Ошибка списания со счета',
                type: 'error',
                lifetimeS: '5',
            });
            return;
        }
        location.href = response.confirmation_url;
    }

    /**
     * Отрисовка страницы
     */
    public render(): void {
        super.render();

        const role = store.get<Profile>('profile').role;
        const walletMain = this.rootElement.getElementsByClassName('wallet-main')[0] as HTMLElement;

        if (role == 1) {
            const topUpButton = new Button(walletMain);
            topUpButton.render({ label: 'Пополнить', type: 'primary', onClick: this.onTopUpClick.bind(this) });
        }

        if (role == 2) {
            const withdrawButton = new Button(walletMain);
            withdrawButton.render({ label: 'Снять', type: 'primary', onClick: this.onWithdrawClick.bind(this) });
        }

        this.amountInput = new InputField(this.rootElement, {
            label: `Сумма ${(role == 1) ? 'пополнения' : 'снятия'}`,
            name: 'amount',
            type: 'text',
            placeholder: 'Введите сумму',
            getError: topUpAmountGetError,
        });
        this.amountInput.render();

        setTimeout(() => {
            this.renderAmount();
        }, 2000);
    }
}
