// JavaScript source code
janus.scaleX = 1;
janusD.scaleX = 1;
var janusBounds = [];
var bounds = [];
var rightCollision = [];
var leftCollision = [];
var idxR = true;
var idxL = false;
var goingLeft = [];
var goingRight = [];
function move(e) {
    for (var i = 0; i < janus.length; i++) {
        if (rightCollision[i] != true && leftCollision[i] != true) {
            leftCollision[i] = false;
            rightCollision[i] = true;
        }
        if (janus[i].x > stage.canvas.width - 20 || janusD[i].x > stage.canvas.width - 20) {
            rightCollision[i] = true;
            leftCollision[i] = false;
            goingLeft[i] = false;
        }
        if (janus[i].x < 25 || janusD[i].x < 25) {
            leftCollision[i] = true;
            rightCollision[i] = false;
            goingRight[i] = false;
        }
    }

    for (var i = 0; i < janus.length; i++) {
        idxR = rightCollision[i];
        idxL = leftCollision[i];
        if (idxR == true) {
            if (!goingLeft[i]) {
                goingLeft[i] = true;
                janus[i].scaleX = 1;
                janusD[i].scaleX = 1;
                janus[i].gotoAndPlay('patrol');
                janusD[i].gotoAndPlay('patrol');
            }
            janus[i].x -= 4;
            janusD[i].x -= 4;
            jBounds[i].x -= 4;
            jDBounds[i].x -= 4;
        }
        if (idxL == true) {
            if (!goingRight[i]) {
                goingRight[i] = true;
                janus[i].scaleX = -1;
                janusD[i].scaleX = -1;
                janus[i].gotoAndPlay('patrol');
                janusD[i].gotoAndPlay('patrol');
            }
            janus[i].x += 4;
            janusD[i].x += 4;
            jBounds[i].x += 4;
            jDBounds[i].x += 4;
        }
    }
}

function collision(e) {
    for (var i = 0; i < platformBounds.length / 2; i++) {
        bounds[2 * i] = new createjs.Rectangle(0, 0, 1, 1);
        bounds[(2 * i) + 1] = new createjs.Rectangle(0, 0, 1, 1);
        bounds[2 * i].x = platformBounds[2 * i].x;
        bounds[2 * i].y = platformBounds[2 * i].y;
        bounds[2 * i].width = platformBounds[2 * i].width;
        bounds[2 * i].height = platformBounds[2 * i].height;

        bounds[(2 * i) + 1].x = platformBounds[(2 * i) + 1].x;
        bounds[(2 * i) + 1].y = platformBounds[(2 * i) + 1].y;
        bounds[(2 * i) + 1].width = platformBounds[(2 * i) + 1].width;
        bounds[(2 * i) + 1].height = platformBounds[(2 * i) + 1].height;
    }
    for (var i = 0; i < jBounds.length; i++) {
        janusBounds[i] = new createjs.Rectangle(0, 0, 1, 1);
        janusBounds[i].x = jBounds[i].x;
        janusBounds[i].y = jBounds[i].y;
        janusBounds[i].width = 75;
        janusBounds[i].height = 100;
    }
    /*for (var j = 0; j < bounds.length / 2; j++) {
        for (var i = 0; i < janusBounds.length; i++) {
            if (bounds[2 * j].x <= janusBounds[i].x + janusBounds[i].width && bounds[2 * j].x + bounds[2 * j].width >= janusBounds[i].x) {
                if (bounds[2 * j].y <= janusBounds[i].y + janusBounds[i].height && bounds[2 * j].y + bounds[2 * j].height >= janusBounds[i].y) {
                    leftCollision = true;
                    rightCollision = false;
                    for (var k = 0; k < janus.length; k++) {
                        janus[k].x -= 10;
                    }
                }
            }
            if (bounds[i].x + bounds[i].width == janusBounds[i].x) {
                leftCollision = false;
                rightCollision = true;
                if (light != true) {
                    meter -= 10;
                    for (var j = 0; j < janus.length; j++) {
                        janus[i].x += 10;
                    }

                }
            }
        }
    }*/
    for (var i = 0; i < janusBounds.length; i++) {
        if (janusBounds[i].x + janusBounds[i].width > lumen.x && lumen.x + lumenWidth > janusBounds[i].x && !light) {
            if (janusBounds[i].y + janusBounds[i].height > lumen.y && lumen.y + lumenHeight > janusBounds[i].y) {
                if (lumen.x + lumenWidth > janusBounds[i].x)
                {
                meter -= 10;
                lumen.x = janusBounds[i].x - (lumenWidth + 25);
                }
                if(janusBounds[i].x + janusBounds[i].width > lumen.x )
                {
                    meter -= 10;
                    lumen.x = janusBounds[i].x + janusWidth + 25;
                }
            }
        }
    }
}