'use strict';

import './menu-banner-editor.scss';

import { Component } from '../../modules/component';
import { FormBannerEditorOptions } from '../form-banner-editor-options/form-banner-editor-options';
import { Banner, BannerAPI } from '../../api/bannerApi';
import { store } from '../../modules/store';
import { ImageUpload } from '../image-upload/image-upload';
import { Button } from '../button/button';
import { dispatcher } from '../../modules/dispatcher';
import { API } from '../../modules/api';
import { reConfirm } from '../../modules/re-confirm';
import { reAlert } from '../../modules/re-alert';

/**
 * Меню редактора объявления
 */
export class MenuBannerEditor extends Component {
    private bannerForm: FormBannerEditorOptions;

    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'menu-banner-editor/menu-banner-editor', {});

        dispatcher.on('banner-form-input', this.renderPreview.bind(this));
    }

    /**
     * Отрисовка предпросмотра объявления
     */
    private renderPreview(): void {
        const banner = this.bannerForm.bannerPreview;

        (<HTMLAnchorElement>this.rootElement.querySelector('.preview-container .redirect-link')).href = banner.link || 'https://example.com';
        (<HTMLImageElement>this.rootElement.querySelector('.preview-container .card-image')).src = this.getContentSrcFromId(banner.content);
        (<HTMLParagraphElement>this.rootElement.querySelector('.preview-container .card-link')).innerText = banner.link || 'https://example.com';
        (<HTMLHeadingElement>this.rootElement.querySelector('.preview-container .card-title')).innerText = banner.title || 'Название';
        (<HTMLParagraphElement>this.rootElement.querySelector('.preview-container .card-description')).innerText = banner.description || 'Текст';
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
            reAlert({
                message: 'Ошибка загрузки файла',
                type: 'error',
                lifetimeS: '5',
            });
            return contentSrc;
        }

        contentId = response.service.success;
        store.update({ key: 'fileId', value: contentId });
        reAlert({
            message: 'Файл загружен',
            type: 'success',
            lifetimeS: '5',
        });
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
                imgElement: this.rootElement.querySelector('.preview-container .card-image'),
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
        const bannerTitle = store.get<Banner>('selectedBanner').title;
        if (!await reConfirm({
            message: `Удалить объявление "${bannerTitle}"?`,
            confirmText: 'Удалить',
            confirmType: 'danger',
        })) {
            return;
        }
        const bannerId = store.get<Banner>('selectedBanner').id;
        const response = await BannerAPI.delete(bannerId);
        if (response.service.error) {
            return;
        }
        dispatcher.dispatch('banner-delete', bannerId);
        reAlert({
            message: 'Объявление удалено',
            type: 'success',
            lifetimeS: '5',
        });
    }

    /**
     * Отрисовка
     */
    public render(): void {
        super.render();

        this.renderImageUpload();

        const optionsSection = this.rootElement.getElementsByClassName('options-section')[0] as HTMLElement;
        this.bannerForm = new FormBannerEditorOptions(optionsSection);
        this.bannerForm.render();

        this.renderDeleteButton();

        this.renderPreview();
    }
}
