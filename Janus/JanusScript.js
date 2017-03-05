// JavaScript source code
var janus;
var bounds = [];
var rightCollision = true;
var leftCollision = false;
function move()
{
    if (rightCollision == true)
    {
        janus.x -= 10;
    }
    else if (leftCollision == true)
    {
        janus.x += 10;
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
    if(bounds.x = e.x + e.width)
    {
        leftCollision = true;
        rightCollision = false;
        if (inDarkWorld == true)
        {
            meter -= 10;
            lumen.x -= 10;
        }
    }
}