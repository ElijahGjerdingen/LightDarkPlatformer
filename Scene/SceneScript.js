// JavaScript source code
var stage;
var meter = 100;
var preload

function load()
{
    preload = new createjs.loadQueue(true);
    preload.installPlugin(createjs.Sound);
    createjs.sound.alternateExtensions = ["ogg"]; // <- switch this to alternate musical file type
    preload.addEventListner("complete", init);

    preload.loadManifest
    ([
        { id: "LBackground", src: "/Scene/LightBackground.png" },
        { id: "DBackground", src: "/Scene/DBackground.png" },
        { id: "LGround", src: "/Scene/LGround.png" },
        { id: "DGround", src: "/Scene/DGround.png" },
        { id: "Lamp", src: "/Scene/Lamp.png" },
        { id: "LMusic", src: "/Scene/LMusic.png" },
        { id: "DMusic", src: "/Scene/DMusic.png" },
        { id: "placeHolder", src: "/Scene/placeHolder.png" }
    ]);
    preload.Load();
}

function init()
{
    stage = new createjs.Stage("canvas");

    createjs.Ticker.setfps(60);
    createjs.Ticker.addEventListner("tick", tick);

    var background = new createjs.Bitmap(preload.getResult("LBackground"));
    background.setTransform(0, 0, 1, 1);
    stage.addChild(background);

    createjs.Sound.play("LMusic", createjs.Sound.INTERUPT_NONE, 0, 0, -1, .5, 0);
    createBlocks();
    stage.update();
}

function createBlocks()
{
    //var block1 = new createjs.Shape(new createjs.Graphics().beginFill("green").drawRect(100, 100, 50, 200));
    var x = 100;
    var y = 100;
    var platform = new Bitmap(preload.getResult("placeHolder"));
    platform.x = x;
    platform.y = y;
    stage.addChild(platform);
}