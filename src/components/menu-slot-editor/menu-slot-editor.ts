'use strict';

import './menu-slot-editor.scss';

import { Component } from '../../modules/component';
import { FormSlotEditorOptions } from '../form-slot-editor-options/form-slot-editor-options';
import { store } from '../../modules/store';
import { Button } from '../button/button';
import { dispatcher } from '../../modules/dispatcher';
import { Slot, SlotAPI } from '../../api/slotApi';
import { InputSelect } from '../input-select/input-select';
import { InputField } from '../input-field/input-field';

/**
 * Меню редактора слота
 */
export class MenuSlotEditor extends Component {
    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'menu-slot-editor/menu-slot-editor', {});
    }

    /**
     * Отрисовка предпросмотра слота
     */
    private renderPreview(): void {
        const slot = store.get<Slot>('selectedSlot');

        const previewContainer = this.rootElement.querySelector('.preview-container') as HTMLElement;
        // TODO create API
        // const iframeSrc = `${location.origin}/slot/iframe/${slot.id}`;
        // previewContainer.innerHTML = `<iframe class="slot" style="border: none;" title="Slot" width="300" height="300" src="${iframeSrc}"></iframe>`;
    }

    /**
     * Отрисовка кнопки удаления слота
     */
    private renderDeleteButton(): void {
        const slot = store.get<Slot>('selectedSlot');
        if (slot.beingCreated) {
            // return;
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
        if (!confirm('Вы уверены, что хотите удалить этот слот?')) {
            return;
        }
        const slotLink = store.get<Slot>('selectedSlot').link;
        const response = await SlotAPI.delete(slotLink);
        if (response.service.error) {
            return;
        }
        dispatcher.dispatch('slot-delete', slotLink);
    }

    /**
     * Отрисовка секции ссылки
     */
    private renderLinkSection(): void {
        const slot = store.get<Slot>('selectedSlot');

        const linkSection = this.rootElement.querySelector('.link-section') as HTMLElement;

        if (slot.beingCreated) {
            linkSection.insertAdjacentHTML('beforeend', '<p class="empty-state-msg">Чтобы увидеть ссылки, сохраните слот</p>');
            return;
        }

        const sizeSelect = new InputSelect(linkSection, {
            name: 'size',
            label: 'Размер',
            options: [
                { value: 'small', label: 'Маленький' },
                { value: 'medium', label: 'Средний' },
                { value: 'large', label: 'Большой' },
            ],
            placeholder: 'Выберите размер',
        });
        sizeSelect.render();

        const slotLink = `${location.origin}/slot/iframe/${slot.link}`;

        linkSection.insertAdjacentHTML('beforeend', '<div class="link-copy"></div>');
        const linkCopy = linkSection.querySelector('.link-copy') as HTMLElement;

        const linkField = new InputField(linkCopy, {
            name: 'link',
            label: 'Ссылка на объявление',
            placeholder: 'Ссылка',
            type: 'text',
            default: slotLink,
            disabled: true,
        });
        linkField.render();

        const linkCopyButton = new Button(linkCopy);
        linkCopyButton.render({
            type: 'neutral',
            label: '📋',
            onClick: () => {
                navigator.clipboard.writeText(slotLink);
            },
        });

        linkSection.insertAdjacentHTML('beforeend', '<h2>Предпросмотр</h2>');
        linkSection.insertAdjacentHTML('beforeend', '<div class="preview-container"></div>');

        this.renderPreview();
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
