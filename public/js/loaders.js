import SpriteSheet from "./SpriteSheet.js";
import Player from "./Player.js";
import {Vec2D} from "./math.js";
import Settings from "./Settings.js";

export function loadImage(url){
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load',() => {
            resolve(image);
        });

        image.src = url;
    })
}

export function  loadBuster(image) {
    const spriteSheet = new SpriteSheet(image,32,32);
    spriteSheet.define('buster',0,0);

    const size = new Vec2D(32,32);
    const pos = new Vec2D(Settings.SCREEN_WIDTH/2 - size.x, Settings.SCREEN_HEIGHT - size.y);

    return new Player(size,pos,spriteSheet.get('buster'));

}
