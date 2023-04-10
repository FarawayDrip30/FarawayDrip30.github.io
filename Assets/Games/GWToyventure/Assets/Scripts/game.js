var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function drawSprite(sprite,x,y,width,height){
    ctx.drawImage(sprite,x,y,width,height);
}
ctx.font = "15px Arial";
function drawText(text,x,y){
    ctx.fillText(text, x, y);
}

var loadedImages = 0;
var imagesToLoad = 8;
function createImage(src){
    let tempImage = new Image();
    tempImage.src = src;
    tempImage.onload = function(){loadedImages++; if(loadedImages >= imagesToLoad){
        initValues()
        titleScreen()
        drawTitle()
    }}
    return tempImage;
}

function clearScreen(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function clearEventListeners(){
    return;
}

var audioCtx = new(window.AudioContext || window.webkitAudioContext)();

function playNote(frequency, duration) {
  // create Oscillator node
  let oscillator = audioCtx.createOscillator();
  let gainNode = audioCtx.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  gainNode.gain.value = 0.1;

  oscillator.type = 'square';
  oscillator.frequency.value = frequency; // value in hertz
  oscillator.connect(audioCtx.destination);
  oscillator.start();

  setTimeout(
    function() {
      oscillator.stop();
    }, duration);
}

var logo = createImage("Assets/Sprites/logo.png")

var microfigure = createImage("Assets/Sprites/microfigure.png")
var emptyMicrofigure = createImage("Assets/Sprites/emptymicrofigure.png")

var brick = createImage("Assets/Sprites/brick.png")
var emptyBrick = createImage("Assets/Sprites/emptybrick.png")

var heart = createImage("Assets/Sprites/heart.png")
var emptyHeart = createImage("Assets/Sprites/emptyheart.png")

var gameOverSprite = createImage("Assets/Sprites/gameover.png")

var movePitch = 220

var brickTimer = null
var state = 0;
var playing = false

var brickColumns = 5
var brickRows = 4

var bricks = [ [false,false,false,false], [false,false,false,false], [false,false,false,false], [false,false,false,false], [false,false,false,false] ]
var playerPos = 3

var leftPressed = false
var rightPressed = false

var timerDelay = 1000
var delayDecrease = 10
var delayMin = 400
var bricksPerSpawn = 1

var bestScore = 0
var score = 0

var health = 3
function initValues(){
    brickColumns = 5
    brickRows = 4

    bricks = [ [false,false,false,false], [false,false,false,false], [false,false,false,false], [false,false,false,false], [false,false,false,false] ]
    playerPos = 3

    leftPressed = false
    rightPressed = false

    timerDelay = 1000
    delayDecrease = 10
    delayMin = 400
    bricksPerSpawn = 1

    score = 0

    health = 3
}

function brickUpdate(){
    for(let y = brickRows-1; y >= 0; y--){
        for(let x = brickColumns-1; x >= 0; x--){
            if(bricks[x][y] == true)
            {
                bricks[x][y] = false
                if(y < brickRows-1) {
                    bricks[x][y+1] = true
                }
                else{
                    if(x == playerPos-1)
                    {
                        console.log(x)
                        console.log(playerPos)
                        health -= 1
                        playNoise(60)
                    }
                }
            }
        }
    }
    for(let i = 0;i<bricksPerSpawn;i++)
    {
        let newBrickX = Math.random();
        newBrickX = Math.ceil(newBrickX * brickColumns)-1;
        console.log(newBrickX)
        bricks[newBrickX][0] = true;
    }
    
    if(timerDelay >= delayMin + delayDecrease){ timerDelay -= delayDecrease }else{ bricksPerSpawn = 2 }
    score += 10;
    brickTimer = setTimeout(function(){brickUpdate()},timerDelay);
    
    drawScreen();

    if(health < 0) {
        gameOver();
    }
}

function gameOver(){
    if(score > bestScore){bestScore = score}

    clearTimeout(brickTimer);
    clearScreen();
    clearEventListeners();
    gameOverInputHandlers();
    //playdate.display.setInverted(true)

    drawSprite(gameOverSprite,75,10,250,131)
    
    drawText("Press A to Retry",150,215)
    drawText("Press B to Return to the Menu",105,240)

    drawText("SCORE: " + score.toString(),115,170)
    drawText("BEST: " + bestScore.toString(),120,185)
}

function drawScreen(){
    clearScreen();
    for(let y = 0;y<brickRows;y++){
        for(let x = 0;x<brickColumns;x++){
            if(bricks[x][y] == true)
            {
                drawSprite(brick,x*60+60,y*40,50,50);
            }else{
                drawSprite(emptyBrick,x*60+60,y*40,50,50);
            }
        }
    }

    for(let i = 1;i<brickColumns+1;i++)
    {
        if(i == playerPos)
        {
            drawSprite(microfigure,i*60-5,170,60,60);
        }else{
            drawSprite(emptyMicrofigure,i*60-5,170,60,60);
        }
    }

    for(h = 0; h < 3;h++)
    {
        if(h <= health-1)
        {
            drawSprite(heart,5,h*50+5,50,50);
        }else{
            drawSprite(emptyHeart,5,h*50+5,50,50);
        }
    }
    drawText(score,355,20)
}

function playNoise(pitch){
    playNote(pitch,100)
}

document.addEventListener("keydown",function(e){
    if(state == 0){
        if(e.code == "KeyA"){
            startGame();
        }
    }
    else if(state == 1){
        if(e.code == "ArrowRight"){
            if(playerPos < brickColumns){
                playerPos++;
                drawScreen();
                playNoise(movePitch);
            }
        }
        else if(e.code == "ArrowLeft"){
            if (playerPos-1 > 0){
                playerPos--;
                drawScreen();
                playNoise(movePitch);
            }
        }
    }
    else if(state == 2){
        document.addEventListener("keydown",function(e){
            if(e.code == "KeyA"){
                startGame();
            }
            else if(e.code == "KeyB"){
                titleScreen();
            }
        })
    }
})
function gameInputHandlers() {
    state = 1;
}
function titleInputHandlers() {
    state = 0;
}
function gameOverInputHandlers() {
    state = 2;
}

function drawTitle(){
    clearScreen();
    //playdate.display.setInverted(false)
    drawSprite(logo,50,10,300,131)
    drawSprite(microfigure,50,140,100,100);
    
    drawText("Press A to Start",150,175)
}

function titleScreen(){
    drawTitle();
    clearEventListeners();
    titleInputHandlers();
}

function startGame(){
    clearScreen();
    //playdate.display.setInverted(false)
    initValues()
    drawScreen()
    brickUpdate()
    clearEventListeners();
    gameInputHandlers();
    playNoise(400)
}

