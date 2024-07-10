import { Player, system, world } from "@minecraft/server";
import { EventSignal } from "../signal";

export class PlayerFishEventSignal extends EventSignal {
    constructor() {
        super();
    }
}

export const playerFishEvent = new PlayerFishEventSignal();

let cache = null;
const fish = new Map();
world.afterEvents.entitySpawn.subscribe((ev) => {
    const { entity } = ev;
    if (entity.typeId === "minecraft:fishing_hook") {
        cache = entity;
        system.runTimeout(() => cache = null, 0);
    }
});

world.afterEvents.itemUse.subscribe((ev) => {
    const { source: player, itemStack } = ev;
    if (!(player instanceof Player)) return;
    if (itemStack.typeId === "minecraft:fishing_rod") {
        const entity = cache;
        if (entity) {
            const resolve = () => {
                system.clearRun(i);
                system.clearRun(t);
            }

            const i = system.runInterval(() => {
                if (!entity.isValid()) {
                    resolve();
                }
                else if (entity.isInWater) {
                    console.warn("Test");
                    fish.set(entity.id, player);
                    resolve();
                }
            }, 1);

            const t = system.runTimeout(() => {
                resolve();
            }, 20);
        }
    }
});

world.beforeEvents.entityRemove.subscribe((ev) => {
    const { removedEntity: entity } = ev;
    if (fish.has(entity.id)) {
        const player = fish.get(entity.id);
        
        const [fishedEntity] = entity.dimension.getEntities({ closest: 1, type: "minecraft:item", location: entity.location, maxDistance: 0.00001 });
        const fishedItemStack = fishedEntity ? fishedEntity.getComponent("item").itemStack : undefined;

        playerFishEvent.emit({ player, fishedEntity, fishedItemStack });
    
        fish.delete(entity.id);
    }
});
