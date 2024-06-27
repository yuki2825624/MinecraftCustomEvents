import { system } from "@minecraft/server";
import { EventSignal } from "./signal";

export class TickEventSignal extends EventSignal {
    constructor() {
        super();
    }
}

export const tickEvent = new TickEventSignal();

let currentTick = 0, lastTime = Date.now();
const deltaTimes = [];
system.runInterval(() => {
    const deltaTime = currentTick > 0 ? Date.now() - lastTime : 50;
    deltaTimes.push(deltaTime);
    if (deltaTimes.length > 20) deltaTimes.shift();

    const avgDeltaTime = deltaTimes.reduce((v, t) => v + t, 0) / deltaTimes.length;
    const tps = Math.round(1000 / avgDeltaTime * 100) / 100;

    const arg = { currentTick, deltaTime, tps };
    tickEvent.emit(arg);
    
    currentTick++;
    lastTime = Date.now();
}, 1);