export class EventEmitter {

    private _eventsMap: { [key: string]: Set<Function> } = {};

    private _getEventListenersByName(eventName: string): Set<Function> {
        if (typeof this._eventsMap[eventName] === 'undefined') {

            this._eventsMap[eventName] = new Set();
        }

        return this._eventsMap[eventName];
    }

    on(eventName: string, fn: Function): void {

        this._getEventListenersByName(eventName).add(fn);
    }

    once(eventName: string, fn: Function): void {

        const onceFn = (...args) => {
            this.removeListener(eventName, onceFn);
            fn.apply(this, args)
        };

        this.on(eventName, onceFn);
    }

    emit(eventName: string, ...args): void {

        this._getEventListenersByName(eventName).forEach((fn) => {
            fn.apply(this, args);
        });
    }

    removeListener(eventName: string, fn: Function): void {
        this._getEventListenersByName(eventName).delete(fn);
    }
}