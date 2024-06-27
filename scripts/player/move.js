import { system, world } from "@minecraft/server";
import { EventSignal } from "../signal";

export class PlayerMoveEventSignal extends EventSignal {
    constructor() {
        super();
    }
}

export const playerMoveEvent = new PlayerMoveEventSignal();

const move = new Map(), rollbacks = new Map();
system.runInterval(() => {
    for (const player of world.getPlayers()) {
        if (move.has(player.id)) {
            const { x, y, z } = player.location;
            const { x: mx, y: my, z: mz } = move.get(player.id);
            const equals = (a, b) => a.toFixed(1) == b.toFixed(1);
            if (!(equals(x, mx) && equals(y, my) && equals(z, mz))) {
                const arg = { player, cancel: false };
                playerMoveEvent.emit(arg);
                if (arg.cancel) {
                    if (rollbacks.has(player.id)) rollbacks.get(player.id)();
                }
            }
            else {
                const dimension = player.dimension, location = player.location, rotation = player.getRotation();
                rollbacks.set(player.id, () => player.teleport(location, { dimension, rotation }));
            }
        }
        move.set(player.id, player.location);
    }
}, 1);