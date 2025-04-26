'use strict';

import './page-review.scss';

import { Component } from '../../component';
import { Navbar } from '../navbar/navbar';
import { CsatAPI, CsatReview } from '../../api/csatApi';

export class PageReview extends Component {
    constructor(parent: HTMLElement) {
        super(parent, 'page-review/page-review', {});
    }

    private async renderReviews(container: HTMLElement): Promise<void> {
        const response = await CsatAPI.getMyReviews();

        if (!response.service.success) {
            container.innerHTML = '<p class="reviews-message">Не удалось загрузить отзывы</p>';
            return;
        }

        const reviews: CsatReview[] = response.body.reviews;
        if (!reviews || reviews.length === 0) {
            container.innerHTML = '<p class="reviews-message">У вас пока нет отзывов</p>';
            return;
        }

        const reviewsList = document.createElement('div');
        reviewsList.className = 'reviews-list';

        reviews.forEach((review) => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review-item';

            const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

            reviewElement.innerHTML = `
                <div class="review-header">
                    <span class="review-page">${review.page_id}</span>
                </div>
                <div class="review-question">${review.question}</div>
                <div class="review-rating">${stars}</div>
                ${review.comment ? `<div class="review-comment">${review.comment}</div>` : ''}
            `;

            reviewsList.appendChild(reviewElement);
        });

        container.innerHTML = '';
        container.appendChild(reviewsList);
    }

    public render(): void {
        super.render();

        const navbarContainer = this.rootElement.querySelector('.navbar-container') as HTMLElement;
        // new Navbar(navbarContainer).render({ userAuthed: false, userRole: 'advertiser' });

        const reviewsContainer = this.rootElement.querySelector('.reviews-container') as HTMLElement;

        this.renderReviews(reviewsContainer);
    }
}
