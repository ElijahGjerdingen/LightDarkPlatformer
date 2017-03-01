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
var goingRight = false;
var grounded = false;

function load()
{
    preload = new createjs.LoadQueue(true);
    preload.installPlugin(createjs.Sound);
    createjs.Sound.alternateExtensions = ["ogg"];
    preload.addEventListener("complete", init);

    preload.loadManifest([
        { id: "PlayerSprite", src: "/LumenLambent/Lumen" },
        { id: "", src: ""}
    ]);

    init();
}

function init() {
    goingRight = true;
    grounded = true;

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", run);

    window.onkeyup = handleKeyUp;
    window.onkeydown = handleKeyDown;
}

function run(e) {
    if (leftkeydown) {
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
    if (downkeydown) {

    }
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