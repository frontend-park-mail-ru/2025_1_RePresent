'use strict';

import './wallet-options.scss';

import { Component } from '../../modules/component';
import { Button } from '../button/button';
import { InputField } from '../input-field/input-field';
import { topUpAmountGetError } from '../../modules/validation';
import { PaymentAPI } from '../../api/paymentApi';

/**
 * Настройки кошелька
 */
export class WalletOptions extends Component {
    private topUpAmountInput: InputField;

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
        if (!this.topUpAmountInput.validate()) {
            return;
        }

        const topUpAmount = <string>this.topUpAmountInput.getValue();
        const key = crypto.randomUUID();
        const response = await PaymentAPI.topUp({
            Value: topUpAmount,
            Currency: 'RUB',
            ReturnURL: `${location.origin}/profile`,
            Description: 'Пополнение счета',
            IdempotenceKey: key,
        });

        if (!response.confirmation_url) {
            alert('Ошибка пополнения счета');
        }
        location.href = response.confirmation_url;
    }

    /**
     * Отрисовка страницы
     */
    public render(): void {
        super.render();

        const walletMain = this.rootElement.getElementsByClassName('wallet-main')[0] as HTMLElement;
        const topUpButton = new Button(walletMain);
        topUpButton.render({ label: 'Пополнить', type: 'primary', onClick: this.onTopUpClick.bind(this) });

        this.topUpAmountInput = new InputField(this.rootElement, {
            label: 'Сумма пополнения',
            name: 'top-up-amount',
            type: 'text',
            placeholder: 'Введите сумму',
            getError: topUpAmountGetError,
        });
        this.topUpAmountInput.render();

        this.renderAmount();
    }
}
