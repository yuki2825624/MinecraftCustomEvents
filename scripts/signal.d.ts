export class EventSignal<T> {
    protected constructor();
    subscribe(callback: (arg: T) => void): (arg: T) => void;
    unsubscribe(callback: (arg: T) => void): void;
    emit(arg: T): void;
}
