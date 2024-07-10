import { playerFishEvent } from "./scripts/player/fish";
import { playerJumpEvent } from "./scripts/player/jump";
import { playerLandEvent } from "./scripts/player/land";
import { playerMoveEvent } from "./scripts/player/move";
import { tickEvent } from "./scripts/tick";

// TickEvent
tickEvent.subscribe((ev) => {
    const { tps } = ev;
    if (tps < 10) {
        console.warn("TPSが極端に低下しています。");
    }
});

playerFishEvent.subscribe((ev) => {
    const { player, fishedItemStack } = ev;
    player.sendMessage(`${fishedItemStack.typeId}を釣り上げた！`);
});

// JumpEvent
playerJumpEvent.subscribe((ev) => {
    const { player } = ev;
    if (!player.isOnGround) {
        player.applyKnockback(0, 0, 0, 1);
    }
});

// LandEvent
playerLandEvent.subscribe((ev) => {
    const { player, fallDistance } = ev;
    player.sendMessage(`${fallDistance.toFixed(2)}ブロック落下しました。`);
});

// MoveEvent
playerMoveEvent.subscribe((ev) => {
    const { player } = ev;
    if (!player.hasTag("movable")) {
        ev.cancel = true;
        player.sendMessage("移動が許可されていません。");
    }
});