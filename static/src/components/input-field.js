'use strict';

import { Input } from "../input.js";

export class InputField extends Input {
    #type;
    #name;
    #placeholder;

    constructor(parent, type, name, placeholder, validate) {
        super(parent, validate);
        if (!(['text', 'email', 'password'].includes(type))) {
            throw Error('Invalid type');
        }
        this.#type = type;
        this.#name = name;
        this.#placeholder = placeholder;
    }

    getHTML() { // TODO: Handlebars
        return `
        <div class="input-field">
            <input type="${this.#type}" name="${this.#name}" id="${this.#name}" placeholder="${this.#placeholder}">
            <p class="error-msg"></p>
        </div>
        `;
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.inputElement = document.querySelector(`input-field #${this.#name}`);
    }
}
