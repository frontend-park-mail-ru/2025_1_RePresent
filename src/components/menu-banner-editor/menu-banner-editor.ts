'use strict';

import './menu-banner-editor.css';

import { Component } from '../../component';
import { FormBannerEditorOptions } from '../form-banner-editor-options/form-banner-editor-options';
import { Banner, BannerAPI } from '../../api/bannerApi';
import { store } from '../../modules/store';
import { ImageUpload } from '../image-upload/image-upload';

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
     * Получить src изображения баннера
     * @param {string} contentId - id изображения баннера
     * @returns {string} - src изображения баннера
     */
    private getContentSrcFromId(contentId: string): string {
        return `ENV_API_ORIGIN/api/ENV_API_VERSION/banner/image/${contentId}`;
    }

    /**
     * Обработчик загрузки файла
     * @param {FileList} file - файл
     * @returns {Promise<string>} - новый src файла, или старый в случае ошибки загрузки
     */
    private async uploadFile(file: File): Promise<string> {
        let contentId = (store.get('selectedBanner') as Banner).content;
        const contentSrc = this.getContentSrcFromId(contentId);

        const response = await BannerAPI.upload(file);
        if (response.service.error) {
            console.log(response.service.error);
            return contentSrc;
        }

        contentId = response.service.success;
        store.update({ key: 'fileId', value: contentId });
        return this.getContentSrcFromId(contentId);
    }

    /**
     * Отрисовка
     */
    public render(): void {
        super.render();

        const previewSection = this.rootElement.getElementsByClassName('preview-section')[0] as HTMLElement;
        previewSection.insertAdjacentHTML('beforeend', '<h1>Предпросмотр</h1>');
        previewSection.insertAdjacentHTML('beforeend', '<div class="preview-container"></div>');

        const contentId = (store.get('selectedBanner') as Banner).content;
        const contentSrc = this.getContentSrcFromId(contentId);
        new ImageUpload(previewSection).render(
            {
                imgSrc: contentSrc,
                imgAlt: 'загруженное изображение',
                btnLabel: 'Загрузить',
                uploadCallback: this.uploadFile.bind(this),
            }
        );

        const optionsSection = this.rootElement.getElementsByClassName('options-section')[0] as HTMLElement;
        optionsSection.insertAdjacentHTML('beforeend', '<h1>Параметры</h1>');
        new FormBannerEditorOptions(optionsSection).render();
    }
}
