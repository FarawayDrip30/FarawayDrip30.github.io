class Label{
    constructor(x,y,text){
        this.x = x;
        this.y = y;
        this.text = text;
    }

    draw(){
        ctx.font = "30px Arial";
        ctx.fillStyle = "Black";
        ctx.fillText(this.text,this.x, this.y);
    }
}

class Shape{
    constructor(x,y,width,height,colour){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.colour = colour;
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.colour;
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }
}

class Sprite{
    constructor(img, sx, sy, swidth, sheight, x, y, width, height, originX, originY){
        this.img = img;
        this.sx = sx;
        this.sy = sy;
        this.swidth = swidth;
        this.sheight = sheight;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.originX = originX;
        this.originY = originY;
    }

    draw(){
        ctx.drawImage(this.img,this.sx,this.sy,this.swidth,this.sheight,this.x + this.originX,this.y + this.originY,this.width,this.height)
    }
}


class Button{
    constructor(x,y,bWid,bHei,tWid,tHei,bCol,tCol){
        this.x = x;
        this.y = -200;
        this.ly = y;
        this.velY = 0;
        this.base = new Shape(x-bWid / 2,y + tHei,bWid,bHei,bCol);
        this.button = new Shape(x-tWid/2,y,tWid,tHei,tCol);
        this.falling = true;

        this.tHei = tHei;
    }

    main(){
        if(this.falling){
            if(this.y + this.velY > this.ly){
                this.y = this.ly;
                this.velY = 0;
                this.falling = false;
                this.base.y = this.y + this.tHei;
                this.button.y = this.y;
            }
            else{
                this.velY++;
                this.y += this.velY * timeScale;
                this.base.y = this.y + this.tHei;
                this.button.y = this.y;
            }
        }
    }

    draw(){
        this.button.draw();
        this.base.draw();
        this.customDraw();
    }
    customDraw(){}
}
class LabelledButton extends Button{
    constructor(x,y,bWid,bHei,tWid,tHei,bCol,tCol,text){
        super(x,y,bWid,bHei,tWid,tHei,bCol,tCol);
        this.text = text;
    }
    customDraw(){
        ctx.font = "30px Arial";
        ctx.fillStyle = "Black";
        ctx.fillText(this.text,this.x - 25, this.y + 85);
    }
}

class Meter extends Shape{
    constructor(x,y,width,height,colour,speed){
        super(x,y,width,height,colour);
        this.oWidth = width;

        this.speed = speed;
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.colour;
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.rect(this.x + this.oWidth / 2 - 5, this.y - 5, 10, 20);
        ctx.fill();
    }
}

class Stocks{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.stockHeight = this.height - 20;
        this.oStockHeight = this.stockHeight;

        this.money = 1000;
        this.stocks = 0;
    }

    draw(){
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();

        ctx.font = "20px Arial";
        ctx.fillText("Sell",this.x + 10, this.y + 30);
        ctx.fillText("Buy",this.x + 10, this.y + this.height - 20);
        ctx.fillText("Money: $"+this.money,this.x + 110, this.y + 60);
        ctx.fillText("Stocks: "+this.stocks,this.x + 110, this.y + 100);

        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.rect(this.x + 60, this.y + 10 + this.oStockHeight - this.stockHeight, 40, this.stockHeight);
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.rect(this.x, this.y, this.width, this.height / 2);
        ctx.stroke();
    }

    buy(){
        this.stocks += 1;
        if(this.stockHeight > this.oStockHeight / 2){
            this.money -= 200;
        }
        else{
            this.money -= 50;
        }
    }
    sell(){
        if(this.stocks > 0){
            if(this.stockHeight > this.oStockHeight / 2){
                this.money += 300;
            }
            else{
                this.money += 50;
            }
            this.stocks -= 1;
        }
    }
}


class Grid{
    constructor(gridArray,tileSize,x,y,spriteImage,spriteDimensions){
        this.gridArray = gridArray;

        this.tileSize = tileSize;

        this.img = spriteImage;
        this.sd = spriteDimensions;

        this.x = x;
        this.y = y;

        this.tileOffset = 0.5;
        this.zoom = 1;

        this.drawEmpties = false;

        this.mouseDown = false;
        this.mouseDownPos = {x:0,y:0};
        this.mouseDownGridPos = {x:0,y:0};

        this.gridHeight = this.gridArray[0].length * this.tileSize;
        this.gridWidth = this.gridArray[0][0].length * this.tileSize;

        this.objectArray = [];
        this.mouseDownObjectsPos = [];
        this.originalObjDimArray = [];
    }

    draw(){
        for(let i = 0; i < this.gridArray.length; i++){
            for(let y = 0; y < this.gridArray[i].length; y++){
                for(let x = 0; x < this.gridArray[i][y].length; x++){
                    let gridValue = this.gridArray[i][y][x];
                    if(gridValue <= 0){
                        if(this.drawEmpties){
                            ctx.beginPath();
                            ctx.rect(this.x + x * this.tileSize - x * this.tileOffset, this.y + y * this.tileSize - y * this.tileOffset, this.tileSize, this.tileSize);
                            ctx.stroke();
                        }
                    }
                    else{
                        ctx.drawImage(this.img[i],this.sd[i][gridValue-1].sx,this.sd[i][gridValue-1].sy,this.sd[i][gridValue-1].swidth,this.sd[i][gridValue-1].sheight,this.x + x * this.tileSize - x * this.tileOffset,this.y + y * this.tileSize - y * this.tileOffset,this.tileSize,this.tileSize);
                    }
                }
            }
        }

        this.objectArray.forEach(tempobject => {
            tempobject.draw();
        })
    }

    addObject(tempobject){
        this.objectArray.push(tempobject);
        this.originalObjDimArray.push({width:tempobject.width,height:tempobject.height});
    }

    gridPosToWorldPos(x,y){
        let tempX = this.x + x * this.tileSize - x * this.tileOffset;
        let tempY = this.y + y * this.tileSize - y * this.tileOffset;
        return {x:tempX, y:tempY};
    }

    worldPosToGridPos(x,y){
        let tempX = (this.x-x)/(this.tileOffset-this.tileSize)
        let tempY = (this.y-y)/(this.tileOffset-this.tileSize)
        return {x:tempX, y:tempY};
    }

    onMouseDown(evt){
        this.mouseDown = true;
        this.mouseDownPos = getMousePos(canvas,evt);
        this.mouseDownGridPos = {x:this.x, y:this.y}
        this.mouseDownObjectsPos = [];
        for(let i = 0; i < this.objectArray.length; i++){
            this.mouseDownObjectsPos.push({x:this.objectArray[i].x,y:this.objectArray[i].y});
        };
    }
    mouseUp(){
        this.mouseDown = false;
    }

    mouseMove(evt){
        if(this.mouseDown){
            let mousePos = getMousePos(canvas,evt);

            let newX = mousePos.x - this.mouseDownPos.x + this.mouseDownGridPos.x
            let newY = mousePos.y - this.mouseDownPos.y + this.mouseDownGridPos.y

            if(newY < 720 && newY + this.gridHeight > 0 && newX < 1280 && newX + this.gridWidth > 0){
                this.x = newX;
                this.y = newY;

                for(let i = 0; i < this.objectArray.length; i++){
                    this.objectArray[i].x = mousePos.x - this.mouseDownPos.x + this.mouseDownObjectsPos[i].x;
                    this.objectArray[i].y = mousePos.y - this.mouseDownPos.y + this.mouseDownObjectsPos[i].y;
                };
            }
        }
    }

    mouseWheelScroll(evt){
        let mousePosY = evt.offsetY;
        let mousePosX = evt.offsetX;

        let oldWidth = this.gridArray[0][0].length * this.tileSize;
        let oldHeight = this.gridArray[0].length * this.tileSize;

        let mousePercentX = 100 / (((mousePosX - this.x) / oldWidth) * 100);
        let mousePercentY = 100 / (((mousePosY - this.y) / oldHeight) * 100);

        let tempSizeAdjust = 0;

        let oldObjectsGridPos = [];
        this.objectArray.forEach(tempobject => {
            oldObjectsGridPos.push(this.worldPosToGridPos(tempobject.x,tempobject.y));
        });

        if(evt.deltaY > 0 && this.zoom >= -3){
            tempSizeAdjust = -1;
            this.zoom -= 0.1;
        }
        else if(evt.deltaY < 0 && this.zoom <= 3){
            tempSizeAdjust = 1;
            this.zoom += 0.1;
        }

        this.tileSize += tempSizeAdjust;

        let newWidth = this.gridArray[0][0].length * this.tileSize;
        let newHeight = this.gridArray[0].length * this.tileSize;
        
        let tempRecalculationX = (oldWidth - newWidth) / mousePercentX;
        let tempRecalculationY = (oldHeight - newHeight) / mousePercentY;

        this.x += tempRecalculationX;
        this.y += tempRecalculationY;

        if(this.zoom >= 1){
            this.tileOffset = this.zoom;
        }

        this.mouseDownObjectsPos = [];
        for(let i = 0; i < this.objectArray.length; i++){
            this.objectArray[i].width += tempSizeAdjust
            this.objectArray[i].height += tempSizeAdjust

            let tempPos = this.gridPosToWorldPos(oldObjectsGridPos[i].x,oldObjectsGridPos[i].y);
            this.objectArray[i].x = tempPos.x;
            this.objectArray[i].y = tempPos.y;

            this.mouseDownObjectsPos.push({x:this.objectArray[i].x,y:this.objectArray[i].y});
        }

        this.gridHeight = newHeight;
        this.gridWidth = newWidth;

        this.mouseDownGridPos = {x:this.x, y:this.y}
        this.mouseDownPos = getMousePos(canvas,evt);
              
    }

    inSquare(mousePos, gridIndex){
        for(let y = 0; y < this.gridArray[gridIndex].length; y++){
            if(mousePos.y >= this.y + y * this.tileSize - y * this.tileOffset && mousePos.y <= this.y + y * this.tileSize - y * this.tileOffset + this.tileSize){
                for(let x = 0; x < this.gridArray[gridIndex][y].length; x++){
                    if(mousePos.x >= this.x + x * this.tileSize - x * this.tileOffset && mousePos.x <= this.x + x * this.tileSize - x * this.tileOffset + this.tileSize){
                        return {x:x,y:y,isTrue:true};
                    }
                }
            }
        }
        return {x:0,y:0,isTrue:false};
    }

    squareObjectIn(object){

    }
}