'use strict';

import './image-upload.css';

import { Component } from '../../component';
import { InputFile } from '../input-file/input-file';

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
                accept: 'image/*',
                chooseFilesCallback: this.onChooseFile.bind(this),
            }
        );
        inputFile.render();
    }
}
