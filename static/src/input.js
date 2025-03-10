'use strict';

import { Component } from './component.js';

export class Input extends Component {
    #validatedValue = null;
    #validateValue;

    inputElement;

    constructor(parent, validate) {
        super(parent);
        this.#validateValue = validate;
    }

    validate() {
        if (!this.#validateValue) {
            return true;
        }
        const isValid = this.#validateValue(this.inputElement.value);
        if (isValid) {
            this.#validatedValue = this.inputElement.value;
        }
        if (!isValid) {
            this.#validatedValue = null;
        }
        return isValid;
    }

    getValue() {
        if (!this.#validateValue) {
            return this.inputElement.value;
        }
        return this.#validatedValue;
    }
}
