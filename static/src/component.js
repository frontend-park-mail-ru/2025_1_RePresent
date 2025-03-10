'use strict';

/**
 * Базовый класс компонентов DOM
 */
export class Component {
    /**
     * Обобщенный конструктор компонента
     * @param {Node} parent - родительский узел компонента
     */
    constructor(parent) {
        this.parent = parent;
    }
}
