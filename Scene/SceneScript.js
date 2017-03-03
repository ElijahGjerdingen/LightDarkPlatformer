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
function load()
{
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
        { id: "DarkMountains", src: "/Scene/BackhillDark.png" }
    ]);
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
    platform.push( new createjs.Bitmap(preload.getResult("DGround")));
    platform[1].x = x;
    platform[1].y = y;
    platform[1].visible = false;
    stage.addChild(platform[1]);

    platform.push(new createjs.Bitmap(preload.getResult("SLPlatform")));
    platform[2].x = 150;
    platform[2].y = 900 - 200;
    stage.addChild(platform[2]);

    platform.push(new createjs.Bitmap(preload.getResult("SDPlatform")));
    platform[3].x = 150;
    platform[3].y = 900 - 200;
    platform[3].visible = false;
    stage.addChild(platform[3]);

    platform.push(new createjs.Bitmap(preload.getResult("SLPlatform")));
    platform[4].x = 400;
    platform[4].y = 700;
    stage.addChild(platform[4]);

    platform.push(new createjs.Bitmap(preload.getResult("SDPlatform")));
    platform[5].x = 400;
    platform[5].y = 700;
    platform[5].visible = false;
    stage.addChild(platform[5]);

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
    for (var i = 0; i < 3; i++)
    {
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
    for(var i = 0; i < 6; i++)
    {
        testText.text += backgroundContainer.getChildAt(i).x + " ";
    }
    
}
function tick()
{
    if (meter <= 50)
    {
        backgroundContainer.visible = false;
        darkBackgroundContainer.visible = true;
        for (var i = 0; i < (platform.length / 2) ; i++)
        {
            platform[2 * i].visible = false;
            platform[(2 * i) + 1].visible = true;
        }
    }
    else if (meter > 50)
    {
        meter -= 1/15;
    }
    else if (meter == 100)
    {
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