// JavaScript source code
var janusBounds = [];
var bounds = [];
var rightCollision = false;
var leftCollision = true;
function move(e)
{
<<<<<<< HEAD
    for (var i = 0; i < janus.length; i++) {
        if (janus[i].x > stage.canvas.width - 20 || janusD[i].x > stage.canvas.width - 20) {
            rightCollision = true;
        } else if (janus[i].x < 500 || janusD[i].x < 500) {
            leftCollision = true;
        }
    }
    for (var i = 0; i < janus.length; i++) {
        if (rightCollision == true) {
            leftCollision = false;
            janus[i].x -= 4;
            janusD[i].x -= 4;
            jBounds[i].x -= 4;
            jDBounds[i].x -= 4;
        }
        else if (leftCollision == true) {
            rightCollision = false;
            janus[i].x += 4;
            janusD[i].x += 4;
            jBounds[i].x += 4;
            jDBounds[i].x += 4;
        }
=======
    if (rightCollision == true)
    {
        janus[0].x -= 4;
        janusD[0].x -= 4;
    }
    else if (leftCollision == true)
    {
        janus[0].x += 4;
        janusD[0].x += 4;
>>>>>>> parent of 344f5bc... Adding hit boxes
    }
}
function collision(e)
{
    
    for (var i = 0; i < platformBounds.length / 2; i++)
    {
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
    for (var i = 0; i < jBounds.length; i++)
    {
        janusBounds[i] = new createjs.Rectangle(0, 0, 1, 1);
        janusBounds[i].x = jBounds[i].x;
        janusBounds[i].y = jBounds[i].y;
        janusBounds[i].width = jBounds[i].width;
        janusBounds[i].height = jBounds[i].height;
    }
    for (var i = 0; i < janusBounds.length; i++)
    {
        if (bounds[i].x <= janusBounds[i].x + janusBounds[i].width && bounds[i].x + bounds[i].width >= janusBounds[i].x && bounds[i].y <= janusBounds[i].y + janusBounds[i].height && bounds[i].y + bounds[i].height >= janusBound[i].y)
        {
            leftCollision = true;
            rightCollision = false;
                for(var j = 0; j < janus.length; j++)
                {
                    janus.x += 10;
                }
        }
        if(bounds[i].x + bounds[i].width == janusBounds[i].x)
        {
            leftCollision = false;
            rightCollision = true;
            if (light != true) {
                meter -= 10;
                for(var j = 0; j < janus.length; j++)
                {
                    janus[i].x += 10;
                }

            }
        }
    }
}