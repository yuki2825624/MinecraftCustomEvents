import { Player } from "@minecraft/server";
import { EventSignal } from "../signal";

export interface PlayerLandEvent {
    readonly player: Player;
    readonly fallDistance: number;
}

export class PlayerLandEventSignal extends EventSignal<PlayerLandEvent> {
    private constructor();
}

export const playerLandEvent: PlayerLandEventSignal;