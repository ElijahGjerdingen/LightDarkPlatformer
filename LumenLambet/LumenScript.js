//Lumen code
function walk(e) {
    if (leftkeydown) {
        goingRight = false;
        //lumen.gotoAndPlay(_walk);
        
        lumen.addEventListener("change", _walk);
        var s = e.target;
        s.x -= 5;
        //lumen.x -= 5;
    }
    else if (rightkeydown) {
        goingRight = true;
        //lumen.gotoAndPlay(walk);
        //lumen = new createjs.Sprite(lumenSpriteSheet, 'walk');
        lumen.addEventListener("change", walk);
        lumen.x += 5;
    } else if (!(rightkeydown || leftkeydown)){
        lumen.gotoAndPlay(stand);
    }
}

function jump(e) {
    createjs.Tween.get(lumen).to({y:lumen.y-150}, 1000);
    grounded = false;
}

function movement() {

}
