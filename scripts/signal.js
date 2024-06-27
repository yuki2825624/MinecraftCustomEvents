export class EventSignal {
    constructor() {
        this._events = [];
    }

    subscribe(callback) {
        this._events.push(callback);
        return callback;
    }

    unsubscribe(callback) {
        const index = this._events.indexOf(callback);
        console.warn("unsubscribe:", index);
        if (index != -1) this._events.splice(index, 1);
    }

    emit(arg) {
        for (const callback of this._events) {
            callback(arg);
        }
    }
}