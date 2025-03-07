'use strict';

import { Component } from "../component.js";
import { loadPath } from "../main.js";
import { Button } from "../components/button.js";
import { AdListItem } from "../components/ad-list-item.js";

export class BannersPage extends Component {

    getHTML() {
        return `
        <div class="navbar"></div>

        <div class="contents">
        <div class="ad-list">
            <h1>Мои объявления</h1>
            <button class="primary">Создать объявление</button>
            <div class="list">
                <p class="none-msg">Нет объявлений</p>
            </div>
        </div>

            <div class="main-section"></div>
        </div>  
        `;
    }

    render() {
        this.parent.innerHTML = '';

        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const adList = this.parent.querySelector('.list');

        const adListItem1 = new AdListItem(adList, 'active', 'Ad name 1', 'some stats 1');
        adListItem1.render();

        const adListItem2 = new AdListItem(adList, 'awaiting', 'Ad name 2', 'some stats 2');
        adListItem2.render();

        const adListItem3 = new AdListItem(adList, 'rejected', 'Ad name 3', 'some stats 3');
        adListItem3.render();
    }
}