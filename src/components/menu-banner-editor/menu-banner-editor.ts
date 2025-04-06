'use strict';

import './menu-banner-editor.css';

import { Component } from '../../component';
import { InputField } from '../input-field/input-field';
import { Button } from '../button/button';
import { FormBannerEditorOptions } from '../form-banner-editor-options/form-banner-editor-options';
import { InputFile } from '../input-file/input-file';
import { BannerAPI } from '../../api/bannerApi';
import { store } from '../../modules/store';

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
     * Обработчик выбора файла
     * @param {FileList} files - список файлов
     */
    private async onChooseFile(files: FileList): Promise<void> {
        const response = await BannerAPI.upload(files[0]);
        if (response.service.error) {
            console.log(response.service.error);
            return;
        }
        store.update({ key: 'fileId', value: response.service.success });
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
        new InputFile(previewSection, { name: 'media', label: 'Загрузить файл', accept: 'image/*', chooseFilesCallback: this.onChooseFile.bind(this) }).render();

        const optionsSection = this.rootElement.getElementsByClassName('options-section')[0] as HTMLElement;
        optionsSection.insertAdjacentHTML('beforeend', '<h1>Параметры</h1>');
        new FormBannerEditorOptions(optionsSection).render();
    }
}
