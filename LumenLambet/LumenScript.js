//Lumen code

/*function walk(e) {
    if (leftkeydown) {
        goingRight = false;
        lumen.gotoAndPlay(walk);
        lumen.x -= 5;
    }
    else if (rightkeydown) {
        goingRight = true;
        lumen.walk;
        lumen.x += 5;
    } else if (!(rightkeydown || leftkeydown)){
        lumen.currentFrame = 0;
    }
}*/

function walkR(){
    if (!moving) {
        moving = true;
        lumen.scaleX = .21739;
        lumen.gotoAndPlay('walk');
    }
    lumen.x += 5;
}

function walkL() {
    if (!moving) {
        moving = true;
        lumen.scaleX = -.21739;
        lumen.gotoAndPlay('walk');
    }
    lumen.x -= 5;
}

function jump(e) {
    createjs.Tween.get(lumen).to({y:lumen.y-150}, 1000);
    grounded = false;
}
