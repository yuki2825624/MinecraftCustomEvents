import { system, world } from "@minecraft/server";
import { EventSignal } from "../signal";

export class PlayerJumpEventSignal extends EventSignal {
    constructor() {
        super();
    }
}

export const playerJumpEvent = new PlayerJumpEventSignal();

const jump = new Set(), rollbacks = new Map();
system.runInterval(() => {
    for (const player of world.getPlayers()) {
        if (player.isJumping) {
            if (jump.has(player.id)) continue;
            jump.add(player.id);
            const arg = { player, cancel: false };
            playerJumpEvent.emit(arg);
            if (arg.cancel) {
                if (rollbacks.has(player.id)) rollbacks.get(player.id)();
            }
        }
        else {
            const dimension = player.dimension, location = player.location, rotation = player.getRotation();
            rollbacks.set(player.id, () => player.teleport(location, { dimension, rotation }));
            jump.delete(player.id);
        }
    }
}, 1);