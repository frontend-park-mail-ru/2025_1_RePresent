'use strict';

import { Banner, BannerAPI } from '../../api/bannerApi';
import { dispatcher } from '../../modules/dispatcher';
import { reAlert } from '../../modules/re-alert';
import { store } from '../../modules/store';
import { bannerDescriptionGetError, bannerLinkGetError, bannerTitleGetError, perShowGetError } from '../../modules/validation';
import { Form, FormProps } from '../form/form';
import { InputField } from '../input-field/input-field';
import { InputSwitch } from '../input-switch/input-switch';

/**
 * Форма параметров объявления
 */
export class FormBannerEditorOptions extends Form {
    public bannerPreview: Banner;
    private selectedBanner: Banner;

    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent);
    }

    /**
     * Обработчик нажатия на кнопку отправки формы
     */
    private async onSubmit(): Promise<void> {
        const inputs = this.props.inputs;

        this.selectedBanner.title = inputs.nameInput.getValue();
        this.selectedBanner.link = inputs.linkInput.getValue();
        this.selectedBanner.max_price = inputs.maxPrice.getValue();
        this.selectedBanner.description = inputs.textInput.getValue();
        this.selectedBanner.status = inputs.isActive.getValue() ? 1 : 0;

        const fileId = store.get<string>('fileId');
        if (fileId) {
            this.selectedBanner.content = fileId;
        }

        if (!this.selectedBanner.content) {
            reAlert({
                message: 'Загрузите изображение',
                type: 'error',
                lifetimeS: '5',
            });
            return;
        }

        if (this.selectedBanner.beingCreated) {
            const response = await BannerAPI.create(this.selectedBanner);
            if (response.service.error) {
                reAlert({
                    message: 'Ошибка создания объявления',
                    type: 'error',
                    lifetimeS: '5',
                });
                return;
            }
            dispatcher.dispatch('banner-create');
            reAlert({
                message: 'Объявление создано',
                type: 'success',
                lifetimeS: '5',
            });
        } else {
            const response = await BannerAPI.update(this.selectedBanner);
            if (response.service.error) {
                reAlert({
                    message: 'Ошибка обновления объявления',
                    type: 'error',
                    lifetimeS: '5',
                });
                return;
            }
            dispatcher.dispatch('banner-update', this.selectedBanner.id);
            reAlert({
                message: 'Объявление обновлено',
                type: 'success',
                lifetimeS: '5',
            });
        }
    }

    /**
     * Обработчик ввода информации в форму
     */
    private onInput(): void {
        const inputs = this.props.inputs;

        inputs.nameInput.validate();
        inputs.linkInput.validate();
        inputs.textInput.validate();

        this.bannerPreview = {
            title: inputs.nameInput.getValue(),
            link: inputs.linkInput.getValue(),
            description: inputs.textInput.getValue(),
            id: 0,
            content: '',
            max_price: '',
            balance: 0,
            status: 0,
            owner: 0,
        };

        dispatcher.dispatch('banner-form-input');
    }

    /**
     * Отрисовка
     */
    render(): void {
        const selectedBanner = store.get<Banner>('selectedBanner');
        this.selectedBanner = selectedBanner;
        this.bannerPreview = selectedBanner;

        const props: FormProps = { inputs: {}, submitLabel: 'Сохранить', onSubmit: this.onSubmit.bind(this), className: 'form-block' };

        super.renderRoot(props);

        const root = this.rootElement;

        props.inputs = {
            nameInput: new InputField(root, {
                type: 'text',
                label: 'Название',
                name: 'name',
                placeholder: 'Введите название',
                default: selectedBanner.title,
                getError: bannerTitleGetError,
            }),
            linkInput: new InputField(root, {
                type: 'text',
                label: 'Ссылка на источник',
                name: 'link',
                placeholder: 'https://example.com',
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
            maxPrice: new InputField(root, {
                type: 'text',
                label: 'Максимальная стоимость показа объявления, руб.',
                name: 'max-price',
                placeholder: 'Введите стоимость',
                default: selectedBanner.max_price,
                getError: perShowGetError,
            }),
            isActive: new InputSwitch(root, {
                name: 'is-active',
                label: 'Активно',
                checked: selectedBanner.status != 0,
            }),
        };

        super.renderFull(props);

        props.inputs.nameInput.inputElement.addEventListener('input', this.onInput.bind(this));
        props.inputs.linkInput.inputElement.addEventListener('input', this.onInput.bind(this));
        props.inputs.textInput.inputElement.addEventListener('input', this.onInput.bind(this));
    }
}
