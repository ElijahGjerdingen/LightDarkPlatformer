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
    if (grounded == true) {
        lumen.y -= 150;
        grounded = false;
    }
    
}


