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

}