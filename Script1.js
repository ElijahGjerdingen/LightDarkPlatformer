// JavaScript source code
var stage;
var meter = 100;
var preload

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

function load() {
    preload = new createjs.loadQueue(true);
    preload.installPlugin(createjs.Sound);
    createjs.sound.alternateExtensions = ["ogg"]; // <- switch this to alternate musical file type
    preload.addEventListner("complete", init);

    preload.loadManifest
    ([
        { id: "LBackground", src: "/Scene/LightBackground.png" },
        { id: "DBackground", src: "/Scene/DBackground.png" },
        { id: "PlayerSprite", src: "/LumenLambent/Lumen" },
        { id: "LGround", src: "/Scene/LGround.png" },
        { id: "DGround", src: "/Scene/DGround.png" },
        { id: "Lamp", src: "/Scene/Lamp.png" },
        { id: "LMusic", src: "/Scene/LMusic.png" },
        { id: "DMusic", src: "/Scene/DMusic.png" },
        { id: "placeHolder", src: "/Scene/placeHolder.png" }
    ]);
    preload.Load();
}

function init() {
    stage = new createjs.Stage("canvas");

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", run);

    var background = new createjs.Bitmap(preload.getResult("LBackground"));
    background.setTransform(0, 0, 1, 1);
    stage.addChild(background);

    lumen = new createjs.Shape(new createjs.Graphics().beginFill("gold").drawCircle(0, 0, 30));

    createjs.Sound.play("LMusic", createjs.Sound.INTERUPT_NONE, 0, 0, -1, .5, 0);
    
    goingRight = true;
    grounded = true;

    window.onkeyup = handleKeyUp;
    window.onkeydown = handleKeyDown;
    createBlocks();
    stage.update();
}

function createBlocks() {
    //var block1 = new createjs.Shape(new createjs.Graphics().beginFill("green").drawRect(100, 100, 50, 200));
    var x = 100;
    var y = 100;
    var platform = new Bitmap(preload.getResult("placeHolder"));
    platform.x = x;
    platform.y = y;
    stage.addChild(platform);
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
    grounded = true; // <- this may be in the wrong place but it is 12:00 and I am tired xD
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