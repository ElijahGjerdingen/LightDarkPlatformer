// JavaScript source code
var stage;
var meter = 100;
var platform = [];
var lumenPlaceholder;
var backgroundContainer;
var darkBackgroundContainer;
var backgroundContainer2;
var darkBackgroundContainer2;
var light;
var timeOfTick;
//Lumen
const ARROW_KEY_Up = 87;
const ARROW_KEY_Down = 83;
const ARROW_KEY_Left = 65;
const ARROW_KEY_Right = 68;
var leftkeydown = false;
var rightkeydown = false;
var upkeydown = false;
var lumen;
var lumenWalk;
var lumenJump;
var moving;
//Janus
var janus = [];
var janusD = [];
var image;
var lumenSpriteSheet;
var lightSpriteSheet;
var lightSprite;
var goingRight = false;
var grounded = false;
var insText = new createjs.Text("Use the WASD keys to move.", "35px Arial", "black");
var insText2 = new createjs.Text("Watch out for angry ghosts.", "35px Arial", "black");
var insText3 = new createjs.Text("Get to the light!", "35px Arial", "black");
var loseText = new createjs.Text("GAME OVER", "200px Arial", "pink");
var winText = new createjs.Text("YOU WIN", "200px Arial", "pink");
var camera = {
    x: 0,
    y: 0,
    zoom: 1
}
var madWorld;
var rainbow;
var size = 45 * camera.zoom;
var Container = createjs.Container;
var cameraContainer = new Container();
var platformBounds = [];
var lumenBounds;
var jBounds = [];
var jDBounds = [];
var grav = 2;
var lumenHeight;
var lumenWidth;
var janusWidth;
var thisisAChange = 0;

function load() {
    preload = new createjs.LoadQueue(true);
    preload.installPlugin(createjs.Sound);
    preload.addEventListener("complete", init);

    preload.loadManifest([
        { id: "LBackground", src: "/Scene/Sky.png" },
        { id: "Mountains", src: "/Scene/Backhill.png" },
        { id: "Trees", src: "/Scene/Trees.png" },
        { id: "DBackground", src: "/Scene/SkyDark.png" },
        { id: "LGround", src: "/Scene/GroundLayer.png" },
        { id: "DGround", src: "/Scene/GroundLayerDark.png" },
        /*{ id: "Lamp", src: "/Lamp.png" },
        { id: "LMusic", src: "/LMusic.png" },
        { id: "DMusic", src: "/DMusic.png" },*/
        { id: "SLPlatform", src: "/Scene/ShortFloatPlatform.png" },
        { id: "LLPlatform", src: "/Scene/LongFloatPlatform.png" },
        { id: "SDPlatform", src: "/Scene/ShortFloatDark.png" },
        { id: "LDPlatform", src: "/Scene/LongFloatDark.png" },
        { id: "DarkTrees", src: "/Scene/TreesDark.png" },
        { id: "DarkMountains", src: "/Scene/BackhillDark.png" },
        { id: "Lumen", src: "/LumenLambet/SpriteSheet360.png" },
        { id: "LJanus", src: "/Janus/Frank.png" },
        { id: "DJanus", src: "/Janus/DarkFrank.png" },
        { id: "Light", src: "/Scene/light.png" },
        { id: "MadWorld", src: "/Scene/MadWorld.mp3" },
        { id: "Rainbow", src: "/Scene/Rainbow.mp3" }
    ]);
    preload.load();
}

function init() {
    stage = new createjs.Stage("canvas");

    createAudio();
    createBackground();
    createBlocks();
    createLumen();
    createJanus();

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", tick);

    window.onkeydown = handleKeyDown;
    window.onkeyup = handleKeyUp;

    stage.update();
}

function createAudio() {
    rainbow = createjs.Sound.createInstance("Rainbow");
    madWorld = createjs.Sound.createInstance("MadWorld");
    rainbow.setVolume(.5);
    madWorld.setVolume(.5);
    rainbow.play();
    createjs.Sound.play("LMusic", createjs.Sound.INTERUPT_NONE, 0, 0, -1, .5, 0);
}

function createBackground() {
    light = true;
    var background = new createjs.Bitmap(preload.getResult("LBackground"));
    var mountains = new createjs.Bitmap(preload.getResult("Mountains"));
    var trees = new createjs.Bitmap(preload.getResult("Trees"));
    background.x = 0;
    mountains.x = 0;
    trees.x = 0;
    var background2 = new createjs.Bitmap(preload.getResult("LBackground"));
    var mountains2 = new createjs.Bitmap(preload.getResult("Mountains"));
    var trees2 = new createjs.Bitmap(preload.getResult("Trees"));
    background2.x = 1900;
    mountains2.x = 1900;
    trees2.x = 1900;

    var darkBackground = new createjs.Bitmap(preload.getResult("DBackground"));
    var darkMountains = new createjs.Bitmap(preload.getResult("DarkMountains"));
    var darkTrees = new createjs.Bitmap(preload.getResult("DarkTrees"));
    darkBackground.x = 0;
    darkMountains.x = 0;
    darkTrees.x = 0;
    var darkBackground2 = new createjs.Bitmap(preload.getResult("DBackground"));
    var darkMountains2 = new createjs.Bitmap(preload.getResult("DarkMountains"));
    var darkTrees2 = new createjs.Bitmap(preload.getResult("DarkTrees"));
    darkBackground2.x = 1900;
    darkMountains2.x = 1900;
    darkTrees2.x = 1900;

    backgroundContainer = new createjs.Container();
    backgroundContainer.addChild(background, background2, mountains, mountains2, trees, trees2);
    darkBackgroundContainer = new createjs.Container();
    darkBackgroundContainer.addChild(darkBackground, darkBackground2, darkMountains, darkMountains2, darkTrees, darkTrees2);

    stage.addChild(backgroundContainer, darkBackgroundContainer);
    darkBackgroundContainer.visible = false;

}

function createLumen() {
    goingRight = true;
    grounded = true;
    lumenSpriteSheet = new createjs.SpriteSheet({
        images: [preload.getResult("Lumen")],
        frames: { width: 354, height: 375, count: 7, regX: 345 / 2, regY: 0 },
        animations: {
            stand: 0,
            walk: [1, 4, 'walk', .25],
            jump: 5,
            fall: 6,
        },
        framerate: .25
    });
    lumen = new createjs.Sprite(lumenSpriteSheet);
    lumen.x = 60; lumen.y = 735;
    lumen.scaleX = .21739; lumen.scaleY = .20833;
    lumenHeight = 75; lumenWidth = 75;
    stage.addChild(lumen);
}

function createJanus() {
    janusSpriteSheet = new createjs.SpriteSheet({
        images: [preload.getResult("LJanus")],
        frames: { width: 75, height: 100, count: 6, regX: 37.5, regY: 0 },
        animations: {
            stand: [0, 2],
            patrol: [3, 5, 'patrol', .25]
        }
    });
<<<<<<< HEAD
=======
    janusWidth = 75;
>>>>>>> refs/remotes/origin/master

    janusDarkSpriteSheet = new createjs.SpriteSheet({
        images: [preload.getResult("DJanus")],
        frames: { width: 75, height: 100, count: 6, regX: 37.5, regY: 0 },
        animations: {
            stand: [0, 2],
            patrol: [3, 5, 'patrol', .25]
        }
    });

    lightSpriteSheet = new createjs.SpriteSheet({
        images: [preload.getResult("Light")],
        frames: { width: 400, height: 400, count: 1 },
        animations: {
            theOnlyLightOutThere: 0
        }
    });

    lightSprite = new createjs.Sprite(lightSpriteSheet, 'theOnlyLightOutThere');
    lightSprite.x = 1775; lightSprite.y = 40;
    lightSprite.scaleX = .25; lightSprite.scaleY = .25;
    stage.addChild(lightSprite);
    lightSprite.visible = false;

    lightDarkJanus(25, 250, 0, janusSpriteSheet, janusDarkSpriteSheet);
    lightDarkJanus(100, 600, 1, janusSpriteSheet, janusDarkSpriteSheet);
    lightDarkJanus(900, 400, 2, janusSpriteSheet, janusDarkSpriteSheet);
    lightDarkJanus(700, 200, 3, janusSpriteSheet, janusDarkSpriteSheet);

    /*janus = new createjs.Sprite(janusSpriteSheet, 'stand')
    janus.x = 25; janus.y = 400;
    stage.addChild(janus);

    janusD = new createjs.Sprite(janusDarkSpriteSheet, 'stand')
    janusD.x = 25; janus.y = 400;
    stage.addChild(janusD);*/
}

function createBlocks() {
    var x = 0;
    var y = 800;

    lightDarkPlatform(x, y, 0, 1, "LGround", "DGround");
    lightDarkPlatform(150, 700, 2, 3, "SLPlatform", "SDPlatform");
    lightDarkPlatform(400, 650, 4, 5, "SLPlatform", "SDPlatform");
    lightDarkPlatform(650, 650, 6, 7, "LLPlatform", "LDPlatform");
    lightDarkPlatform(550, 450, 8, 9, "SLPlatform", "SDPlatform");
    lightDarkPlatform(0, 550, 10, 11, "SLPlatform", "SDPlatform");
    lightDarkPlatform(50, 400, 12, 13, "SLPlatform", "SDPlatform");
    lightDarkPlatform(300, 250, 14, 15, "LLPlatform", "LDPlatform");
    lightDarkPlatform(1700, 250, 16, 17, "SLPlatform", "SDPlatform");
    lightDarkPlatform(1200, 550, 18, 19, "SLPlatform", "SDPlatform");
    lightDarkPlatform(1100, 250, 20, 21, "SLPlatform", "SDPlatform");
    lightDarkPlatform(1600, 450, 22, 23, "SLPlatform", "SDPlatform");
    lightDarkPlatform(900, 410, 24, 25, "SLPlatform", "SDPlatform");
}

function moveScene() {
    for (var i = 0; i < 3; i++) {
        backgroundContainer.getChildAt((2 * i)).x -= (i + 1);
        backgroundContainer.getChildAt((2 * i) + 1).x -= (i + 1);
        darkBackgroundContainer.getChildAt((2 * i)).x -= (i + 1);
        darkBackgroundContainer.getChildAt((2 * i) + 1).x -= (i + 1);
        if (backgroundContainer.getChildAt(2 * i).x + backgroundContainer.getChildAt(2 * i).image.width <= 0) {
            backgroundContainer.getChildAt(2 * i).x = 1900;
            darkBackgroundContainer.getChildAt(2 * i).x = 1900;
        }
        if (backgroundContainer.getChildAt((2 * i) + 1).x + backgroundContainer.getChildAt((2 * i) + 1).image.width <= 0) {
            backgroundContainer.getChildAt((2 * i) + 1).x = 1900;
            darkBackgroundContainer.getChildAt((2 * i) + 1).x = 1900;
        }
    }


}

function updateCamera() {
    var xMin = 0 + camera.x * camera.zoom - size;
    var yMin = 0 + camera.y * camera.zoom - size;
    var xMax = window.innerWidth + camera.x * camera.zoom + size;
    var yMax = window.innerHeight + camera.y * camera.zoom + size;

    cameraContainer.x = -camera.x + camera.zoom;
    cameraContainer.x = -camera.y + camera.zoom;
}

function tick() {
    if (meter <= 50) {
        light = false;
        backgroundContainer.visible = false;
        darkBackgroundContainer.visible = true;
        for (var i = 0; i < (platform.length / 2) ; i++) {
            platform[2 * i].visible = false;
            platform[(2 * i) + 1].visible = true;
        }
        for (var i = 0; i < janus.length; i++) {
            janus[i].visible = false;
            janusD[i].visible = true;
        }
        displayInsText2();
    }
    else if (meter > 50) {
        meter -= 1 / 15;
    }
    else if (meter == 100) {
        light = true;
        backgroundContainer.visible = true;
        darkBackgroundContainer.visible = false;
        for (var i = 0; i < (platform.length / 2) ; i++) {
            platform[2 * i].visible = true;
            platform[(2 * i) + 1].visible = false;
        }
        for (var i = 0; i < janus.length; i++) {
            janus[i].visible = true;
            janusD[i].visible = false;
        }
    }
    if (!grounded) {
        lumen.y += grav;
    }
    CheckRectIntersection();
    move();
    collision();
    moveScene();
    if (light) {
        displayInsText();
    } else if (!light) {
        lightSprite.visible = true;
        rainbow.setVolume(0);
        madWorld.play();
        displayInsText2();
        displayIntText3();
        //timeOfTick = Ticker.getTime();
    }
    //if (Ticker.getTime = timeOfTick + 300) {
    //  hideIntTexts();

if (meter <= 0) {
    displayLose();
}
if (lumen.x <= 1775 + 400 * .25 && lumen.x + lumenWidth >= 1775 && !light) {
    if (lumen.y <= 300 && lumen.y <= 40) {
        displayWin();
    }
}

//Lumen movement
if (rightkeydown) {
    walkR();
    //LumenScript.walkR();
} else if (leftkeydown) {
    walkL();
}
if (upkeydown && grounded) {
    jump();
    grounded = false;
} else if (!(upkeydown || rightkeydown || leftkeydown)) {
    if (!grounded) {
        lumen.gotoAndPlay('fall');
    }
    else {
        lumen.gotoAndPlay('stand');
    }
}

stage.update();
}

function walkR() {
    if (!moving) {
        moving = true;
        lumen.scaleX = .21739;
        lumen.gotoAndPlay('walk');
    }
    lumen.x += 5;
}

function walkL() {
    if (!moving) {
        moving = true;
        lumen.scaleX = -.21739;
        lumen.gotoAndPlay('walk');
    }
    lumen.x -= 5;
}

function jump() {
    lumen.gotoAndPlay('jump');
    createjs.Tween.get(lumen).to({ y: lumen.y - 150 }, 1000);
}

function displayInsText() {
    insText.x = 100;
    insText.y = 50;
    stage.addChild(insText);
    stage.update();
}

function displayInsText2() {
    stage.removeChild(insText);
    insText2.x = 100;
    insText2.y = 50;
    stage.addChild(insText2);
    stage.update();
}

function displayIntText3() {
    stage.removeChild(insText);
    insText3.x = 1450;
    insText3.y = 50;
    stage.addChild(insText3);
    stage.update();
}

function hideIntTexts() {
    stage.removeChild(insText2, insText3);
    stage.update();
}

function displayLose() {
    stage.removeAllChildren();
    madWorld.setVolume(0);
    removeJanus();
    loseText.textBaseLine = "middle";
    loseText.textAlign = "center";
    loseText.x = stage.canvas.width / 2;
    loseText.y = stage.canvas.height / 2 - 135;
    stage.addChild(loseText);
    stage.update();
}

function displayWin() {
    stage.removeAllChildren();
    madWorld.setVolume(0);
    removeJanus();
    winText.textBaseLine = "middle";
    winText.textAlign = "center";
    winText.x = stage.canvas.width / 2;
    winText.y = stage.canvas.height / 2 - 135;
    stage.addChild(winText);
    stage.update();
}

function lightDarkPlatform(platX, platY, lightI, darkI, imageStringL, imageStringD) {
    platform.push(new createjs.Bitmap(preload.getResult(imageStringL)));
    platform[lightI].x = platX;
    platform[lightI].y = platY;
    stage.addChild(platform[lightI]);

    platform.push(new createjs.Bitmap(preload.getResult(imageStringD)));
    platform[darkI].x = platX;
    platform[darkI].y = platY;
    platform[darkI].visible = false;
    stage.addChild(platform[darkI]);

    platformBounds[lightI] = platform[lightI].getBounds();
    platformBounds[darkI] = platform[darkI].getBounds();
    platformBounds[lightI].x = platX;
    platformBounds[lightI].y = platY;
    platformBounds[darkI].x = platX;
    platformBounds[darkI].x = platY;
}

function lightDarkJanus(jX, jY, jI, lightSpriteSheet, darkSpriteSheet) {
    janus.push(new createjs.Sprite(lightSpriteSheet, 'stand'));
    janus[jI].x = jX; janus[jI].y = jY;
    stage.addChild(janus[jI]);

    janusD.push(new createjs.Sprite(darkSpriteSheet, 'stand'));
    janusD[jI].x = jX; janusD[jI].y = jY;
    janusD[jI].visible = false;
    stage.addChild(janusD[jI]);

    jBounds[jI] = janus[jI].getBounds();
    jDBounds[jI] = janusD[jI].getBounds();
    jBounds[jI].x = jX;
    jBounds[jI].y = jY;
    jDBounds[jI].x = jX;
    jDBounds[jI].y = jY;
}

function handleKeyDown(e) {
    switch (e.keyCode) {
        case 65: leftkeydown = true; break;
        case 68: rightkeydown = true; break;
        case 87: upkeydown = true; break;
        case 83: downkeydown = true; break;
    }
}

function handleKeyUp(e) {
    switch (e.keyCode) {
        case 65: leftkeydown = false; moving = false; break;
        case 68: rightkeydown = false; moving = false; break;
        case 87: upkeydown = false; break;
        case 83: downkeydown = false; break;
    }
}
function removeJanus()
{
    for(var i = 0; i < janus.length; i++)
    {
        janus[i] = null;
    }
}

function CheckRectIntersection() {
    grounded = false;
    for (var i = 0; i < platformBounds.length; i++) {
        if (lumen.x + lumenWidth >= (platformBounds[i].x) && lumen.x <= (platformBounds[i].x + platformBounds[i].width)) {
            if (lumen.y + lumenHeight <= (platformBounds[i].y + platformBounds[i].height) && lumen.y + lumenHeight >= (platformBounds[i].y)) {
                grounded = true;
                lumen.y = platformBounds[i].y - lumenHeight;
            }
        }
    }
    if (lumen.x < 25) {
        leftkeydown = false;
    }
    if (lumen.x > stage.canvas.width) {
        rightkeydown = false;
    }
}