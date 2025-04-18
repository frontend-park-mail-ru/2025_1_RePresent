'use strict';

import { Banner, BannerAPI } from '../../api/bannerApi';
import { dispatcher } from '../../modules/dispatcher';
import { store } from '../../modules/store';
import { bannerDescriptionGetError, bannerLinkGetError, bannerTitleGetError } from '../../modules/validation';
import { Form, FormProps } from '../form/form';
import { InputField } from '../input-field/input-field';
import { InputSwitch } from '../input-switch/input-switch';

/**
 * Форма параметров объявления
 */
export class FormBannerEditorOptions extends Form {
    private selectedBanner: Banner;

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
        const inputs = this.props.inputs;

        this.selectedBanner.title = inputs.nameInput.getValue();
        this.selectedBanner.link = inputs.linkInput.getValue();
        this.selectedBanner.description = inputs.textInput.getValue();
        this.selectedBanner.status = inputs.isActive.getValue() ? 1 : 0;

        const fileId = store.get<string>('fileId');
        if (fileId) {
            this.selectedBanner.content = fileId;
        }

        if (!this.selectedBanner.content) {
            alert('Загрузите изображение');
            return;
        }

        if (this.selectedBanner.beingCreated) {
            await BannerAPI.create(this.selectedBanner);
            dispatcher.dispatch('banner-create');
        } else {
            await BannerAPI.update(this.selectedBanner);
            dispatcher.dispatch('banner-update', this.selectedBanner.id);
        }
    }

    /**
     * Отрисовка
     */
    render(): void {
        const selectedBanner = store.get<Banner>('selectedBanner');
        this.selectedBanner = selectedBanner;

        const props: FormProps = { inputs: {}, submitLabel: 'Сохранить', onSubmit: this.onSubmit.bind(this), className: 'form-block' };

        super.renderRoot(props);

        const root = this.rootElement;

        props.inputs = {
            nameInput: new InputField(root, {
                type: 'text',
                label: 'Имя',
                name: 'name',
                placeholder: 'Введите имя',
                default: selectedBanner.title,
                getError: bannerTitleGetError,
            }),
            linkInput: new InputField(root, {
                type: 'text',
                label: 'Ссылка на источник',
                name: 'link',
                placeholder: 'Введите ссылку',
                default: selectedBanner.link,
                getError: bannerLinkGetError,
            }),
            textInput: new InputField(root, { // TODO make textarea input
                type: 'text',
                label: 'Текст',
                name: 'text',
                placeholder: 'Введите текст',
                default: selectedBanner.description,
                getError: bannerDescriptionGetError,
            }),
            isActive: new InputSwitch(root, {
                name: 'is-active',
                label: 'Активно',
                checked: selectedBanner.status != 0,
            }),
        };

        super.renderFull(props);
    }
}
