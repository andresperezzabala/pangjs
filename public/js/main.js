import {loadBackground, loadBalls, loadBuster, loadHookManager, loadImage, loadLevel} from "./loaders.js";
import Settings from "./Settings.js";
import {setupKeyboard} from "./input.js";
import {CollisionManager} from "./collisions.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");
Settings.SCREEN_HEIGHT = canvas.height;
Settings.SCREEN_WIDTH = canvas.width;

Promise.all([loadImage('./img/sprites.png'), loadImage('./img/hookRope.png'), loadImage('./img/backgrounds.png'),loadLevel('1')])
    .then( ([playerImage,hookImage,backgrounds,levelSpec]) => {
    const hooks = new Set();
    const hookManager = loadHookManager(hookImage, hooks);
    const drawBackground = loadBackground(backgrounds);
    const buster = loadBuster(playerImage, levelSpec.player);
    buster.setHookManager(hookManager);
    const balls = loadBalls(levelSpec.balls);

    let deltaTime = 0;
    let lastTime = 0;
    let collision;
    function update(time) {
        deltaTime = time - lastTime;
        drawBackground(context);
        buster.draw(context);
        buster.update(deltaTime/1000);
        balls.forEach( ball => {
            ball.draw(context);
            ball.update(deltaTime/1000);
        });
        hooks.forEach( hook => {
            hook.draw(context);
            hook.update(deltaTime/1000);
        });
        collision = new CollisionManager(hooks,balls);
        collision.checkCollisions();
        lastTime = time;
        requestAnimationFrame(update);
    }

    const input =  setupKeyboard(buster);
    input.listenTo(window);

    update(0);
});