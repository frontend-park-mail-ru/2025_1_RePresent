'use strict';

import './menu-slot-editor.scss';

import { Component } from '../../modules/component';
import { FormSlotEditorOptions } from '../form-slot-editor-options/form-slot-editor-options';
import { store } from '../../modules/store';
import { Button } from '../button/button';
import { dispatcher } from '../../modules/dispatcher';
import { Slot, SlotAPI, SlotFormat } from '../../api/slotApi';
import { InputSelect } from '../input-select/input-select';
import { InputField } from '../input-field/input-field';
import { API } from '../../modules/api';
import { reConfirm } from '../../modules/re-confirm';
import { reAlert } from '../../modules/re-alert';

/**
 * Меню редактора слота
 */
export class MenuSlotEditor extends Component {
    private linkField: InputField;

    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'menu-slot-editor/menu-slot-editor', {});
    }

    /**
     * Отрисовка предпросмотра слота
     * @param {number} code - код выбранного формата
     */
    private renderPreview(code: number): void {
        const previewContainer = this.rootElement.querySelector('.preview-container') as HTMLElement;

        if (!code) {
            previewContainer.innerHTML = '<p class="empty-state-msg">Выберите формат, чтобы увидеть объявление</p>';
            return;
        }

        const slot = store.get<Slot>('selectedSlot');
        const slotFormats = store.get<SlotFormat[]>('slotFormats');
        const format = slotFormats.filter(f => f.code == code)[0];

        const slotLink = `${API.API_ORIGIN}/adv/iframe/${slot.link}`;
        const iframeHTML = `<iframe class="slot" style="border: none;" title="Slot preview" width="${format.width}" height="${format.height}" src="${slotLink}"></iframe>`;
        previewContainer.innerHTML = iframeHTML;
        this.linkField.inputElement.value = iframeHTML;
    }

    /**
     * Отрисовка кнопки удаления слота
     */
    private renderDeleteButton(): void {
        const slot = store.get<Slot>('selectedSlot');
        if (slot.beingCreated) {
            return;
        }
        const cancelSaveSection = this.rootElement.querySelector('.cancel-save') as HTMLElement;
        const deleteButton = new Button(cancelSaveSection)
        deleteButton.render({
            label: 'Удалить',
            type: 'danger',
            onClick: this.onDeleteClick.bind(this),
        });
    }

    /**
     * Обработка нажатия на кнопку Удалить
     */
    private async onDeleteClick(): Promise<void> {
        const slotName = store.get<Slot>('selectedSlot').slot_name;
        if (!await reConfirm({
            message: `Удалить слот "${slotName}"?`,
            confirmText: 'Удалить',
            confirmType: 'danger',
        })) {
            return;
        }
        const slotLink = store.get<Slot>('selectedSlot').link;
        const response = await SlotAPI.delete(slotLink);
        if (response.service.error) {
            return;
        }
        dispatcher.dispatch('slot-delete', slotLink);
        reAlert({
            message: 'Слот удален',
            type: 'success',
            lifetimeS: '5',
        });
    }

    /**
     * Обработка выбора формата слота
     * @param {number | null} code - код выбранного формата
     */
    private onFormatSelect(code: number | null): void {
        if (code == null) {
            this.linkField.inputElement.value = '';
            return;
        }

        dispatcher.dispatch('setSlotFormatCode', code);

        this.renderPreview(code);
    }

    /**
     * Отрисовка секции ссылки
     */
    private async renderLinkSection(): Promise<void> {
        const slot = store.get<Slot>('selectedSlot');

        const linkSection = this.rootElement.querySelector('.link-section') as HTMLElement;

        if (slot.beingCreated) {
            linkSection.insertAdjacentHTML('beforeend', '<p class="empty-state-msg">Чтобы увидеть ссылки, сохраните слот</p>');
            return;
        }

        let slotFormats = store.get<SlotFormat[]>('slotFormats');
        if (!slotFormats) {
            slotFormats = await SlotAPI.getFormats();
            store.update({ key: 'slotFormats', value: slotFormats });
        }

        const sizeSelect = new InputSelect(linkSection, {
            name: 'size',
            label: 'Размер объявления',
            placeholder: 'Выберите размер',
            options: slotFormats.map(f => { return { value: f.code.toString(), label: f.description } }),
            defaultValue: slot.format_code ? slot.format_code.toString() : null,
        });
        sizeSelect.render();
        sizeSelect.inputElement.addEventListener('change', () => {
            const size = sizeSelect.getValue();
            const code = size ? +size : null;
            this.onFormatSelect(code);
        });

        linkSection.insertAdjacentHTML('beforeend', '<div class="link-copy"></div>');
        const linkCopy = linkSection.querySelector('.link-copy') as HTMLElement;

        this.linkField = new InputField(linkCopy, {
            name: 'link',
            label: 'Компонент объявления',
            placeholder: 'Здесь появится ссылка',
            type: 'text',
            disabled: true,
        });
        this.linkField.render();

        const linkCopyButton = new Button(linkCopy);
        linkCopyButton.render({
            type: 'neutral',
            label: '<img class="icon-copy" src="/static/icons/copy-solid.svg" alt="📋">',
            onClick: () => {
                navigator.clipboard.writeText(<string>this.linkField.getValue());
            },
        });

        linkSection.insertAdjacentHTML('beforeend', '<h2>Предпросмотр</h2>');
        linkSection.insertAdjacentHTML('beforeend', '<div class="preview-container"></div>');

        this.onFormatSelect(slot.format_code);
    }

    /**
     * Отрисовка
     */
    public render(): void {
        super.render();

        const optionsSection = this.rootElement.querySelector('.options-section') as HTMLElement;
        new FormSlotEditorOptions(optionsSection).render();

        this.renderDeleteButton();

        this.renderLinkSection();
    }
}
