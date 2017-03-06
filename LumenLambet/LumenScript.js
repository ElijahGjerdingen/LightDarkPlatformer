//Lumen code
function walk(e) {
    if (leftkeydown) {
        goingRight = false;
        lumen.x -= 5;
    }
    if (rightkeydown) {
        goingRight = true;
        lumen.x += 5;
    }
}

function jump(e) {
    if (grounded == true){
        createjs.Tween.get(lumen).to({y:lumen.y-150}, 1000);
        grounded = false;
    }
}

function movement() {

}
