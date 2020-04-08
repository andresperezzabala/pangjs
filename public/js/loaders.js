import SpriteSheet from "./SpriteSheet.js";
import Player from "./Player.js";
import {Vec2D} from "./math.js";
import Settings from "./Settings.js";

export function loadLevel(currentLevel) {
    return fetch('levels/' +  currentLevel + '.json').then(r => r.json());

}

export function loadImage(url){
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load',() => {
            resolve(image);
        });

        image.src = url;
    })
}

export function  loadBuster(image,playerSpec) {
    const spriteSheet = new SpriteSheet(image,32,32);
    spriteSheet.define('buster',0,0);
    spriteSheet.define('buster-1',1,0);
    spriteSheet.define('buster-2',2,0);
    spriteSheet.define('buster-3',3,0);

    const size = new Vec2D(32,32);
    const pos = new Vec2D(playerSpec.pos[0], playerSpec.pos[1]);

    return new Player(size,pos,spriteSheet);

}
