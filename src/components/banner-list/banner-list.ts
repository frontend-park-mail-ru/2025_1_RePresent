'use strict';

import './banner-list.css';

import { Component } from '../../component';
import { BannerListItem } from '../banner-list-item/banner-list-item';
import { Banner, BannerAPI } from '../../api/bannerApi';
import { dispatcher } from '../../modules/dispatcher';
import { store } from '../../modules/store';

/**
 * Панель списка объявлений
 */
export class BannerList extends Component {
    private banners: Banner[];

    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'banner-list/banner-list', {});

        dispatcher.on('banner-select', this.onBannerSelect.bind(this));
    }

    /**
     * Обработчик выбора баннера, обновляющий список баннеров
     * @param {number} bannerId - id выбранного баннера
     */
    private onBannerSelect(bannerId: number): void {
        this.renderList(bannerId);
    }

    /**
     * Обработчик нажатия на Создать объявление
     */
    private onBannerCreateClick(): void {
        const newBanner: Banner = {
            id: 0,
            title: '',
            description: '',
            content: '',
            link: '',
            balance: 0,
            status: 0,
            owner: 0,
            beingCreated: true,
        };

        store.update({ key: 'selectedBanner', value: newBanner });

        dispatcher.dispatch('menu-select', 'editor');
    }

    /**
     * Отрисовка списка объявлений
     * @param {number} selectedId - id выбранного баннера
     */
    private renderList(selectedId: number): void {
        const adList = this.parent.querySelector('.list') as HTMLElement;
        adList.innerHTML = '';
        this.banners.forEach(banner => {
            const isSelected = banner.id == selectedId;
            new BannerListItem(adList).render({ bannerId: banner.id, selected: isSelected });
            if (isSelected) {
                store.update({ key: 'selectedBanner', value: banner });
            }
        });
    }

    /**
     * Запрос и отрисовка списка объявлений
     */
    private async loadBanners() {
        this.banners = await BannerAPI.getAll();
        this.renderList(null);
    }

    /**
     * Отрисовка страницы
     */
    public render(): void {
        super.render();

        const createBannerBtn = this.parent.querySelector('.create-banner-btn') as HTMLElement;
        createBannerBtn.addEventListener('click', this.onBannerCreateClick.bind(this));

        this.loadBanners();
    }
}
