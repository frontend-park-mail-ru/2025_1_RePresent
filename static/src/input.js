'use strict';

import { Component } from "./component.js";

export class Input extends Component {
    #validatedValue = none;
    #validate;

    inputElement;

    constructor(parent, validate = none) {
        super(parent);
        // TODO: init #validate
    }

    validate() { // TODO: use user-defined validator
        this.#validatedValue = this.inputElement.value;
        return true;
    }

    getValue() {
        return this.#validatedValue;
    }
}
