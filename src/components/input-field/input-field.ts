'use strict';

import { InputWithError, InputWithErrorProps } from '../../modules/input-with-error';

/**
 * Интерфейс для описания параметров поля ввода
 */
interface InputFieldProps extends InputWithErrorProps {
    type: 'text' | 'email' | 'password';
    name: string;
    placeholder: string;
    label?: string;
    default?: string;
    disabled?: boolean;
}

/**
 * Поле текстового ввода
 */
export class InputField extends InputWithError {
    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     * @param {InputFieldProps} props - параметры компонента
     */
    constructor(parent: HTMLElement, props: InputFieldProps) {
        super(parent, 'input-field/input-field', props);
    }

    /**
     * Отрисовка
     * @param {InputFieldProps} props - параметры компонента
     */
    render(props?: InputFieldProps): void {
        props = props || this.props as InputFieldProps;

        const disabled = props.disabled ? 'disabled' : '';
        super.render({ ...props, disabled });

        this.inputElement.value = props.default || '';
    }
}
