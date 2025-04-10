'use strict';

import { dispatcher } from './dispatcher';

/**
 * Тип значения, хранящегося в Store
 */
type ValueT = any;

export interface StoreEntry {
    key: string;
    value: ValueT;
}

/**
 * Глобальное хранилище переменных
 */
class Store {
    private data: Record<string, ValueT> = {};

    /**
     * Обновляет значение и рассылает его подписчикам
     * @param {StoreEntry} storeEntry - хранимое значение
     */
    public update(storeEntry: StoreEntry): void {
        this.data[storeEntry.key] = storeEntry.value;
        dispatcher.dispatch(`store-updated-${storeEntry.key}`, storeEntry.value);
    }

    /**
     * Получить значение по ключу
     * @param {string} key - ключ хранимого значение
     * @returns {ValueT} - значение
     */
    public get<ValueT>(key: string): ValueT {
        return this.data[key];
    }
}

const store = new Store;

export { store };
