//Lumen code
function stand(e) {
    if (!leftkeydown) {
        lumen.gotoAndStop('walk');
        lumen.gotoAndPlay('stand');
    }
    if (!rightkeydown) {
        lumen.gotoAndStop('walk');
        lumen.gotoAndPlay('stand');
    }
}

function walk(e) {
    if (leftkeydown) {
        goingRight = false;
        lumen.gotoAndStop('stand');
        lumen.gotoAndPlay('_walk');
        lumen.advance();
        lumen.x -= 5;
    }
    if (rightkeydown) {
        goingRight = true;
        lumen.gotoAndStop('stand');
        lumen.gotoAndPlay('walk');
        lumen.advance();
        lumen.x += 5;
    }
}

function jump(e) {
    if (grounded == true) {
        lumen.y -= 150;
        grounded = false;
    }
}

function movement() {
    if (leftkeydown || rightkeydown) {
        walk();
    }
    if (upkeydown && grounded) {
        jump();
    }
    if (!leftkeydown || !rightkeydown || !upkeydown) {
        stand();
    }
}
