var canvas = document.getElementById("EpicoCanvas");
var ctx = canvas.getContext("2d");

var speechAudio = new Audio();
var ambience = new Audio();
ambience.volume = 0.2;
ambience.loop = true;

ambience.src = "Assets/Audio/Ambience.mp3";

var redIntro = new Audio();
redIntro.src = "Assets/Audio/Red Intro.wav";
var blueIntro = new Audio();
blueIntro.src = "Assets/Audio/Blue Intro.wav";
var pinkIntro = new Audio();
pinkIntro.src = "Assets/Audio/Pink Intro.wav";
var stockIntro = new Audio();
stockIntro.src = "Assets/Audio/Stock Intro.wav";
var endWav = new Audio();
endWav.src = "Assets/Audio/End.wav";
var TTS = new Audio();
TTS.src = "Assets/Audio/speech.mp3";

var endImage = new Sprite(createImage("Assets/Sprites/endworld.jpg"),0,0,852,480,365,100,550,400,0,0);

canvas.addEventListener("click", onClick);
canvas.addEventListener("mousedown", onMouseDown)
canvas.addEventListener("mouseup", onMouseUp)
canvas.addEventListener("mousemove", onMouseMove)
canvas.addEventListener("touchstart", onMouseDown);
canvas.addEventListener("touchend", onMouseUp);
document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);

var currentState = new MenuState();
var mousePos = {x:0,y:0};

var isInfinite = true;

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
function onMouseMove(evt){
    currentState.onMouseMove(evt);
}
function onKeyDown(evt){
    currentState.onKeyDown(evt);
}
function onKeyUp(evt){
    currentState.onKeyUp(evt);
}

main()
render()