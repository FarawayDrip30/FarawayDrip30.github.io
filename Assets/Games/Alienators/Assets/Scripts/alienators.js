var canvas = document.getElementById("GameCanvas");
var ctx = canvas.getContext("2d");

var currentState = new TitleScreenState();

var deltaTime = 1;
var lastCalledTime = Date.now();
function getFPS() {
	if (lastCalledTime) {
		delta = (Date.now() - lastCalledTime)/1000;
		let fps = 1/delta;
		deltaTime = fps > 10 ? fps/60 : 10/60;
	}
	lastCalledTime = Date.now();
}

function clearScreen(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function main(){
    currentState.main();
    getFPS();
    requestAnimationFrame(main);
}

function render(){
    currentState.render();
    requestAnimationFrame(render);
}

function onClick(evt){
    currentState.onClick(evt);
    console.log("click");
}

canvas.addEventListener("click", onClick);
document.addEventListener('keyup', keyUp);
document.addEventListener('keydown', keyDown);

//Left,Right,Up,Down,Space,Click
var keyboardKeySet = [false, false, false, false, false, false];

function keyDown(e){
    if (e.code === "ArrowRight" || e.keyCode == 68) keyboardKeySet[1] = true;
    else if (e.code === "ArrowLeft" || e.keyCode == 65) keyboardKeySet[0] = true;
    else if (e.code === "Space") keyboardKeySet[2] = true;
}
function keyUp(e){
    if (e.code === "ArrowRight" || e.keyCode == 68) keyboardKeySet[1] = false;
    else if (e.code === "ArrowLeft" || e.keyCode == 65) keyboardKeySet[0] = false;
    else if (e.code === "Space") keyboardKeySet[2] = false;
}

function changeState(newState){
    currentState = newState;
}

//Stages
var stageCollMap = [
    
]

//Utils
function getMousePos(cv, evt) {
	var rect = cv.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
    }
};

//Starting

main();
render();
