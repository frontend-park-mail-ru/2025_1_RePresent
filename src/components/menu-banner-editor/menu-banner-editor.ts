'use strict';

import './menu-banner-editor\.scss';

import { Component } from '../../modules/component';
import { FormBannerEditorOptions } from '../form-banner-editor-options/form-banner-editor-options';
import { Banner, BannerAPI } from '../../api/bannerApi';
import { store } from '../../modules/store';
import { ImageUpload } from '../image-upload/image-upload';
import { Button } from '../button/button';
import { dispatcher } from '../../modules/dispatcher';
import { API } from '../../modules/api';

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
     * Отрисовка предпросмотра объявления
     */
    private renderPreview(): void {
        const banner = store.get<Banner>('selectedBanner');
        if (banner.beingCreated) {
            return;
        }
        const previewContainer = this.rootElement.getElementsByClassName('preview-container')[0] as HTMLElement;
        const iframeSrc = `${API.API_ORIGIN}/banner/iframe/${banner.id}`;
        previewContainer.innerHTML = `<iframe class="banner" style="border: none;" title="Banner" width="300" height="300" src="${iframeSrc}"></iframe>`;
    }

    /**
     * Получить src изображения баннера
     * @param {string} contentId - id изображения баннера
     * @returns {string} - src изображения баннера
     */
    private getContentSrcFromId(contentId: string): string {
        return `${API.API_ORIGIN}/banner/image/${contentId}`;
    }

    /**
     * Обработчик загрузки файла
     * @param {File} file - файл
     * @returns {Promise<string>} - новый src файла, или старый в случае ошибки загрузки
     */
    private async uploadFile(file: File): Promise<string> {
        let contentId = store.get<Banner>('selectedBanner').content;
        const contentSrc = this.getContentSrcFromId(contentId);

        const response = await BannerAPI.upload(file);
        if (response.service.error) {
            return contentSrc;
        }

        contentId = response.service.success;
        store.update({ key: 'fileId', value: contentId });
        return this.getContentSrcFromId(contentId);
    }

    /**
     * Отрисовка раздела загрузки изображения
     */
    private renderImageUpload(): void {
        const banner = store.get<Banner>('selectedBanner');
        const previewSection = this.rootElement.getElementsByClassName('preview-section')[0] as HTMLElement;
        const contentSrc = banner.beingCreated ? '' : this.getContentSrcFromId(banner.content);

        new ImageUpload(previewSection).render(
            {
                imgSrc: contentSrc,
                imgAlt: 'изображение объявления',
                btnLabel: 'Загрузить',
                uploadCallback: this.uploadFile.bind(this),
            }
        );
    }

    /**
     * Отрисовка кнопки удаления объявления
     */
    private renderDeleteButton(): void {
        const banner = store.get<Banner>('selectedBanner');
        if (banner.beingCreated) {
            return;
        }
        const cancelSaveSection = this.rootElement.getElementsByClassName('cancel-save')[0] as HTMLElement;
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
        if (!confirm('Вы уверены, что хотите удалить это объявление?')) {
            return;
        }
        const bannerId = store.get<Banner>('selectedBanner').id;
        const response = await BannerAPI.delete(bannerId);
        if (response.service.error) {
            return;
        }
        dispatcher.dispatch('banner-delete', bannerId);
    }

    /**
     * Отрисовка
     */
    public render(): void {
        super.render();

        this.renderImageUpload();

        const optionsSection = this.rootElement.getElementsByClassName('options-section')[0] as HTMLElement;
        new FormBannerEditorOptions(optionsSection).render();

        this.renderDeleteButton();

        this.renderPreview();
    }
}
