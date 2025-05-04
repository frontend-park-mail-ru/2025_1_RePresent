'use strict';

import { Slot, SlotAPI } from '../../api/slotApi';
import { dispatcher } from '../../modules/dispatcher';
import { store } from '../../modules/store';
import { bannerTitleGetError, perShowGetError } from '../../modules/validation';
import { Form, FormProps } from '../form/form';
import { InputField } from '../input-field/input-field';
import { InputSwitch } from '../input-switch/input-switch';

/**
 * Форма параметров слота
 */
export class FormSlotEditorOptions extends Form {
    private selectedSlot: Slot;

    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent);

        dispatcher.on('store-updated-chosenSlot', this.render.bind(this));
    }

    /**
     * Обработчик нажатия на кнопку отправки формы
     */
    private async onSubmit(): Promise<void> {
        const inputs = this.props.inputs;

        this.selectedSlot.slot_name = inputs.name.getValue();
        this.selectedSlot.is_active = inputs.isActive.getValue();
        this.selectedSlot.beingCreated = false;

        if (this.selectedSlot.beingCreated) {
            await SlotAPI.create(this.selectedSlot);
            dispatcher.dispatch('slot-create', this.selectedSlot);
        } else {
            await SlotAPI.update(this.selectedSlot);
            dispatcher.dispatch('slot-update', this.selectedSlot.link);
        }
    }

    /**
     * Отрисовка
     */
    public render(): void {
        const selectedSlot = store.get<Slot>('selectedSlot');
        this.selectedSlot = selectedSlot;

        const props: FormProps = { inputs: {}, submitLabel: 'Сохранить', onSubmit: this.onSubmit.bind(this), className: 'form-block' };

        super.renderRoot(props);

        const root = this.rootElement;

        props.inputs = {
            name: new InputField(root, {
                type: 'text',
                label: 'Название',
                name: 'name',
                placeholder: 'Введите название',
                default: selectedSlot.slot_name,
                getError: bannerTitleGetError,
            }),
            perShow: new InputField(root, {
                type: 'text',
                label: 'Минимальная стоимость показа объявления, руб.',
                name: 'per-show',
                placeholder: 'Введите стоимость',
                default: selectedSlot.min_price,
                getError: perShowGetError,
            }),
            isActive: new InputSwitch(root, {
                name: 'is-active',
                label: 'Активно',
                checked: selectedSlot.is_active,
            }),
            // filterMen: new InputSwitch(root, {
            //     name: 'filter-men',
            //     label: 'Для мужчин',
            //     checked: true,
            // }),
            // filterWomen: new InputSwitch(root, {
            //     name: 'filter-women',
            //     label: 'Для женщин',
            //     checked: true,
            // }),
            // filterMature: new InputSwitch(root, {
            //     name: 'filter-mature',
            //     label: 'Для совершеннолетних',
            //     checked: true,
            // }),
        };

        super.renderFull(props);

        // const isActive = props.inputs.isActive.getRootElement();
        // isActive.insertAdjacentHTML('afterend', '<h2 class="filters-title">Фильтры</h2>');
    }
}
