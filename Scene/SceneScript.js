// JavaScript source code
var stage;
var meter = 100;

function load()
{
    preload = new createjs.loadQueue(true);
    preload.installPlugin(createjs.Sound);
    createjs.sound.alternateExtensions = ["ogg"]; // <- switch this ti alternate musical file type
    preload.addEventListner("complete", init);

    preload.loadManifest([
        { id: "LBackground", src: "/scene/LBackground.png" },
        { id: "DBackground", src: "/scene/DBackground.png"},
        { id: "LGround", src: "/scene/LGround.png" },
        { id: "DGround", src: "/scene/DGround.png"},
        { id: "Lamp", src: "/scene/Lamp.png" },
        { id: "LMusic", src: "/scene/LMusic.png" },
        { id: "DMusic", src: "/scene/DMusic.png"}
    ])
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
}

function createBlocks()
{
    var block1 = new createjs.Shape(new createjs.Graphics().beginFill("green").drawRect(100, 100, 50, 200));
}