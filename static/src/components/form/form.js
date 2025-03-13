'use strict';

import { Component } from '../../component.js';
import { Input } from '../../input.js';
import { Button } from '../button/button.js';

/**
 * Обработчик отправки формы.
 * Вызывается с this, указывающим на объект формы,
 * когда нажата кнопка отправки и данные валидны.
 * @callback Form~submitCallback
 */

/**
 * Базовый класс формы
 */
export class Form extends Component {
    /**
     * Конструктор компонента
     * @param {Node} parent - родительский узел компонента
     */
    constructor(parent) {
        super(parent, 'form/form');
    }

    /**
     * Внутренний обработчик нажатия на кнопку отправки формы
     */
    #onSubmit() {
        const inputsArray = Object.values(this.props.inputs);
        const inputsValid = inputsArray.map(input => input.validate()).every(isValid => isValid == true);
        if (inputsValid) {
            this.props.onSubmit();
        }
    }

    /**
     * Отрисовка корня.
     * Должна быть вызвана в начале render() в производном классе.
     * @param {Object} props - параметры компонента
     * @param {string} props.class - класс корня формы
     */
    renderRoot(props) {
        super.render(props);
    }

    /**
     * Отрисовка всей формы.
     * Должна быть вызвана в конце render() в производном классе.
     * @param {Object} props - параметры компонента
     * @param {Object.<string, Input>} props.inputs - объект с именованными элементами формы, у которых установлен props
     * @param {string} props.submitLabel - текст кнопки отправки формы
     * @param {submitCallback} props.onSubmit - обработчик отправки формы
     */
    renderFull(props) {
        this.props = props;

        for (const inputKey in this.props.inputs) {
            const input = this.props.inputs[inputKey];
            if (!(input instanceof Input)) {
                throw new Error('Input should be an instance of class Input');
            }
            if (input.parent != this.rootElement) {
                throw new Error('Input should have form root as parent');
            }
            input.render();
        }

        const submitButton = new Button(this.rootElement);
        submitButton.render({ type: 'primary', text: this.props.submitLabel, onClick: this.#onSubmit.bind(this) });
    }
}
