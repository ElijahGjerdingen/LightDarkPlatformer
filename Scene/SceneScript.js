// JavaScript source code
var stage;
var meter = 100;
var platform = [];
var lumenPlaceholder;
var backgroundContainer;
function load()
{
    preload = new createjs.LoadQueue(true);
    preload.installPlugin(createjs.Sound);
    preload.addEventListener("complete", init);

    preload.loadManifest([
        { id: "LBackground", src: "/Scene/Sky.png" },
        { id: "Mountains", src: "/Scene/Backhill.png" },
        { id: "Trees", src: "/Scene/Trees.png"},
        /*{ id: "DBackground", src: "/DBackground.png"},
        { id: "LGround", src: "/LGround.png" },
        { id: "DGround", src: "/DGround.png"},
        { id: "Lamp", src: "/Lamp.png" },
        { id: "LMusic", src: "/LMusic.png" },
        { id: "DMusic", src: "/DMusic.png" },*/
        { id: "SLPlatform", src: "/Scene/ShortFloatPlatform.png" },
        { id: "LLPlatform", src: "/Scene/LongFloatPlatform.png" },
        { id: "LGround", src: "/Scene/GroundLayer.png"}
    ])
    preload.load();
}

function init()
{
    stage = new createjs.Stage("canvas");

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", tick);

    var background = new createjs.Bitmap(preload.getResult("LBackground"));
    var mountains = new createjs.Bitmap(preload.getResult("Mountains"));
    var trees = new createjs.Bitmap(preload.getResult("Trees"));
    
    backgroundContainer = new createjs.Container();
    backgroundContainer.addChild(background, mountains, trees);

    stage.addChild(backgroundContainer);

    createjs.Sound.play("LMusic", createjs.Sound.INTERUPT_NONE, 0, 0, -1, .5, 0);
    createBlocks();
}

function createBlocks()
{
    //var block1 = new createjs.Shape(new createjs.Graphics().beginFill("green").drawRect(100, 100, 50, 200));
    var x = 0;
    var y = 800;
    platform.push( new createjs.Bitmap(preload.getResult("LGround")));
    platform[0].x = x;
    platform[0].y = y;
    stage.addChild(platform[0]);
    platform.push( new createjs.Bitmap(preload.getResult("LGround")));
    platform[1].x = x + 150;
    platform[1].y = y;
    stage.addChild(platform[1]);
}
function CheckRectIntersection( platform, character)
{
    for (var i = 0; i < platform.length; i++)
    {
        if ((platform.x == lumenPlaceholder.x && platform.y == lumenPlaceholder.y) || (platform.x == lumenPlaceholder.x && platform.y == (lumenPlaceholder.y + 1900)))
        {

        }

    }
}
function moveScene()
{
    backgroundContainer.getChildByName("background").x += 1;
    backgroundContainer.getChildByName("mountains").x += 2;
    backgroundContainer.getChildByName("trees").x += 3;
}
function tick()
{
    moveScene();
    stage.update();
}