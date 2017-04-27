//Lumen code

function walk(e) {
    if (leftkeydown) {
        goingRight = false;
        lumen.gotoAndPlay(_walk);
        
        lumen.addEventListener("KeyboardEvent", _walk);
        lumen.x -= 5;
    }
    else if (rightkeydown) {
        goingRight = true;
        lumen.gotoAndPlay(walk);
        lumen.x += 5;
    } else if (!(rightkeydown || leftkeydown)){
        lumen.currentFrame = 0;
    }
}

function jump(e) {
    createjs.Tween.get(lumen).to({y:lumen.y-150}, 1000);
    grounded = false;
}

function movement() {

}
