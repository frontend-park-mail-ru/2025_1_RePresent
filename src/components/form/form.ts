'use strict';

import '../../sign-in-up.css';

import { Component, Props } from '../../component';
import { Input } from '../../input';
import { CancelSave } from '../cancel-save/cancel-save';

/**
 * Обработчик отправки формы.
 * Вызывается с this, указывающим на объект формы,
 * когда нажата кнопка отправки и данные валидны.
 * @callback Form~submitCallback
 */
type SubmitCallback = () => void;

/**
 * Интерфейс для описания параметров компонента
 */
export interface FormProps extends Props {
    inputs: Record<string, Input>;
    submitLabel: string;
    onSubmit: SubmitCallback;
    hasCancel?: boolean;
    cancelLabel?: string;
    className: string;
}

/**
 * Базовый класс формы
 */
export class Form extends Component {
    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'form/form', {});
    }

    /**
     * Внутренний обработчик нажатия на кнопку отправки формы
     */
    private async onSubmitInner(): Promise<void> {
        const inputsArray = Object.values(this.props.inputs) as Input[];
        const inputsValid = inputsArray.map(input => input.validate()).every(isValid => isValid === true);
        if (inputsValid) {
            this.props.onSubmit();
        }
    }

    /**
     * Внутренний обработчик нажатия на кнопку отмены
     */
    protected async onCancel(): Promise<void> {
        // TODO set defaults
    }

    /**
     * Отрисовка корня.
     * Должна быть вызвана в начале render() в производном классе.
     * @param {FormProps} props - параметры компонента
     */
    renderRoot(props: FormProps): void {
        super.render(props);
    }

    /**
     * Отрисовка всей формы.
     * Должна быть вызвана в конце render() в производном классе.
     * @param {FormProps} props - параметры компонента
     */
    renderFull(props: FormProps): void {
        this.props = props;

        for (const inputKey in this.props.inputs) {
            const input = this.props.inputs[inputKey];
            if (input.parent !== this.rootElement) {
                throw new Error('Input should have form root as parent');
            }
            input.render();
        }

        const cancelSave = new CancelSave(this.rootElement);
        cancelSave.render({
            saveLabel: props.submitLabel,
            onSave: this.onSubmitInner.bind(this),
            hasCancel: props.hasCancel,
            onCancel: this.onCancel.bind(this)
        });
    }
}
