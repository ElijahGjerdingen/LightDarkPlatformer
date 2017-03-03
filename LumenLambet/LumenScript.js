//Lumen code
const ARROW_KEY_Up = 56;
const ARROW_KEY_Down = 53;
const ARROW_KEY_Left = 54;
const ARROW_KEY_Right = 55;

var leftkeydown = false;
var rightkeydown = false;
var upkeydown = false;
var downkeydown = false;

var lumen;

/*
lumenData = {
    images: ["/LumenLambet/SpriteSheet.png"],
    frames: { width: 400, height: 400, spacing: 1, count: 7, margin: 1 },
    animations: {
        stand: 0,
        walk: [1, 4]
    }
}

function initLumen() {
    goingRight = true;
    grounded = true;

    stage = new createjs.Stage("canvas");

    //lumen = new createjs.Bitmap(lumenImage);
    //lumen.x = 25; lumen.y = 25;
    //stage.addChild(lumen);

    var spritesheet = new createjs.SpriteSheet(lumenData);

    lumen_stand = new createjs.Sprite(spritesheet);
    lumen_stand.x = 25; lumen_stand.y = 75;

    lumen_walk = new createjs.Sprite(spritesheet, 'walk');
    lumen_walk.addEventListener("change", walk);
    lumen_walk.x = 25; lumen_walk.y = 125;

    stage.addChild(lumen_stand, lumen_walk);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", run);

    window.onkeyup = handleKeyUp;
    window.onkeydown = handleKeyDown;

    stage.update();
}*/

function walk(e) {

}

function run(e) {
  /*  if (leftkeydown) {
        goingRight = false;
        lumen.x -= 10;
    }
    if (rightkeydown) {
        goingRight = true;
        lumen.x += 10;
    }
    if (upkeydown) {
        if (grounded) {
            jump();
        }
    }
*/    stage.update();
}



function jump(e) {
    grounded = false;
    if (goingRight) {
        lumen.y += 10;
        lumen.x += 5;
    } else {
        lumen.y += 10;
        lumen.x -= 5;
    }
    grounded = true;
}

function handleKeyDown(e) {
    switch (e.keyCode) {
        case ARROW_KEY_Left: leftkeydown = true; break;
        case ARROW_KEY_Right: rightkeydown = true; break;
        case ARROW_KEY_Up: upkeydown = true; break;
        case ARROW_KEY_Down: downkeydown = true; break;
    }
}

function handleKeyUp(e) {
    switch (e.keyCode) {
        case ARROW_KEY_Left: leftkeydown = false; break;
        case ARROW_KEY_Right: rightkeydown = false; break;
        case ARROW_KEY_Up: upkeydown = false; break;
        case ARROW_KEY_Down: downkeydown = false; break;
    }
}