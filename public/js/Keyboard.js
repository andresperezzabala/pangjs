const PRESSED = 1;
const RELEASED = 0;

export class Keyboard {
    constructor(){
        //guarda el estado de cada tecla
        this.keyStates = new Map();
        //guarda el callback de cada tecla
        this.keyMap = new Map();
    }

    addMapping(keyCode,callbak){
        this.keyMap.set(keyCode,callbak);
    }

    handleEvent(event){
        const {code} = event;
        if(!this.keyMap.has(code)){
            return;
        }
        event.preventDefault();
        /*
        function keyStateS(e){
            if (e === 'keydown'){
                return PRESSED;
            }else{
                return RELEASED;
            }
        }

        const keyState = keyStateS(event.type);
        */
        const keyState = event.type === 'keydown' ? PRESSED: RELEASED;

        if (this.keyStates.get(code) === keyState){
            return;
        }

        this.keyStates.set(code,keyState);

        if (event.type !== 'keyup'){
            this.keyMap.get(code)(keyState);
            console.log(this.keyStates);
        }
    }

    listenTo(window){
        ['keydown','keyup'].forEach( eventName => {
            window.addEventListener(eventName, event => {
                this.handleEvent(event)
            });
        });
    }
}