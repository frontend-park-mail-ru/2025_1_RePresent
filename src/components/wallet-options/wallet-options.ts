'use strict';

import './wallet-options\.scss';

import { Component } from '../../component';
import { Button } from '../button/button';
import { InputSwitch } from '../input-switch/input-switch';
import { InputField } from '../input-field/input-field';

/**
 * Настройки кошелька
 */
export class WalletOptions extends Component {
    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'wallet-options/wallet-options', {});
    }

    /**
     * Обработчик нажатия на кнопку пополнения
     */
    private onReplenishClick() {
        // TODO redirect to payment page
    }

    /**
     * Отрисовка страницы
     */
    render(): void {
        super.render();

        const walletMain = this.rootElement.getElementsByClassName('wallet-main')[0] as HTMLElement;
        const replenishButton = new Button(walletMain);
        replenishButton.render({ label: 'Пополнить', type: 'primary', onClick: this.onReplenishClick.bind(this) });

        const autoReplenishSwitch = new InputSwitch(this.rootElement, {
            label: 'Автопополнение',
            name: 'auto-replenish-enabled',
            checked: false,
        });
        autoReplenishSwitch.render();

        const autoReplenishPeriod = new InputField(this.rootElement, {
            label: 'Пополнять каждый(-ую)',
            name: 'auto-replenish-enabled',
            type: 'text',
            placeholder: 'Период',
        });
        autoReplenishPeriod.render();

    }
}
