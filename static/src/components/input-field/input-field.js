'use strict';

import { Input } from '../../input.js';

export class InputField extends Input {
    #type;
    #name;
    #placeholder;
    #rootElement;
    #errorElement;
    #getError;

    constructor(parent, type, name, placeholder, getError) {
        const validate = getError ? (value) => { return getError(value) == ''; } : undefined;
        super(parent, validate);
        if (!(['text', 'email', 'password'].includes(type))) {
            throw Error('Invalid type');
        }
        this.#type = type;
        this.#name = name;
        this.#placeholder = placeholder;
        this.#getError = getError;
    }

    getHTML() {
        const template = Handlebars.templates['components/input-field/input-field'];
        return template({ type: this.#type, name: this.#name, placeholder: this.#placeholder });
    }

    showError(errorMsg) {
        this.#errorElement.innerText = errorMsg;
        this.#rootElement.classList.add('error');
    }

    hideError() {
        this.#rootElement.classList.remove('error');
    }

    validate() {
        const inputValue = this.inputElement.value.trim();
        const isValid = super.validate(inputValue);
        if (isValid) {
            this.hideError();
        }
        if (!isValid) {
            this.showError(this.#getError(inputValue));
        }
        return isValid;
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.inputElement = document.querySelector(`.input-field #${this.#name}`);
        this.#rootElement = this.inputElement.parentNode;
        this.#errorElement = this.#rootElement.getElementsByClassName('error-msg')[0];
        this.inputElement.onblur = this.validate.bind(this);
    }
}
