import { system, world } from "@minecraft/server";
import { EventSignal } from "../signal";

export class PlayerLandEventSignal extends EventSignal {
    constructor() {
        super();
    }
}

export const playerLandEvent = new PlayerLandEventSignal();

const land = new Set(), fallDistances = new Map();
system.runInterval(() => {
    for (const player of world.getPlayers()) {
        if (player.isOnGround) {
            if (land.has(player.id)) continue;
            land.add(player.id);
            const fallDistance = fallDistances.get(player.id);
            if (fallDistance > 0) {  
                const arg = { player, fallDistance };
                playerLandEvent.emit(arg);
            }
        }
        else {
            fallDistances.set(player.id, player.fallDistance);
            land.delete(player.id);
        }
    }
}, 1);