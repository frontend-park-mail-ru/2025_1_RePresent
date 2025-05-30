'use strict';

import './image-upload.scss';

import { Component } from '../../modules/component';
import { InputFile } from '../input-file/input-file';
import { API } from '../../modules/api';
import { ACCEPT_IMAGE } from '../../modules/validation';

/**
 * Обработчик загрузки изображения
 * @callback ImageUpload~UploadCallback
 * @param {File} file - файл изображения
 * @returns {string} - новый src изображения
 */
export type UploadCallback = (file: File) => Promise<string>;

/**
 * Интерфейс для описания параметров компонента
 */
interface ImageUploadProps {
    imgSrc: string;
    imgAlt: string;
    btnLabel: string;
    uploadCallback: UploadCallback;
}

/**
 * Раздел загрузки изображения
 */
export class ImageUpload extends Component {
    protected props: ImageUploadProps;

    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'image-upload/image-upload', {});
    }

    /**
     * Обработчик выбора файла
     */
    private async onChooseFile(files: FileList): Promise<void> {
        const newSrc = await this.props.uploadCallback(files[0]);
        this.props.imgSrc = newSrc;
        this.render(this.props);
    }

    /**
     * Отрисовка
     * @param {ImageUploadProps} props - параметры компонента
     */
    public render(props: ImageUploadProps): void {
        super.render(props);

        const inputFile = new InputFile(this.rootElement,
            {
                name: 'imageInput',
                label: props.btnLabel,
                accept: ACCEPT_IMAGE,
                chooseFilesCallback: this.onChooseFile.bind(this),
            }
        );
        inputFile.render();

        const image = this.rootElement.getElementsByClassName('image')[0] as HTMLImageElement;
        image.onerror = () => {
            image.onerror = null;
            image.src = API.PLACEHOLDER_IMAGE_PATH;
        };
    }
}
