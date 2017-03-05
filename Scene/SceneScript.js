// JavaScript source code
var stage;
var meter = 100;
var platform = [];
var lumenPlaceholder;
var backgroundContainer;
var darkBackgroundContainer;
var backgroundContainer2;
var darkBackgroundContainer2;
var testText = new createjs.Text("test", "100px Ariel", "black");
//Lumen
var lumen;
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
        { id: "Lumen", src: "/LumenLambet/SpriteSheet.png" }
    ]);
    preload.load();
}



function init() {
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
            walk: [1, 4]
        }
    });

    lumen = new createjs.Sprite(lumenSpriteSheet, 'stand');
    lumen.x = 25; lumen.y = 735;
    lumen.scaleX = .21739; lumen.scaleY = .20833;
    stage.addChild(lumen);
    
    window.onkeyup = handleKeyUp;
    window.onkeydown = handleKeyDown;

    stage.update();
}

function createBlocks() {
    //var block1 = new createjs.Shape(new createjs.Graphics().beginFill("green").drawRect(100, 100, 50, 200));
    var x = 0;
    var y = 800;
    
    lightDarkPlatform(x, y, 0, 1, "LGround", "DGround");
    lightDarkPlatform(150, 700, 2, 3, "SLPlatform", "SDPlatform");
    lightDarkPlatform(400, 650, 4, 5, "SLPlatform", "SDPlatform");
    lightDarkPlatform(650, 650, 6, 7, "LLPlatform", "LDPlatform");
    lightDarkPlatform(550, 450, 8, 9, "SLPlatform", "SDPlatform");
    lightDarkPlatform(0, 550, 10, 11, "SLPlatform", "SDPlatform");
    lightDarkPlatform(50, 400, 12, 13, "SLPlatform", "SDPlatform");

}
function CheckRectIntersection(object, character) {
    if (object.x == character.x + 75 || object.x + 150 == character.x || object.y == character.y + 75 || object.y + 35 == character.y) {

    }
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
function updateCamera()
{
    var xMin = 0 + camera.x * camera.zoom - size;
    var yMin = 0 + camera.y * camera.zoom - size;
    var xMax = window.innerWidth + camera.x * camera.zoom + size;
    var yMax = window.innerHeight + camera.y * camera.zoom + size;

    cameraContainer.x = -camera.x + camera.zoom;
    cameraContainer.x = -camera.y + camera.zoom;


}
function tick() {
    if (meter <= 50) {
        backgroundContainer.visible = false;
        darkBackgroundContainer.visible = true;
        for (var i = 0; i < (platform.length / 2) ; i++) {
            platform[2 * i].visible = false;
            platform[(2 * i) + 1].visible = true;
        }
    }
    else if (meter > 50) {
        meter -= 1 / 15;
    }
    else if (meter == 100) {
        backgroundContainer.visible = true;
        darkBackgroundContainer.visible = false;
        for (var i = 0; i < (platform.length / 2) ; i++) {
            platform[2 * i].visible = true;
            platform[(2 * i) + 1].visible = false;
        }
    }
    moveScene();

    stage.update();
}
function lightDarkPlatform(platX, platY, lightI, darkI, imageStringL, imageStringD)
{
    platform.push(new createjs.Bitmap(preload.getResult(imageStringL)));
    platform[lightI].x = platX;
    platform[lightI].y = platY;
    stage.addChild(platform[lightI]);

    platform.push(new createjs.Bitmap(preload.getResult(imageStringD)));
    platform[darkI].x = platX;
    platform[darkI].y = platY;
    platform[darkI].visible = false;
    stage.addChild(platform[darkI]);
}