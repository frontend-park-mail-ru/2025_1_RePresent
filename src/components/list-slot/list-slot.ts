'use strict';

import './list-slot.scss';

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
     * Обработчик создания слота, перезапрашивющий список слотов
     */
    private async onSlotCreate(): Promise<void> {
        this.slots = await SlotAPI.getAll();
        const selectedId = Math.max(...this.slots.map(slot => slot.id));
        this.renderList(selectedId);
    }

    /**
     * Обработчик удаления слота, перезапрашивющий список слотов
     */
    private async onSlotDelete(): Promise<void> {
        store.update({ key: 'selectedSlot', value: null });
        this.slots = await SlotAPI.getAll();
        this.renderList(null);
    }

    /**
     * Обработчик обновления слота, перезапрашивющий список слотов
     * @param {number} slotId - id обновленного слота
     */
    private async onSlotUpdate(slotId: number): Promise<void> {
        this.slots = await SlotAPI.getAll();
        this.renderList(slotId);
    }

    /**
     * Обработчик выбора слота, обновляющий список слотов
     * @param {number} slotId - id выбранного слота
     */
    private onSlotSelect(slotId: number): void {
        this.renderList(slotId);
    }

    /**
     * Обработчик нажатия на Создать слот
     */
    private onSlotCreateClick(): void {
        if (store.get<Slot>('selectedSlot')?.beingCreated) {
            return;
        }

        const newSlot: Slot = {
            id: 0,
            title: '',
            status: 0,
            perShow: 0,
            beingCreated: true,
        };

        store.update({ key: 'selectedSlot', value: newSlot });

        this.renderList(null);

        dispatcher.dispatch('menu-select', 'editor');
    }

    /**
     * Отрисовка списка слотов
     * @param {number} selectedId - id выбранного слота
     */
    private renderList(selectedId: number): void {
        const slotList = this.parent.querySelector('.list') as HTMLElement;
        if (this.slots.length == 0) {
            slotList.innerHTML = '<p class="none-msg">Нет слотов</p>';
            return;
        }
        slotList.innerHTML = '';
        this.slots.forEach(slot => {
            const isSelected = slot.id == selectedId;
            new ListItemBannerSlot(slotList).render({
                itemId: slot.id,
                name: slot.title,
                stats: `От ${slot.perShow} руб.`,
                status: (slot.status == 1) ? 'active' : 'rejected',
                selected: isSelected,
            });
            if (isSelected) {
                store.update({ key: 'selectedSlot', value: slot });
            }
        });
    }

    /**
     * Отрисовка страницы
     */
    public async render(): Promise<void> {
        super.render();

        const createSlotBtn = this.parent.querySelector('.create-slot-btn') as HTMLElement;
        createSlotBtn.addEventListener('click', this.onSlotCreateClick.bind(this));

        this.slots = await SlotAPI.getAll();
        store.update({ key: 'hasSlots', value: this.slots.length > 0 });
        this.renderList(null);
    }
}
