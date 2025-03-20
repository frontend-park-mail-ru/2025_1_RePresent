'use strict';

import './banner-list.css';

import { Component, Props } from '../../component';
import { BannerListItem } from '../banner-list-item/banner-list-item';
import { Banner } from '../../api/bannerApi';

/**
 * Интерфейс списка объявлений
 */
interface PageMyBannersProps extends Props {
    banners: Banner[];
}

/**
 * Панель списка объявлений
 */
export class BannerList extends Component {
    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'banner-list/banner-list', {});
    }

    /**
     * Отрисовка списка объявлений
     * @param {Banner[]} banners - список объявлений
     */
    private async renderList(banners: Banner[]): Promise<void> {
        const adList = this.parent.querySelector('.list') as HTMLElement;
        banners.forEach(banner => {
            new BannerListItem(adList).render(banner);
        });
    }

    /**
     * Отрисовка страницы
     */
    render(props: PageMyBannersProps): void {
        super.render();

        this.renderList(props.banners);
    }
}
