import { EventSignal } from "./signal";

export interface TickEvent {
    currentTick: number;
    deltaTime: number;
    tps: number;
}

export class TickEventSignal extends EventSignal<TickEvent> {
    private constructor();
}

export const tickEvent: TickEventSignal;