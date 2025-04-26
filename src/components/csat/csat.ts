'use strict';

import './csat.scss';

import { Component } from '../../component';
import { InputField } from '../input-field/input-field';
import { Button } from '../button/button';
import { csatCommentGetError } from '../../modules/validation';
import { CsatAPI } from '../../api/csatApi';

interface CsatProps {
    page: string;
}

/**
 * Customer satisfaction
 */
export class CSAT extends Component {
    private commentInput: InputField;
    private errorElement: HTMLElement;
    private page: string;
    private question: string;
    private rating: number | null = null;

    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'csat/csat', {});
    }

    /**
     * Обработчик клика на звезду
     * @param event - событие клика
     */
    private starOnClick(event: Event) {
        const star = <HTMLElement>event.currentTarget;
        this.rating = +star.dataset['rating'];

        const selectedClass = 'csat__star_selected';
        this.rootElement.querySelectorAll('.csat__star').forEach((star: HTMLElement) => {
            star.classList.remove(selectedClass);
        });
        star.classList.add(selectedClass);

        this.ratingHideError();
    }

    /**
     * Провалидировать поля и отправить отзыв
     */
    private async submitReview() {
        if (this.rating === null) {
            this.ratingShowError('Поставьте оценку');
            return;
        }
        if (!this.commentInput.validate()) {
            return;
        }

        const comment = <string>this.commentInput.getValue();
        CsatAPI.submitReview({
            page_id: this.props.page,
            question: this.question,
            rating: this.rating,
            comment,
        });
    }

    /**
     * Показать сообщение об ошибке оценки
     * @param {string} errorMsg - сообщение об ошибке
     */
    private ratingShowError(errorMsg: string): void {
        this.errorElement.innerText = errorMsg;
        this.errorElement.classList.add('csat__error-msg_show');
    }

    /**
     * Спрятать сообщение об ошибке оценки
     */
    private ratingHideError(): void {
        this.errorElement.classList.remove('csat__error-msg_show');
    }

    /**
     * Отобразит элемент, если опрос доступен
     */
    private async tryShow(): Promise<void> {
        const response = await CsatAPI.getQuestion(this.props.page);
        if (response.service.error) {
            return;
        }
        this.question = response.body;

        const innerProps = {
            page: this.page,
            question: this.question,
            stars: [1, 2, 3, 4, 5],
        };
        super.render(innerProps);

        this.errorElement = this.rootElement.querySelector('.csat__error-msg');

        this.commentInput = new InputField(this.rootElement, {
            name: 'comment',
            type: 'text',
            placeholder: 'Ваши предложения',
            getError: csatCommentGetError,
        });
        this.commentInput.render();

        const submitButton = new Button(this.rootElement);
        submitButton.render({
            label: 'Отправить',
            type: 'primary',
            onClick: this.submitReview.bind(this),
        });

        this.rootElement.querySelectorAll('.csat__star').forEach((star: HTMLElement) => {
            star.onclick = this.starOnClick.bind(this);
        });
    }

    /**
     * Отрисовка
     * @param {CsatProps} props - параметры компонента
     */
    public render(props: CsatProps): void {
        this.page = props.page;
        this.tryShow();
    }
}
