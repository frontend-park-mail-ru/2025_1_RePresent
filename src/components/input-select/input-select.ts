'use strict';

import { InputWithError, InputWithErrorProps } from '../../modules/input-with-error';

/**
 * Параметры опции списка
 */
interface InputSelectOption {
    value: string;
    label: string;
}

/**
 * Параметры поля с выпадающим списком
 */
interface InputSelectProps extends InputWithErrorProps {
    name: string;
    options: InputSelectOption[];
    placeholder?: string;
    label?: string;
    defaultValue?: string;
    disabled?: boolean;
}

/**
 * Поле с выпадающим списком
 */
export class InputSelect extends InputWithError {
    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     * @param {InputSelectProps} props - параметры компонента
     */
    constructor(parent: HTMLElement, props: InputSelectProps) {
        super(parent, 'input-select/input-select', props);
    }

    /**
     * Обновить стиль текста текущего содержимого поля
     */
    private updateTextStyle() {
        const color = this.inputElement.value ? '--text-primary' : '--text-secondary';
        this.rootElement.querySelector('.input').setAttribute('style', `color: var(${color});`);
    }

    /**
     * Отрисовка
     * @param {InputSelectProps} props - параметры компонента
     */
    public render(props?: InputSelectProps): void {
        props = props || this.props as InputSelectProps;

        if (props.placeholder) {
            props.options.unshift({ value: '', label: props.placeholder });
        }
        const disabled = props.disabled ? 'disabled' : '';

        super.render({ ...props, disabled });
        if (props.defaultValue) {
            this.inputElement.value = props.defaultValue;
        }
        this.updateTextStyle();

        this.inputElement.onchange = this.updateTextStyle.bind(this);
    }
}
