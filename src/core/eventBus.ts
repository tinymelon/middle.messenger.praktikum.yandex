export type Listener<T extends unknown[] = any[]> = (...arguments_: T) => void;

export default class EventBus<E extends string = string, M extends {[K in E]: unknown[]} = Record<E, any[]>> {
   private listeners: {[key in E]?:Listener<M[E]>[]} = {};

    on(event: E, callback: Listener<M[E]>) {
        if (!this.listeners[event]) this.listeners[event] = [];

        this.listeners[event]!.push(callback);
    }

    off(event: E, callback: Listener<M[E]>) {
        if (!this.listeners[event]) {
            throw new Error(`Нет подписок на событие ${event}`)
        }

        this.listeners[event] = this.listeners[event]!.filter(listener => listener !== callback);
    }

    emit(event: E, ...arguments_: M[E]) {
        if (!this.listeners[event]) {
            throw new Error(`Нет подписок на событие ${event}`)
        }

        for (const listener of this.listeners[event]!) listener(...arguments_);
    }
}
