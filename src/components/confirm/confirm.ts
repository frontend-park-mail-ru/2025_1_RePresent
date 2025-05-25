'use strict';

import './confirm.scss';

import { Component } from '../../modules/component';

export interface ConfirmProps {
    message: string;
    confirmText?: string;
    cancelText?: string;
    confirmType: 'primary' | 'danger';
}

export class Confirm extends Component {
    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'confirm/confirm', {});
    }

    private resolvePromise!: (value: boolean) => void;

    public async confirm(): Promise<boolean> {
        const promise = new Promise((resolve: (value: boolean) => void): void => {
            this.resolvePromise = resolve;
        });
        promise.then(this.onResolve.bind(this));
        return await promise;
    }

    private onConfirm(): void {
        this.resolvePromise(true);
    }

    private onCancel(): void {
        this.resolvePromise(false);
    }

    private onResolve(): void {
        this.rootElement.remove();
    }

    public render(props: ConfirmProps): void {
        if (!props.confirmText) {
            props.confirmText = 'OK';
        }
        if (!props.cancelText) {
            props.cancelText = 'Отмена';
        }

        super.render(props);

        const cancelButton = this.rootElement.querySelector('.confirm__button_cancel') as HTMLElement;
        const confirmButton = this.rootElement.querySelector('.confirm__button_confirm') as HTMLElement;
        cancelButton.onclick = this.onCancel.bind(this);
        confirmButton.onclick = this.onConfirm.bind(this);
    }
}
