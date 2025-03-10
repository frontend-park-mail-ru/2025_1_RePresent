'use strict';

import { Component } from '../../component.js';

export class AdListItem extends Component {
    #status;
    #name;
    #stats;

    constructor(parent, type, name, stats) {
        super(parent);
        this.#status = type;
        this.#name = name;
        this.#stats = stats;
    }

    getHTML() {
        const template = Handlebars.templates['components/ad-list-item/ad-list-item'];
        return template({ status: this.#status, name: this.#name, stats: this.#stats });
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}
