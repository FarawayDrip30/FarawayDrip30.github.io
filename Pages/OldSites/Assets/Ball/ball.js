document.addEventListener("mousemove",mouseMoved)

var ball = document.getElementById("ball");
var ballX = 0;
var ballY = 0;

function updateBall(){
    ball.style.top = ballY + "px";
    ball.style.left = ballX + "px";
}
function lowerBall(){
    ballY += 10;
}
setInterval(updateBall, 10);

function mouseMoved(evt){
    ballX = evt.screenX;
    ballY = evt.screenY + evt.view.scrollY;
    console.log(evt);
    console.log(ball.style.top);
}