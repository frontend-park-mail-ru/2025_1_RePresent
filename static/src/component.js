'use strict';

/**
 * Базовый класс компонентов DOM
 */
export class Component {
    parent;
    props;
    rootElement;

    #isRendered = false;
    #template;

    /**
     * Сделать parent read-only
     * @param {any} _
     */
    set parent(_) {
        throw new Error('parent is read-only');
    }

    /**
     * Сделать props read-only
     * @param {any} _
     */
    set props(_) {
        throw new Error('props is read-only');
    }

    /**
     * Сделать rootElement read-only
     * @param {any} _
     */
    set rootElement(_) {
        throw new Error('rootElement is read-only');
    }

    /**
     * Обобщенный конструктор компонента
     * @param {Node} parent - родительский узел компонента
     * @param {string} templateName - имя шаблона компонента
     * @param {Object} props - параметры компонента
     */
    constructor(parent, templateName, props) {
        this.parent = parent;
        this.#template = Handlebars.templates[templateName];
        this.props = props;
    }

    /**
     * Отрисовать впервые или перерисовать компонент на странице
     * Следует вызывать в начале функции при ее переопределении
     * @param {?Object} props - параметры компонента
     */
    render(props) {
        if (props) {
            this.props = props;
        }
        const elementHTML = this.#template(props);
        const elDocument = new DOMParser().parseFromString(elementHTML, 'text/html');
        if (elDocument.body.childElementCount != 1) {
            throw new Error('Template should have one root node');
        }
        const element = elDocument.body.children[0];

        if (this.#isRendered) {
            this.rootElement.replaceWith(element);
            this.rootElement = element;
            return;
        }

        this.parent.insertAdjacentElement('beforeend', element);
        this.rootElement = element;
        this.#isRendered = true;
    }
}
