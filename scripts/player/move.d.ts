import { Player } from "@minecraft/server";
import { EventSignal } from "../signal";

export interface PlayerMoveEvent {
    cancel: boolean;
    readonly player: Player;
}

export class PlayerMoveEventSignal extends EventSignal<PlayerMoveEvent> {
    private constructor();
}

export const playerMoveEvent: PlayerMoveEventSignal;