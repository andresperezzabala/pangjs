import {Keyboard} from "./Keyboard.js";

export function setupKeyboard(buster) {
    const input = new Keyboard();
    input.addMapping('Space',keyState =>{
        buster.shoot();
    });
    input.addMapping('ArrowDown',keyState=>{

    });
    input.addMapping('ArrowLeft',keyState=>{
        buster.direction.x = -1 * keyState;
    });
    input.addMapping('ArrowRight',keyState=>{
        buster.direction.x = keyState;
    });
    input.addMapping('ArrowUp',keyState=>{

    });

    return input;
}