'use strict';

import './form-profile-public.css';

import { Form, FormProps } from '../form/form';
import { InputField } from '../input-field/input-field';

/**
 * Форма публичных данных профиля
 */
export class FormProfilePublic extends Form {
    /**
     * Проверка валидности названия организации
     * @param {string} value - значение названия организации
     * @returns {string} - сообщение об ошибке или пустая строка, если ошибок нет
     */
    organizationGetError(value: string): string {
        const isValid = value.trim().length >= 5;
        if (isValid) {
            return '';
        }
        return 'Минимум 5 символов';
    }

    /**
     * Обработчик нажатия на кнопку отправки формы
     */
    private async onSubmit(): Promise<void> {
        // TODO API call
    }

    /**
     * Отрисовка
     */
    render(): void {
        const props: FormProps = {
            inputs: {},
            submitLabel: 'Сохранить',
            hasCancel: true,
            onSubmit: this.onSubmit.bind(this),
            className: 'form-profile-public'
        };

        super.renderRoot(props);

        const root = this.rootElement;

        props.inputs = {
            organizationInput: new InputField(root, {
                type: 'text',
                label: 'Название организации',
                name: 'organization',
                placeholder: 'Введите название',
                getError: this.organizationGetError.bind(this),
            }),
            descriptionInput: new InputField(root, {
                type: 'text',
                label: 'Описание',
                name: 'description',
                placeholder: 'Введите текст',
                getError: this.organizationGetError.bind(this),
            }),
        };

        super.renderFull(props);
    }
}
