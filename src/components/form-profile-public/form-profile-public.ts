'use strict';

import './form-profile-public.css';

import { Form, FormProps } from '../form/form';
import { InputField } from '../input-field/input-field';
import { organizationGetError } from '../../modules/validation';

/**
 * Форма публичных данных профиля
 */
export class FormProfilePublic extends Form {
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
                getError: organizationGetError,
            }),
            descriptionInput: new InputField(root, {
                type: 'text',
                label: 'Описание',
                name: 'description',
                placeholder: 'Введите текст',
            }),
        };

        super.renderFull(props);
    }
}
