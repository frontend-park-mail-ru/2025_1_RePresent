'use strict';

import './navbar\.scss';

import { Component } from '../../component';
import { LinkInner, LinkInnerProps } from '../link-inner/link-inner';

/**
 * Интерфейс для описания параметров компонента
 */
interface NavbarProps {
    userAuthed: boolean;
    userRole: 'advertiser' | 'platform';
}

/**
 * Строка навигации
 */
export class Navbar extends Component {
    protected props: NavbarProps;

    /**
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     */
    constructor(parent: HTMLElement) {
        super(parent, 'navbar/navbar', {});
    }

    /**
     * Отрисовка ссылок строки навигации
     * @param links - список ссылок
     */
    private renderPageLinks(links: LinkInnerProps[]): void {
        const pagesList = this.rootElement.getElementsByClassName('pages-list')[0] as HTMLElement;
        for (let link of links) {
            new LinkInner(pagesList).render(link);
        }
    }

    /**
     * Отрисовка зоны страниц
     */
    private renderPagesSection(): void {
        if (!this.props.userAuthed) {
            return;
        }

        if (this.props.userRole == 'advertiser') {
            this.renderPageLinks([{ label: 'Платформы', path: '/platforms' }, { label: 'Мои объявления', path: '/my-banners' }]);
            return;
        }

        if (this.props.userRole == 'platform') {
            this.renderPageLinks([{ label: 'Объявления', path: '/banners' }, { label: 'Интеграция', path: '/integration' }, { label: 'Мои партнеры', path: '/my-partners' }]);
        }
    }

    /**
     * Отрисовка зоны пользователя
     */
    private renderUserSection(): void {
        if (!this.props.userAuthed) {
            return;
        }

        const userSection = this.rootElement.getElementsByClassName('user-section')[0] as HTMLElement;
        new LinkInner(userSection).render({ label: 'Username', path: '/profile' });
    }

    /**
     * Отрисовка
     * @param {NavbarProps} props - параметры компонента
     */
    render(props: NavbarProps): void {
        super.render(props);

        this.renderPagesSection();
        this.renderUserSection();
    }
}
