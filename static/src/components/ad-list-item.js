'use strict';

import { Component } from "../component.js";

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
        return `
        <div class="ad-list-item ${this.#status}">
            <div class="info">
                <span class="name">${this.#name}</span>
                <span class="stats">${this.#stats}</span>
            </div>
            <div class="indicator"></div>
        </div>
        `;
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}