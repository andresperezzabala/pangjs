import {Vec2D} from "./math.js";
import {Object2D} from "./math.js";
import Settings from "./Settings.js";
let HookType = {
    rope: 0,
    chain: 1,
};

class Hook extends Object2D {

    constructor(height, position, hook_type, buffer) {
        super(new Vec2D(6, height), position);
        this.hook_type = hook_type;
        this.expand = true;
        this.timer = Settings.HOOK_DURATION;
        this.buffer = buffer;
    }

    draw(ctx){
        // pintar el hook de buffer en la posición x,y de este objeto
        ctx.drawImage(this.buffer, this.x, this.y);
    }

    update(time_passed) {
        // si el hook no está en expansión -> decrementa el timer en time_passed unidades.
        if (this.expand !== true)  this.timer -= time_passed;
        // Si el timer es < 0 --> to_kill = true
        if (this.timer < 0) this.to_kill = true;
        // si está en expansión y subiendo, incrementar tamaño y posición en increment unidades
        if (this.expand === true) {
            let increment = Settings.HOOK_SPEED * time_passed;
            this.size.add(new Vec2D(0,increment));
            this.position.y -= increment;
        }
        // si sube hasta arriba, marcarlo para eliminar si es de tipo rope....
        // o marcarlo para que quede enganchado si es de tipo chain (reset de size 0 y position altura 0)
        if (this.position.y <= 0){
            if (this.hook_type === HookType.rope){
                this.expand = false;
                this.to_kill = true;
                this.position.y = 0;
            }
        else if (this.hook_type === HookType.chain) {
                this.expand = false;
                this.size.y = 0;
                this.position.y = 0;
            }
        }
    }

}

export {HookType, Hook};