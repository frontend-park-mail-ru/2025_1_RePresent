'use strict';

import { Component } from '../../component.js';

export class Button extends Component {
    #type;
    #text;
    #onClick;
    #disabled;
    #loading;

    constructor(parent, type, text, onClick = null) {
        super(parent);
        this.#type = type;
        this.#text = text;
        this.#onClick = onClick;
        this.#disabled = false;
        this.#loading = false;
    }

    getHTML() {
        const template = Handlebars.templates['components/button/button'];
        return template({ type: this.#type, disabled: this.#disabled ? 'disabled' : '', text: this.#text });
    }

    render() {
        if (!this.parent) {
            throw new Error('Родительский элемент не существует');
        }

        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.element = this.parent.querySelector(`button.${this.#type}`);

        if (this.#onClick) {
            this.element.addEventListener('click', this.#onClick);
        }
    }

    update() {
        if (this.element) {
            this.element.disabled = this.#disabled;
            this.element.textContent = this.#loading ? 'Загрузка...' : this.#text;
        }
    }

    disable() {
        this.#disabled = true;
        this.update();
    }

    enable() {
        this.#disabled = false;
        this.update();
    }

    setLoading(loading) {
        this.#loading = loading;
        this.update();
    }
}
