'use strict';

import './page-review.scss';

import { Component } from '../../component';
import { Navbar } from '../navbar/navbar';
import { Button } from '../button/button';
import { UserAPI } from '../../api/userApi';
import { loadPath } from '../../modules/router';
import { CsatAPI } from '../../api/csatApi';

interface Review {
    page_id: string;
    question: string;
    rating: number;
    comment: string;
    created_at: string;
}

export class PageReview extends Component {
    constructor(parent: HTMLElement) {
        super(parent, 'page-review/page-review', {});
    }

    private async renderReviews(container: HTMLElement): Promise<void> {
        const response = await CsatAPI.getMyReviews();
        
        if (!response.body?.success) {
            container.innerHTML = '<p class="reviews-message">Не удалось загрузить отзывы</p>';
            return;
        }

        const reviews: Review[] = response.body.data;
        if (!reviews || reviews.length === 0) {
            container.innerHTML = '<p class="reviews-message">У вас пока нет отзывов</p>';
            return;
        }

        const reviewsList = document.createElement('div');
        reviewsList.className = 'reviews-list';

        reviews.forEach((review) => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review-item';

            const date = new Date(review.created_at).toLocaleDateString();
            const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

            reviewElement.innerHTML = `
                <div class="review-header">
                    <span class="review-page">${review.page_id}</span>
                    <span class="review-date">${date}</span>
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
        new Navbar(navbarContainer).render({ userAuthed: false, userRole: 'advertiser' });

        const reviewsContainer = this.rootElement.querySelector('.reviews-container') as HTMLElement;

        this.renderReviews(reviewsContainer);
    }
}