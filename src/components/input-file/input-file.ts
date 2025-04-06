'use strict';

import './input-file.css';

import { Input } from '../../input';
import { Button } from '../button/button';

/**
 * Обработчик выбора файлов
 * @callback InputFile~ChooseFilesCallback
 * @param {FileList} files - список файлов
 */
export type ChooseFilesCallback = (files: FileList) => void;

/**
 * Интерфейс для описания параметров компонента
 */
interface InputFileProps {
    name: string;
    label: string;
    accept: string;
    multiple?: boolean;
    disabled?: boolean;
    chooseFilesCallback: ChooseFilesCallback;
}

/**
 * Кнопка загрузки файла
 */
export class InputFile extends Input {
    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     * @param {InputFieldProps} props - параметры компонента
     */
    constructor(parent: HTMLElement, props: InputFileProps) {
        super(parent, 'input-file/input-file', props);
    }

    /**
     * Содержимое компонента или null, если валидация не пройдена.
     * @returns {?boolean} - содержимое компонента
     */
    public getValue(): boolean | null {
        const value = super.getValue();
        if (value == null) {
            return value;
        }
        return value == 'on';
    }

    /**
     * Отрисовка
     * @param {InputFileProps} props - параметры компонента
     */
    public render(props?: InputFileProps): void {
        props = props || this.props as InputFileProps;

        // Преобразуем boolean в строку 'disabled' или пустую строку
        const disabled = props.disabled ? 'disabled' : '';

        // Передаем обновленные props в родительский метод render
        super.render({ ...props, disabled });

        this.inputElement = this.rootElement.querySelector('#' + props.name) as HTMLInputElement;
        this.inputElement.addEventListener('change', event => {
            const files = (event.target as HTMLInputElement).files;
            props.chooseFilesCallback(files);
        });

        const chooseFileBtn = new Button(this.rootElement);
        chooseFileBtn.render({
            type: 'neutral',
            label: props.label,
            disabled: props.disabled,
            onClick: () => this.inputElement.click(),
        });
    }
}
