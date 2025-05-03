'use strict';

import { Component } from '../../modules/component';
import { ListItemBannerSlot } from '../list-item-banner-slot/list-item-banner-slot';
import { Banner, BannerAPI } from '../../api/bannerApi';
import { dispatcher } from '../../modules/dispatcher';
import { store } from '../../modules/store';

/**
 * Панель списка объявлений
 */
export class ListBanner extends Component {
    private banners: Banner[];
    private listExpanded: boolean = true;

    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'list-banner/list-banner', {});

        dispatcher.on('item-select', this.onBannerSelect.bind(this));
        dispatcher.on('banner-update', this.onBannerUpdate.bind(this));
        dispatcher.on('banner-delete', this.onBannerDelete.bind(this));
        dispatcher.on('banner-create', this.onBannerCreate.bind(this));
    }

    /**
     * Обработчик создания баннера, перезапрашивющий список баннеров
     */
    private async onBannerCreate(): Promise<void> {
        this.banners = await BannerAPI.getAll();
        const selectedId = Math.max(...this.banners.map(banner => banner.id));
        this.renderList(selectedId);
    }

    /**
     * Обработчик удаления баннера, перезапрашивющий список баннеров
     */
    private async onBannerDelete(): Promise<void> {
        store.update({ key: 'selectedBanner', value: null });
        this.banners = await BannerAPI.getAll();
        this.renderList(null);
        this.showBannerList();
    }

    /**
     * Обработчик обновления баннера, перезапрашивющий список баннеров
     * @param {number} bannerId - id обновленного баннера
     */
    private async onBannerUpdate(bannerId: number): Promise<void> {
        this.banners = await BannerAPI.getAll();
        this.renderList(bannerId);
    }

    /**
     * Обработчик выбора баннера, обновляющий список баннеров
     * @param {number} bannerId - id выбранного баннера
     */
    private onBannerSelect(bannerId: number): void {
        this.renderList(bannerId);
        this.hideBannerList();
    }

    /**
     * Обработчик нажатия на Создать объявление
     */
    private onBannerCreateClick(): void {
        if (store.get<Banner>('selectedBanner')?.beingCreated) {
            return;
        }

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

        this.renderList(null);

        dispatcher.dispatch('menu-select', 'editor');

        this.hideBannerList();
    }

    /**
     * Отрисовка списка объявлений
     * @param {number} selectedId - id выбранного баннера
     */
    private renderList(selectedId: number): void {
        const adList = this.parent.querySelector('.list') as HTMLElement;
        if (this.banners.length == 0) {
            adList.innerHTML = '<p class="none-msg">Нет объявлений</p>';
            return;
        }
        adList.innerHTML = '';
        this.banners.forEach(banner => {
            const isSelected = banner.id == selectedId;
            new ListItemBannerSlot(adList).render({
                itemId: banner.id,
                name: banner.title,
                stats: banner.link,
                status: (banner.status == 1) ? 'active' : 'rejected',
                selected: isSelected,
            });
            if (isSelected) {
                store.update({ key: 'selectedBanner', value: banner });
            }
        });
    }

    /**
     * Показать список объявлений
     */
    private showBannerList() {
        this.rootElement.classList.add('expanded');
    }

    /**
     * Спрятать список объявлений
     */
    private hideBannerList() {
        this.rootElement.classList.remove('expanded');
    }

    /**
     * Функциональность переключателя видимости списка на мобильных устройствах
     */
    private bindExpandToggle() {
        const toggle = this.rootElement.querySelector('.toggle') as HTMLElement;
        toggle.onclick = () => {
            if (this.listExpanded) {
                this.hideBannerList();
            } else {
                this.showBannerList();
            }
            this.listExpanded = !this.listExpanded;
        }
    }

    /**
     * Отрисовка страницы
     */
    public async render(): Promise<void> {
        super.render();

        this.bindExpandToggle();

        const createBannerBtn = this.parent.querySelector('.create-banner-btn') as HTMLElement;
        createBannerBtn.addEventListener('click', this.onBannerCreateClick.bind(this));

        this.banners = await BannerAPI.getAll();
        store.update({ key: 'hasBanners', value: this.banners.length > 0 });
        this.renderList(null);
    }
}
