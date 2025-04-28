'use strict';

import './page-reviews.scss';

import { Component } from '../../modules/component';
import { Navbar } from '../navbar/navbar';
import { CsatAPI, CsatReview } from '../../api/csatApi';
import { Button } from '../button/button';
import { loadPath } from '../../modules/router';

export class PageReviews extends Component {
    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'page-reviews/page-reviews', {});
    }

    /**
     * Отрисовать отзывы
     * @param {HTMLElement} container - контейнер для отзывов
     */
    private async renderReviews(container: HTMLElement): Promise<void> {
        const response = await CsatAPI.getAllReviews();

        if (!response.service.success) {
            container.innerHTML = '<p class="reviews-message">Не удалось загрузить отзывы</p>';
            return;
        }

        const reviews: CsatReview[] = response.body;

        reviews.forEach((review) => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review-item';

            const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

            reviewElement.innerHTML = `
                <div class="review-question">${review.question}</div>
                <div class="review-rating">${stars}</div>
                ${review.comment ? `<div class="review-comment">${review.comment}</div>` : ''}
            `;

            container.appendChild(reviewElement);
        });
    }

    /**
     * Отрисовка страницы
     */
    public render(): void {
        super.render();

        const navbarContainer = this.rootElement.querySelector('.navbar-container') as HTMLElement;
        new Navbar(navbarContainer).render({ userAuthed: true, userRole: 'advertiser' });

        const reviewsContainer = this.rootElement.querySelector('.reviews-container') as HTMLElement;

        this.renderReviews(reviewsContainer);

        const headerBar = this.rootElement.querySelector('.header-bar') as HTMLElement;
        const profileButton = new Button(headerBar);
        profileButton.render({
            label: 'Профиль',
            type: 'neutral',
            onClick: () => {
                loadPath('/profile');
            },
        });
    }
}
