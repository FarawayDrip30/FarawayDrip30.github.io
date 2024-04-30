var canvas = document.getElementById("EpicoCanvas");
var ctx = canvas.getContext("2d");

canvas.addEventListener("click", onClick);
canvas.addEventListener("mousedown", onMouseDown)
canvas.addEventListener("mouseup", onMouseUp)
canvas.addEventListener("touchstart", onMouseDown);
canvas.addEventListener("touchend", onMouseUp);
document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);

var currentState = new MenuState();

function main(){
    getFPS();
    currentState.main();
    requestAnimationFrame(main);
}
function render(){
    currentState.render();
    requestAnimationFrame(render);
}

function onClick(evt){
    currentState.onClick(evt);
}
function onMouseDown(evt){
    currentState.onMouseDown(evt);
}
function onMouseUp(evt){
    currentState.onMouseUp(evt);
}
function onKeyDown(evt){
    currentState.onKeyDown(evt);
}
function onKeyUp(evt){
    currentState.onKeyUp(evt);
}

main()
render()