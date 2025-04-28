'use strict';

import './cancel-save\.scss';

import { Component } from '../../modules/component';
import { Button, ClickCallback } from '../button/button';

interface CancelSaveProps {
    hasCancel?: boolean;
    cancelLabel?: string;
    saveLabel?: string;
    onCancel: ClickCallback;
    onSave: ClickCallback;
}

/**
 * Кнопки отмены и сохранения
 */
export class CancelSave extends Component {
    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'cancel-save/cancel-save', {});
    }

    /**
     * Отрисовка
     * @param {CancelSaveProps} props - параметры компонента
     */
    render(props: CancelSaveProps): void {
        super.render();

        if (props.hasCancel) {
            const cancelLabel = props.cancelLabel || 'Отменить';
            const cancelButton = new Button(this.rootElement);
            cancelButton.render({ type: 'neutral', label: cancelLabel, onClick: props.onCancel });
        }

        const saveLabel = props.saveLabel || 'Сохранить';
        const saveButton = new Button(this.rootElement);
        saveButton.render({ type: 'primary', label: saveLabel, onClick: props.onSave });
    }
}
