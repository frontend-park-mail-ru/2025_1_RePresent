'use strict';

import * as Handlebars from 'handlebars/runtime';
import './hbs-precompiled';

/**
 * Тип параметров компонента
 */
export type Props = Record<string, any>;

/**
 * Базовый класс компонентов DOM
 */
export class Component {
    protected parent: HTMLElement;
    protected rootElement: HTMLElement;
    protected props: Props;

    private isRendered: boolean = false;
    private template: (context?: any) => string;

    /**
     * Метод для чтения parent
     * @returns {HTMLElement} - родитель компонента
     */
    getParent(): HTMLElement {
        return this.parent;
    }

    /**
     * Метод для чтения rootElement
     * @returns {HTMLElement} - тег корень компонента
     */
    getRootElement(): HTMLElement {
        return this.rootElement;
    }

    /**
     * Метод для чтения props
     * @returns {Props} - параметры компонента
     */
    getProps(): Props {
        return this.props;
    }

    /**
     * Обобщенный конструктор компонента
     * @param {HTMLElement} parent - родительский узел компонента
     * @param {string} templateName - имя шаблона компонента
     * @param {Props} props - параметры компонента
     */
    constructor(parent: HTMLElement, templateName: string, props: Props) {
        this.parent = parent;
        this.template = Handlebars.templates[templateName];
        this.props = props;
    }

    /**
     * Отрисовать впервые или перерисовать компонент на странице
     * Следует вызывать в начале функции при ее переопределении
     * @param {?Props} props - параметры компонента
     */
    render(props?: Props): void {
        this.props = props || this.props;

        const elementHTML = this.template(this.props);
        const elDocument = new DOMParser().parseFromString(elementHTML, 'text/html');

        if (elDocument.body.childElementCount !== 1) {
            throw new Error('Template should have one root node');
        }

        const HTMLElement = elDocument.body.children[0] as HTMLElement;

        if (this.isRendered) {
            this.rootElement.replaceWith(HTMLElement);
            this.rootElement = HTMLElement;
            return;
        }

        this.parent.insertAdjacentElement('beforeend', HTMLElement);
        this.rootElement = HTMLElement;
        this.isRendered = true;
    }
}
