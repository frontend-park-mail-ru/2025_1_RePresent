'use strict';

import { Component } from '../../modules/component';
import { ListItemBannerSlot } from '../list-item-banner-slot/list-item-banner-slot';
import { Slot, SlotAPI } from '../../api/slotApi';
import { dispatcher } from '../../modules/dispatcher';
import { store } from '../../modules/store';

/**
 * Панель списка слотов
 */
export class ListSlot extends Component {
    private slots: Slot[];
    private listExpanded: boolean = true;

    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'list-slot/list-slot', {});

        dispatcher.on('item-select', this.onSlotSelect.bind(this));
        dispatcher.on('slot-update', this.onSlotUpdate.bind(this));
        dispatcher.on('slot-delete', this.onSlotDelete.bind(this));
        dispatcher.on('slot-create', this.onSlotCreate.bind(this));
    }

    /**
     * Обработчик создания слота, добавляющий слот в список
     * @param {Slot} slot - созданный слот
     */
    private async onSlotCreate(slot: Slot): Promise<void> {
        this.slots.push(slot);
        this.renderList(slot.link);
    }

    /**
     * Обработчик удаления слота, перезапрашивющий список слотов
     * @param {string} slotLink - ссылка удаленного слота
     */
    private async onSlotDelete(slotLink: string): Promise<void> {
        this.slots = this.slots.filter(s => s.link != slotLink);
        this.renderList(null);
        this.showSlotList();
        store.update({ key: 'selectedSlot', value: null });
    }

    /**
     * Обработчик обновления слота, перезапрашивющий список слотов
     * @param {Slot} slot - обновленный слот
     */
    private async onSlotUpdate(slot: Slot): Promise<void> {
        this.slots = this.slots.map(s => (s.link == slot.link) ? slot : s);
        this.renderList(slot.link);
    }

    /**
     * Обработчик выбора слота, обновляющий список слотов
     * @param {string} slotLink - ссылка выбранного слота
     */
    private onSlotSelect(slotLink: string): void {
        this.renderList(slotLink);
        this.hideSlotList();
    }

    /**
     * Обработчик нажатия на Создать слот
     */
    private onSlotCreateClick(): void {
        this.hideSlotList();

        if (store.get<Slot>('selectedSlot')?.beingCreated) {
            return;
        }

        const newSlot: Slot = {
            slot_name: '',
            is_active: false,
            min_price: '',
            format_code: 0,
            beingCreated: true,
        };

        store.update({ key: 'selectedSlot', value: newSlot });

        this.renderList(null);

        dispatcher.dispatch('menu-select', 'editor');
    }

    /**
     * Отрисовка списка слотов
     * @param {string} selectedLink - id выбранного слота
     */
    private renderList(selectedLink: string): void {
        const slotList = this.parent.querySelector('.list') as HTMLElement;
        if (this.slots.length == 0) {
            store.update({ key: 'hasSlots', value: false });
            slotList.innerHTML = '<p class="none-msg">Нет слотов</p>';
            return;
        }
        store.update({ key: 'hasSlots', value: true });

        slotList.innerHTML = '';
        this.slots.forEach(slot => {
            const isSelected = slot.link == selectedLink;
            new ListItemBannerSlot(slotList).render({
                itemId: slot.link,
                name: slot.slot_name,
                stats: `От ${slot.min_price} руб.`,
                status: slot.is_active ? 'active' : 'rejected',
                selected: isSelected,
            });
            if (isSelected) {
                store.update({ key: 'selectedSlot', value: slot });
            }
        });
    }

    /**
     * Показать список слотов
     */
    private showSlotList() {
        this.rootElement.classList.add('expanded');
        this.listExpanded = true;
    }

    /**
     * Спрятать список слотов
     */
    private hideSlotList() {
        this.rootElement.classList.remove('expanded');
        this.listExpanded = false;
    }

    /**
     * Функциональность переключателя видимости списка на мобильных устройствах
     */
    private bindExpandToggle() {
        const toggle = this.rootElement.querySelector('.toggle') as HTMLElement;
        toggle.onclick = () => {
            if (this.listExpanded) {
                this.hideSlotList();
                return;
            }
            this.showSlotList();
        }

        dispatcher.on('swipe-right', () => {
            this.showSlotList();
        });
        dispatcher.on('swipe-left', () => {
            this.hideSlotList();
        });
    }

    /**
     * Отрисовка страницы
     */
    public async render(): Promise<void> {
        super.render();

        this.bindExpandToggle();

        const createSlotBtn = this.parent.querySelector('.create-slot-btn') as HTMLElement;
        createSlotBtn.addEventListener('click', this.onSlotCreateClick.bind(this));

        this.slots = await SlotAPI.getAll();
        this.renderList(null);
    }
}
