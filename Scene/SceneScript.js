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
var testText = new createjs.Text("test", "100px Ariel", "black");
//Lumen
const ARROW_KEY_Up = 87;
const ARROW_KEY_Down = 83;
const ARROW_KEY_Left = 65;
const ARROW_KEY_Right = 68;
var leftkeydown = false;
var rightkeydown = false;
var upkeydown = false;
var lumen;
var janus = [];
var janusD = [];
var image;
var lumenSpriteSheet;
var goingRight = false;
var grounded = false;
var camera = {
    x: 0,
    y: 0,
    zoom: 1
}
var size = 45 * camera.zoom;
var Container = createjs.Container;
var cameraContainer = new Container();
var platformBounds = [];
var lumenBounds;
var jBounds = [];
var jDBounds = [];
const GRAV = 2;

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
        { id: "Lumen", src: "/LumenLambet/SpriteSheet.png" },
        { id: "LJanus", src: "/Janus/Frank.png" },
        { id: "DJanus", src: "/Janus/DarkFrank.png" }
    ]);
    preload.load();
}



function init() {
    light = true;

    stage = new createjs.Stage("canvas");

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", tick);

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

    stage.addChild(backgroundContainer, darkBackgroundContainer, testText);
    darkBackgroundContainer.visible = false;

    createjs.Sound.play("LMusic", createjs.Sound.INTERUPT_NONE, 0, 0, -1, .5, 0);
    createBlocks();

    //Lumen init stuff
    goingRight = true;
    grounded = true;

    lumenSpriteSheet = new createjs.SpriteSheet({
        images: [preload.getResult("Lumen")],
        frames: { width: 345, height: 360, count: 7 },
        animations: {
            stand: 0,
            walk: [1, 4],
            jump: 5,
            fall: 6,
            _walk: [8, 11],
            _jump: 12,
            _fall: 13
        }
    });

    janusSpriteSheet = new createjs.SpriteSheet({
        images: [preload.getResult("LJanus")],
        frames: { width: 75, height: 100, count: 6 },
        animations: {
            stand: [0, 2],
            patrol: [3, 5]
        }
    });

    janusDarkSpriteSheet = new createjs.SpriteSheet({
        images: [preload.getResult("DJanus")],
        frames: { width: 75, height: 100, count: 6 },
        animations: {
            stand: [0, 2],
            patrol: [3, 5]
        }
    });

    createjs.SpriteSheetUtils.addFlippedFrames(lumenSpriteSheet, true, false, false);
    lumen = new createjs.Sprite(lumenSpriteSheet, 'stand');
    lumen.x = 25; lumen.y = 735;
    lumen.scaleX = .21739; lumen.scaleY = .20833;
    stage.addChild(lumen);
    //lumen.addEventListener("keydown", run);

    lightDarkJanus(25, 250, 0, janusSpriteSheet, janusDarkSpriteSheet);

    /*janus = new createjs.Sprite(janusSpriteSheet, 'stand')
    janus.x = 25; janus.y = 400;
    stage.addChild(janus);

    janusD = new createjs.Sprite(janusDarkSpriteSheet, 'stand')
    janusD.x = 25; janus.y = 400;
    stage.addChild(janusD);*/

    window.onkeydown = handleKeyDown;
    window.onkeyup = handleKeyUp;

    stage.update();
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

    alert(platformBounds[4].x + " " + platformBounds[4].y + " " + platformBounds[4].width + " " + platformBounds[4].height);
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
    testText.text = "";
    for (var i = 0; i < 6; i++) {
        testText.text += backgroundContainer.getChildAt(i).x + " ";
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
        for (var i = 0; i < janus.length; i++)
        {
            janus[i].visible = false;
            janusD[i].visible = true;
        }

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
        for(var i = 0; i < janus.length; i++)
        {
            janus[i].visible = true;
            janusD[i].visible = false;
        }
    }
    if (!grounded)
    {
        lumen.y += GRAV;
    }
    move();
    collision();
    moveScene();
    //Lumen
    if (leftkeydown || rightkeydown) {
        walk();
    }
    if (upkeydown && grounded) {
        jump();
    }
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
function lightDarkJanus(jX, jY, jI, lightSpriteSheet, darkSpriteSheet)
{
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
        case 65: leftkeydown = false; break;
        case 68: rightkeydown = false; break;
        case 87: upkeydown = false; break;
        case 83: downkeydown = false; break;
    }
}
function CheckRectIntersection() {
    for(var i = 0; i < platformBounds.length; i++)
    {
        if (lumen.x > platformBounds[i].x && lumen.x < platformBounds[i].x + platformBounds[i].width && lumen.y + lumen.height > platformBounds[i].y)
        {
            grounded = true;

        }
    }
}