'use strict';

import './menu-banner-editor.css';

import { Component } from '../../component';
import { InputField } from '../input-field/input-field';
import { Button } from '../button/button';
import { FormBannerEditorOptions } from '../form-banner-editor-options/form-banner-editor-options';

/**
 * Меню редактора объявления
 */
export class MenuBannerEditor extends Component {
    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'menu-banner-editor/menu-banner-editor', {});
    }

    /**
     * Отрисовка
     */
    public render(): void {
        super.render();

        const previewSection = this.rootElement.getElementsByClassName('preview-section')[0] as HTMLElement;
        previewSection.insertAdjacentHTML('beforeend', '<h1>Предпросмотр</h1>');
        previewSection.insertAdjacentHTML('beforeend', '<div class="preview-container"></div>');
        new InputField(previewSection, { type: 'text', label: 'Тип файла', name: 'contentType', placeholder: 'Тип' }).render(); // TODO make choice input and move into form
        new Button(previewSection).render({ type: 'neutral', label: 'Загрузить файл', onClick: () => { alert('Файл загружен') } });

        const optionsSection = this.rootElement.getElementsByClassName('options-section')[0] as HTMLElement;
        optionsSection.insertAdjacentHTML('beforeend', '<h1>Параметры</h1>');
        new FormBannerEditorOptions(optionsSection).render();
    }
}
