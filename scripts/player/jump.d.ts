import { Player } from "@minecraft/server";
import { EventSignal } from "../signal";

export interface PlayerJumpEvent {
    cancel: boolean;
    readonly player: Player;
}

export class PlayerJumpEventSignal extends EventSignal<PlayerJumpEvent> {
    private constructor();
}

export const playerJumpEvent: PlayerJumpEventSignal;

