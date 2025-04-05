'use strict';

import { dispatcher } from './dispatcher';

export interface StoreEntry {
    key: string;
    value: any;
}

/**
 * Глобальное хранилище переменных
 */
class Store {
    private data: Record<string, any> = {};

    /**
     * Обновляет значение и рассылает его подписчикам
     * @param storeEntry - хранимое значение
     */
    public update(storeEntry: StoreEntry): void {
        this.data[storeEntry.key] = storeEntry.value;
        dispatcher.dispatch(`store-updated-${storeEntry.key}`, storeEntry.value);
    }

    /**
     * Получить значение по ключу
     * @param key - ключ хранимого значение
     * @returns 
     */
    public get(key: string): any {
        return this.data[key];
    }
}

const store = new Store;

export { store };
