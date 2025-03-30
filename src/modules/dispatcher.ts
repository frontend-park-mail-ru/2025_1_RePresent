'use strict';

type EventCallback<T = any> = (data: T) => void;

class EventDispatcher {
    private listeners: Map<string, Set<EventCallback>>;

    constructor() {
        this.listeners = new Map();
    }

    /**
     * Подписывает обработчик на событие.
     * @param event - Имя события.
     * @param callback - Обработчик события.
     */
    on<T>(event: string, callback: EventCallback<T>): void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)!.add(callback as EventCallback);
    }

    /**
     * Отписывает обработчик от события.
     * @param event - Имя события.
     * @param callback - Обработчик события.
     */
    off<T>(event: string, callback: EventCallback<T>): void {
        if (this.listeners.has(event)) {
            this.listeners.get(event)!.delete(callback as EventCallback);
        }
    }

    /**
     * Вызывает все обработчики для указанного события.
     * @param event - Имя события.
     * @param data - Данные, передаваемые в обработчики.
     */
    dispatch<T>(event: string, data?: T): void {
        if (this.listeners.has(event)) {
            this.listeners.get(event)!.forEach(callback => callback(data));
        }
    }

    /**
     * Удаляет все обработчики для указанного события.
     * @param event - Имя события.
     */
    clear(event: string): void {
        if (this.listeners.has(event)) {
            this.listeners.delete(event);
        }
    }

    /**
     * Удаляет все обработчики для всех событий.
     */
    clearAll(): void {
        this.listeners.clear();
    }
}

const dispatcher = new EventDispatcher;

export { dispatcher };
