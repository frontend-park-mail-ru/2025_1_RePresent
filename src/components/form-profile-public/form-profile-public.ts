'use strict';

import './form-profile-public\.scss';

import { Form, FormProps } from '../form/form';
import { InputField } from '../input-field/input-field';
import { orgDescriptionGetError, organizationGetError } from '../../modules/validation';
import { store } from '../../modules/store';
import { Profile, ProfileAPI } from '../../api/profileApi';

/**
 * Форма публичных данных профиля
 */
export class FormProfilePublic extends Form {
    /**
     * Обработчик нажатия на кнопку отправки формы
     */
    private async onSubmit(): Promise<void> {
        const inputs = this.props.inputs;
        let profile = store.get<Profile>('profile');

        profile.username = inputs.organizationInput.getValue();
        profile.description = inputs.descriptionInput.getValue();

        const response = await ProfileAPI.updateMyInfo(profile);
        if (response.service.error) {
            return;
        }

        store.update({ key: 'profile', value: profile });
        this.render();
    }

    /**
     * Отрисовка
     */
    public render(): void {
        const props: FormProps = {
            inputs: {},
            submitLabel: 'Сохранить',
            hasCancel: true,
            onSubmit: this.onSubmit.bind(this),
            className: 'form-profile-public'
        };

        super.renderRoot(props);

        const root = this.rootElement;
        const profile = store.get<Profile>('profile');

        props.inputs = {
            organizationInput: new InputField(root, {
                type: 'text',
                label: 'Название организации',
                name: 'organization',
                placeholder: 'Введите название',
                getError: organizationGetError,
                default: profile.username,
            }),
            descriptionInput: new InputField(root, {
                type: 'text',
                label: 'Описание',
                name: 'description',
                placeholder: 'Введите текст',
                getError: orgDescriptionGetError,
                default: profile.description,
            }),
        };

        super.renderFull(props);
    }
}
