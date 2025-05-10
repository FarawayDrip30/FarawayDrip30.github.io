function resize_block_canvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize_block_canvas);

function start_blocks(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var canvasImg = new Image();

    resize_block_canvas();

    function drawRectangle(x,y,w,h,c){
        ctx.beginPath();
        ctx.fillStyle = c;
        ctx.rect(x,y,w,h);
        ctx.fill();
        ctx.closePath();
    }

    
    function drawScreen(){
        let middleSpaceStartX = canvas.width / 2 - (canvas.width / 5);
        let middleSpaceStartY = canvas.height / 2 - (canvas.height / 5);
        let middleSpaceEndX = canvas.width / 2 + (canvas.width / 5);
        let middleSpaceEndY = canvas.height / 2 + (canvas.height / 5);

        let colourValue = 255;
        let red = Math.floor(Math.random() * colourValue);
        let green = Math.floor(Math.random() * colourValue);
        let blue = Math.floor(Math.random() * colourValue);

        for(var i = 0; i < 16; i++){
            let x = Math.random() * canvas.width - 100;
            let y = Math.random() * canvas.height - 100;
            if(!(x > middleSpaceStartX && y > middleSpaceStartY && x < middleSpaceEndX && y < middleSpaceEndY)){
                drawRectangle(
                    x,
                    y,
                    Math.random() * 100 + 50, 
                    Math.random() * 100 + 50,
                    "#"+(red).toString(16)+(green).toString(16)+(blue).toString(16)
                );
            }
        }

        canvasImg.src = canvas.toDataURL();
    }

    canvasImg.onload = function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);

        let shrinkMult = 0.02;
        let shrinkSizeX = canvas.width * shrinkMult;
        let shrinkSizeY = canvas.height * shrinkMult;
        let shrinkWidth = canvas.width - (shrinkSizeX * 2);
        let shrinkHeight = canvas.height - (shrinkSizeY * 2);
        
        ctx.globalAlpha = 0.8;
        ctx.drawImage(canvasImg,shrinkSizeX,shrinkSizeY,shrinkWidth,shrinkHeight);

        setTimeout(drawScreen, 1000/60)
    }

    drawScreen();
}