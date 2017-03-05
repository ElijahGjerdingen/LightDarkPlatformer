// JavaScript source code
var janus;
var bounds;
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