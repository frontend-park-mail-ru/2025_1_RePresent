'use strict';

import './input-switch.scss';

import { Input } from '../../modules/input';

/**
 * Интерфейс для описания параметров компонента
 */
interface InputSwitchProps {
    name: string;
    label: string;
    checked: boolean;
    disabled?: boolean;
}

/**
 * Переключатель
 */
export class InputSwitch extends Input {
    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     * @param {InputFieldProps} props - параметры компонента
     */
    constructor(parent: HTMLElement, props: InputSwitchProps) {
        super(parent, 'input-switch/input-switch', props);
    }

    /**
     * Состояние компонента
     * @returns {boolean} - включен ли переключатель
     */
    getValue(): boolean {
        return this.inputElement.checked;
    }

    /**
     * Отрисовка
     * @param {InputSwitchProps} props - параметры компонента
     */
    render(props?: InputSwitchProps): void {
        props = props || this.props as InputSwitchProps;

        // Преобразуем boolean в строку 'checked' или пустую строку
        const checked = props.checked ? 'checked' : '';
        // Преобразуем boolean в строку 'disabled' или пустую строку
        const disabled = props.disabled ? 'disabled' : '';

        // Передаем обновленные props в родительский метод render
        super.render({ ...props, checked, disabled });

        this.inputElement = this.rootElement.querySelector('#' + props.name) as HTMLInputElement;
    }
}
