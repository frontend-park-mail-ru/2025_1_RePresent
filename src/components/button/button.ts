'use strict';

import './button.scss';

import { Component } from '../../modules/component';

/**
 * Обработчик нажатия на кнопку
 * @callback Button~clickCallback
 * @param {Event} event - событие нажатия кнопки
 */
export type ClickCallback = (event: Event) => void;

/**
 * Интерфейс для описания параметров компонента
 */
interface ButtonProps {
    type: 'primary' | 'neutral' | 'subtle' | 'danger';
    label: string;
    disabled?: boolean;
    onClick: ClickCallback;
}

/**
 * Кнопка
 */
export class Button extends Component {
    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'button/button', {});
    }

    /**
     * Отрисовка
     * @param {ButtonProps} props - параметры компонента
     */
    render(props: ButtonProps): void {
        // Преобразуем boolean в строку 'disabled' или пустую строку
        const disabled = props.disabled ? 'disabled' : '';

        // Передаем обновленные props в родительский метод render
        super.render({ ...props, disabled });

        // Добавляем обработчик события click
        this.rootElement.addEventListener('click', props.onClick);
    }
}
