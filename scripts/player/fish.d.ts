import { Entity, ItemStack, Player } from "@minecraft/server";
import { EventSignal } from "../signal";

export interface PlayerFishEvent {
    readonly player: Player;
    readonly fishedEntity?: Entity;
    readonly fishedItemStack?: ItemStack;
}

export class PlayerFishEventSignal extends EventSignal<PlayerFishEvent> {
    private constructor();
}

export const playerFishEvent: PlayerFishEventSignal;

