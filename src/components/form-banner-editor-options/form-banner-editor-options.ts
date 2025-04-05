'use strict';

import { Banner } from '../../api/bannerApi';
import { dispatcher } from '../../modules/dispatcher';
import { store } from '../../modules/store';
import { Form, FormProps } from '../form/form';
import { InputField } from '../input-field/input-field';
import { InputSwitch } from '../input-switch/input-switch';

/**
 * Форма параметров объявления
 */
export class FormBannerEditorOptions extends Form {
    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent);

        dispatcher.on('store-updated-chosenBanner', this.render.bind(this));
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
        const selectedBanner = store.get('selectedBanner') as Banner;

        const props: FormProps = { inputs: {}, submitLabel: 'Сохранить', onSubmit: this.onSubmit.bind(this), className: 'form-block' };

        super.renderRoot(props);

        const root = this.rootElement;

        props.inputs = {
            nameInput: new InputField(root, {
                type: 'text',
                label: 'Имя',
                name: 'name',
                placeholder: 'Введите имя',
                default: selectedBanner.Title,
            }),
            linkInput: new InputField(root, {
                type: 'text',
                label: 'Ссылка на источник',
                name: 'link',
                placeholder: 'Введите ссылку',
                default: selectedBanner.Link,
            }),
            textInput: new InputField(root, { // TODO make textarea input
                type: 'text',
                label: 'Текст',
                name: 'text',
                placeholder: 'Введите текст',
                default: selectedBanner.Description,
            }),
            isActive: new InputSwitch(root, {
                name: 'is-active',
                label: 'Активно',
                checked: selectedBanner.Status != 0,
            }),
        };

        super.renderFull(props);
    }
}
