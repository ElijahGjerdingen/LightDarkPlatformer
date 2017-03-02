// JavaScript source code
var stage;
var meter = 100;

function load()
{
    preload = new createjs.LoadQueue(true);
    preload.installPlugin(createjs.Sound);
    preload.addEventListener("complete", init);

    preload.loadManifest([
        { id: "LBackground", src: "/Scene/LightBackground.png" },
        /*{ id: "DBackground", src: "/DBackground.png"},
        { id: "LGround", src: "/LGround.png" },
        { id: "DGround", src: "/DGround.png"},
        { id: "Lamp", src: "/Lamp.png" },
        { id: "LMusic", src: "/LMusic.png" },
        { id: "DMusic", src: "/DMusic.png" },*/
        { id: "placeHolder", src: "/Scene/placeHolder.png"}
    ])
    preload.load();
}

function init()
{
    stage = new createjs.Stage("canvas");

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", tick);

    var background = new createjs.Bitmap(preload.getResult("LBackground"));
    background.setTransform(0, 0, 1, 1);
    stage.addChild(background);

    createjs.Sound.play("LMusic", createjs.Sound.INTERUPT_NONE, 0, 0, -1, .5, 0);
    createBlocks();
}

function createBlocks()
{
    //var block1 = new createjs.Shape(new createjs.Graphics().beginFill("green").drawRect(100, 100, 50, 200));
    var x = 10;
    var y = 800;
    var platform = new createjs.Bitmap(preload.getResult("placeHolder"));
    platform.x = x;
    platform.y = y;
    stage.addChild(platform);
    var platform2 = new createjs.Bitmap(preload.getResult("placeHolder"));
    platform2.x = x + 400;
    platform2.y = y;
    stage.addChild(platform2);
}
function tick()
{
    stage.update();
}