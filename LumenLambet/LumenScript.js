//Lumen code
const ARROW_KEY_Up = 56;
const ARROW_KEY_Down = 53;
const ARROW_KEY_Left = 54;
const ARROW_KEY_Right = 55;

var leftkeydown = false;
var rightkeydown = false;
var spacebarkeydown = false;
/*
function walk(e) {
    if (leftkeydown) {
        goingRight = false;
        var l = e.target;
        s.x -= 10;
    }
    if (rightkeydown) {
        goingRight = true;
        var r = e.target;
        r.x += 10;
    }
    if (spacebarkeydown) {
        if (grounded) {
            jump();
        }
    }
    stage.update();
}*/


function run(e) {
    if (leftkeydown || rightkeydown) {
        walk();
    }
    if (spacebarkeydown) {
        if (grounded) {
            jump();
        }
    }
    return lumen;
    stage.update();
}


function jump(e) {
    grounded = false;
    if (goingRight) {
        lumen.y += 10;
        lumen.x += 5;
    } else {
        lumen.y += 10;
        lumen.x -= 5;
    }
    grounded = true;
}
/*
function handleKeyDown(e) {
    switch (e.keyCode) {
        case ARROW_KEY_Left: leftkeydown = true; break;
        case ARROW_KEY_Right: rightkeydown = true; break;
        case ARROW_KEY_Up: upkeydown = true; break;
        case ARROW_KEY_Down: downkeydown = true; break;
    }
}

function handleKeyUp(e) {
    switch (e.keyCode) {
        case ARROW_KEY_Left: leftkeydown = false; break;
        case ARROW_KEY_Right: rightkeydown = false; break;
        case ARROW_KEY_Up: upkeydown = false; break;
        case ARROW_KEY_Down: downkeydown = false; break;
    }
}
*/