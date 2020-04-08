import {Object2D, Vec2D} from "./math.js";
import Settings from "./Settings.js";

const  frame = ['buster','buster-1','buster-2','buster-3']

export default class Player extends Object2D {

    routeFrame(){
        if (this.direction.x != 0){
            const frameIndex = Math.floor(this.distance/10) % frame.length;
            const frameName = frame[frameIndex];
            return frameName;
        }

        return 'buster';
    }

    constructor(size, pos, spriteSheet) {
        super(size, pos);
        this.force = new Vec2D(0, 0);
        this.spriteSheet = spriteSheet;
        this.direction = new Vec2D(0,0);
        this.distance = 0;

    }

    // time respresenta el tiempo que ha pasado desde la última ejecución
    update(time) {

        if (this.direction.x != 0){
            this.distance += Settings.PLAYER_SPEED * time;
        }else{
            this.distance = 0;
        }
        /*
        Asume por el momento que Settings.SCREEN_HEIGHT y Settings.SCREEN_WIDTH indican el tamaño de
        la pantalla del juego. Settings tiene otras constantes definidas (échales un vistazo)
        El objeto player tiene una altura (height) y una anchura (width)
         */


        // si buster está cayendo (está por debajo de la altura de la pantalla)
        if (this.y < Settings.SCREEN_HEIGHT){
            // fuerza = añadir fuerza vertical de gravedad * tiempo
            this.force.add(Settings.GRAVITY*time);
            // position = añadir fuerza * tiempo al eje y
            this.position.y += this.force.y * time;
        }


        // position = añadir dirección * tiempo * velocidad del jugador al eje x
        this.position.x += this.direction.x * time * Settings.PLAYER_SPEED;

        // si buster se sale por la izquierda de la pantalla

        if (this.position.x < 0) {
            // position = 0,y
            this.position.x = 0;
        // sino, si buster se sale por la derecha
        }else if(this.position.x > Settings.SCREEN_WIDTH - this.size.x){
            // position =  lo más a la derecha sin salirse , y
            this.position.x = Settings.SCREEN_WIDTH - this.size.x;
        }

        // si buster se sale por la parte inferior de la pantalla
        // position = x, lo más abajo sin salirse
        if (this.y > Settings.SCREEN_HEIGHT - this.size.y) this.position.y = Settings.SCREEN_HEIGHT - this.size.y;

    }

    draw(context) {
        // pintar this.sprite en el contexto (en posicion x,y)
        context.drawImage(this.spriteSheet.get(this.routeFrame()),this.x,this.y);
    }
}