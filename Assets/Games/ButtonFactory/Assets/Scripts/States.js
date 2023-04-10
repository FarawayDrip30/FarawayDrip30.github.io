function changeState(state){
    currentState.end();
    currentState = state;
}

class State{
    constructor(){

    }

    main(){

    }
    render(){

    }
    onClick(evt){

    }
    onMouseMove(evt){
        
    }
    onMouseDown(evt){
        
    }
    onMouseUp(evt){
        
    }
    onMouseWheel(evt){
        
    }
    onKeyDown(evt){

    }
    onKeyUp(evt){

    }
    end(){

    }
}

class MenuState extends State{
    constructor(){
        super();
        this.background = new Shape(0,0,canvas.width,canvas.height,"#FFBF58");
        this.table = new Shape(50,600,1180,120,"#A57927");
        this.buttons = [new Button(300,400,400,100,300,100,"grey","red"),
            new Button(canvas.width - 300,400,400,100,300,100,"grey","blue")];
        this.selectedButton = null;
        this.buttons.forEach(button => {
            button.y = button.ly;
            button.falling = false;
        })
    }

    render(){
        clearScreen();
        this.background.draw();
        this.table.draw();

        this.buttons.forEach(button => {
            button.draw();
        })

        ctx.fillStyle = "black";
        ctx.font = "120px Berlin Sans FB";
        ctx.fillText("Button Factory",250,150);
        ctx.font = "20px Arial";
        ctx.fillText("By FarawayDrip30",250,175);
        ctx.fillStyle = "white";
        ctx.font = "60px Arial";
        ctx.fillText("Play",240,575);
        ctx.fillText("Infinite",900,575);
    }

    onMouseMove(evt){
        mousePos = getMousePos(canvas,evt);
        for(let i = 0; i < this.buttons.length; i++){
            if(mousePos.x < this.buttons[i].x + this.buttons[i].base.width / 2 && mousePos.x > this.buttons[i].x - this.buttons[i].base.width / 2
            && mousePos.y < this.buttons[i].y + this.buttons[i].base.height + this.buttons[i].button.height && mousePos.y > this.buttons[i].y){
                canvas.style.cursor = 'grab';
                return;
            }
            else{
                canvas.style.cursor = 'default';
            }
        }
    }
    onMouseDown(evt){
        for(let i = 0; i < this.buttons.length; i++){
            if(mousePos.x < this.buttons[i].x + this.buttons[i].base.width / 2 && mousePos.x > this.buttons[i].x - this.buttons[i].base.width / 2
            && mousePos.y < this.buttons[i].y + this.buttons[i].base.height + this.buttons[i].button.height && mousePos.y > this.buttons[i].y){
                this.buttons[i].button.y += this.buttons[i].base.height / 2;
                this.selectedButton = i;
                switch(i){
                    case 0:
                        isInfinite = false;
                        break;
                    case 1:
                        isInfinite = true;
                        break;
                }
                return;
            }
        }
    }
    onMouseUp(evt){
        if(this.selectedButton != null){
            this.buttons[this.selectedButton].button.y -= this.buttons[this.selectedButton].base.height / 2;
            this.selectedButton = null;
            canvas.style.cursor = 'default';
            changeState(new PlayState());
        }
    }
}

var speechTimeout;
class PlayState extends State{
    constructor(){
        super();

        ambience.play();
        ambience.volume = 0.2;

        canvas.style.cursor = 'default';

        this.background = new Shape(0,0,canvas.width,canvas.height,"#e2bc86");
        this.screen = new Shape(365,100,550,400,"white");

        this.table = new Shape(100,670,1080,50,"#935D26");
        this.leftShelf = new Shape(25,460,250,50,"#935D26");
        
        this.meters = [];
        this.buttons = [];
        if(isInfinite){
            this.meters = [
                new Meter(380,120,510,50,"red",3),
                new Meter(380,190,510,50,"blue",2),
                new Meter(380,260,510,50,"#ff5fe9",10),
                new Stocks(500,330,250,150)
            ];
            this.buttons = [
                new Button(canvas.width / 2,canvas.height - 150,200,50,150,50,"grey","red"),
                new Button(canvas.width / 2 + 250,canvas.height - 150,200,50,150,50,"grey","blue"),
                new Button(canvas.width / 2 - 250,canvas.height - 150,200,50,150,50,"grey","#ff5fe9"),

                new LabelledButton(100,canvas.height / 2,100,50,75,50,"grey","lime","Sell"),
                new LabelledButton(200,canvas.height / 2,100,50,75,50,"grey","green","Buy")
            ];
        }
        this.selectedButton = null;

        this.bluePressed = false;
        this.pinkTimer = Math.random() * 1000 + 100;
        this.stockTimer = 30;

        this.moneyTimer = 20;
        if(isInfinite){
            setTimeout(function(){
                currentState.moneyTimer = 50;
            },20000);
        }
        
        if(!isInfinite){
            speechAudio = redIntro;
            speechAudio.volume = 0.4
            speechTimeout = setTimeout(function(){
                speechAudio.play();
                speechTimeout = setTimeout(function(){
                    if(currentState.buttons.length == 0){
                        currentState.buttons.push(new Button(canvas.width / 2,canvas.height - 150,200,50,150,50,"grey","red"));
                        currentState.meters.push(new Meter(380,120,510,50,"red",3));
                        speechTimeout = setTimeout(function(){
                            speechAudio = blueIntro;
                            speechAudio.play();
                            speechTimeout = setTimeout(function(){
                                currentState.buttons.push(new Button(canvas.width / 2 + 250,canvas.height - 150,200,50,150,50,"grey","blue"));
                                currentState.meters.push(new Meter(380,190,510,50,"blue",2));
                                speechTimeout = setTimeout(function(){
                                    speechAudio = pinkIntro;
                                    speechAudio.play();
                                    speechTimeout = setTimeout(function(){
                                        currentState.buttons.push(new Button(canvas.width / 2 - 250,canvas.height - 150,200,50,150,50,"grey","#ff5fe9"),);
                                        currentState.meters.push(new Meter(380,260,510,50,"#ff5fe9",10));
                                        speechTimeout = setTimeout(function(){
                                            speechAudio = stockIntro;
                                            speechAudio.play();
                                            speechTimeout = setTimeout(function(){
                                                currentState.buttons.push(new LabelledButton(100,canvas.height / 2,100,50,75,50,"grey","lime","Sell"));
                                                currentState.buttons.push(new LabelledButton(200,canvas.height / 2,100,50,75,50,"grey","green","Buy"));
                                                currentState.meters.push(new Stocks(380,330,250,150));
                                                ambience.volume = 0.1
                                                speechTimeout = setTimeout(function(){
                                                    currentState.moneyTimer = 50;
                                                    ambience.volume = 0;
                                                    speechTimeout = setTimeout(function(){
                                                        speechAudio = endWav;
                                                        speechAudio.play();
                                                        speechTimeout = setTimeout(function(){
                                                            changeState(new EndState());
                                                        },21500);
                                                    },60000);
                                                },40000);
                                            },20000);
                                        },40000);
                                    },10000);
                                },50000);
                            },15000);
                        },35000);
                    }
                },16000);
            },1000);
        }

        if(isInfinite){
            this.time = 0;
            this.timeInterval = setInterval(function(){currentState.time++},1000);
        }
    }
    main(){
        this.buttons.forEach(button => {
            button.main();
        });
        if(this.meters.length >= 1){
                this.meters[0].width -= timeScale * this.meters[0].speed;
                if(this.meters[0].width <= 0){this.gameOver();}
        }
        if(this.meters.length >= 2){
                if(!this.bluePressed){this.meters[1].width -= timeScale * this.meters[1].speed}
                else{if(this.meters[1].width + timeScale * this.meters[1].speed * 2 < this.meters[1].oWidth){this.meters[1].width += timeScale * this.meters[1].speed * 2}}
                if(this.meters[1].width <= 0){this.gameOver();}
        }
        if(this.meters.length >=3){
                if(this.pinkTimer <= 0){
                    this.meters[2].width -= timeScale * this.meters[2].speed;
                }else{this.pinkTimer -= timeScale}
                if(this.meters[2].width <= 0){this.gameOver();}
        }
        if(this.meters.length >= 4){
                if(this.stockTimer <= 0){
                    if(this.meters[3].money < 300){
                        if(this.meters[3].stocks == 0){
                            this.meters[3].stockHeight = this.meters[3].oStockHeight / 2 - Math.random() * 25;
                        }
                        else{
                            this.meters[3].stockHeight = this.meters[3].oStockHeight / 2 + Math.random() * 25;
                        }
                    }
                    else{
                        if(this.meters[3].stockHeight > 50){
                            if(this.meters[3].stockHeight < 130){
                                this.meters[3].stockHeight += timeScale * Math.random() * 50 - 25;
                            }
                            else{
                                this.meters[3].stockHeight -= 50;
                            }
                        }
                        else{
                            this.meters[3].stockHeight += 50;
                        }
                        
                        
                    }
                    this.meters[3].money -= this.moneyTimer;
                    this.stockTimer = 30;
                }else{this.stockTimer -= timeScale}
                if(this.meters[3].money < 0){
                    this.gameOver();
                }
            }
    }
    render(){
        clearScreen();
        this.background.draw();
        this.screen.draw();
        this.table.draw();
        this.leftShelf.draw();
        this.meters.forEach(meter => {
            meter.draw();
        });
        this.buttons.forEach(button => {
            button.draw();
        });
        if(isInfinite){
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.fillText(this.time.toString(),10, 30);
        }
    }
    onMouseMove(evt){
        mousePos = getMousePos(canvas,evt);
        for(let i = 0; i < this.buttons.length; i++){
            if(mousePos.x < this.buttons[i].x + this.buttons[i].base.width / 2 && mousePos.x > this.buttons[i].x - this.buttons[i].base.width / 2
            && mousePos.y < this.buttons[i].y + this.buttons[i].base.height + this.buttons[i].button.height && mousePos.y > this.buttons[i].y){
                canvas.style.cursor = 'grab';
                return;
            }
            else{
                canvas.style.cursor = 'default';
            }
        }
    }
    onMouseDown(evt){
        for(let i = 0; i < this.buttons.length; i++){
            if(mousePos.x < this.buttons[i].x + this.buttons[i].base.width / 2 && mousePos.x > this.buttons[i].x - this.buttons[i].base.width / 2
            && mousePos.y < this.buttons[i].y + this.buttons[i].base.height + this.buttons[i].button.height && mousePos.y > this.buttons[i].y){
                this.buttons[i].button.y += this.buttons[i].base.height / 2;
                this.selectedButton = i;
                switch(i){
                    case 0:
                        if(this.overHalfCheck(0)){this.meters[0].width = this.meters[0].oWidth};
                        break;
                    case 1:
                        if(this.overHalfCheck(1)){this.bluePressed = true;}
                        break;
                    case 2:
                        if(this.overHalfCheck(2)){this.restartPink()}
                        break;
                    case 3:
                        this.meters[3].sell();
                        break;
                    case 4:
                        this.meters[3].buy();
                }
                return;
            }
        }
    }
    onMouseUp(evt){
        if(this.selectedButton != null){
            this.buttons[this.selectedButton].button.y -= this.buttons[this.selectedButton].base.height / 2;
            this.selectedButton = null;
        }
        this.bluePressed = false;
    }
    overHalfCheck(meter){
        if(this.meters[meter].width < this.meters[meter].oWidth / 2 + 5){
            return true;
        }
        else{
            this.gameOver();
        }
    }
    restartPink(){
        this.pinkTimer = Math.random() * 1000 + 100;
        this.meters[2].width = this.meters[2].oWidth
    }
    gameOver(reason){
        changeState(new GameOverState());
        speechAudio.pause();
        speechAudio.currentTime = 0;
        clearTimeout(speechTimeout);
        ambience.pause();
        ambience.currentTime = 0;
        //console.log("Game Over");
        //console.log(timeScale);
    }
}

class GameOverState extends State{
    constructor(){
        super();
        this.playButton = new Shape(canvas.width/2-150,canvas.height/2-50,300,100,"white");
        this.background = new Shape(0,0,canvas.width,canvas.height,"black");
        canvas.style.cursor = 'default';

        this.table = new Shape(50,600,1180,120,"#A57927");
        this.buttons = [new Button(300,400,400,100,300,100,"grey","red"),
            new Button(canvas.width - 300,400,400,100,300,100,"grey","blue")];

        this.selectedButton = null;
        this.buttons.forEach(button => {
            button.y = button.ly;
            button.falling = false;
        })
    }

    render(){
        clearScreen();
        this.background.draw();

        this.buttons.forEach(button => {
            button.draw();
        });

        ctx.fillStyle = "red";
        ctx.font = "120px Berlin Sans FB";
        ctx.fillText("You're Fired!",325,150);

        ctx.font = "60px Arial";
        ctx.fillStyle = "White";
        ctx.fillText("Replay",200,575);
        ctx.fillText("Menu",900,580);

        this.table.draw();
    }

    onMouseMove(evt){
        mousePos = getMousePos(canvas,evt);
        for(let i = 0; i < this.buttons.length; i++){
            if(mousePos.x < this.buttons[i].x + this.buttons[i].base.width / 2 && mousePos.x > this.buttons[i].x - this.buttons[i].base.width / 2
            && mousePos.y < this.buttons[i].y + this.buttons[i].base.height + this.buttons[i].button.height && mousePos.y > this.buttons[i].y){
                canvas.style.cursor = 'grab';
                return;
            }
            else{
                canvas.style.cursor = 'default';
            }
        }
    }
    onMouseDown(evt){
        for(let i = 0; i < this.buttons.length; i++){
            if(mousePos.x < this.buttons[i].x + this.buttons[i].base.width / 2 && mousePos.x > this.buttons[i].x - this.buttons[i].base.width / 2
            && mousePos.y < this.buttons[i].y + this.buttons[i].base.height + this.buttons[i].button.height && mousePos.y > this.buttons[i].y){
                this.buttons[i].button.y += this.buttons[i].base.height / 2;
                this.selectedButton = i;
                return;
            }
        }
    }
    onMouseUp(evt){
        if(this.selectedButton != null){
            if(this.selectedButton == 0){
                changeState(new PlayState());
            }
            else{
                changeState(new MenuState());
            }
            this.buttons[this.selectedButton].button.y -= this.buttons[this.selectedButton].base.height / 2;
            this.selectedButton = null;
            canvas.style.cursor = 'default';
        }
    }
}

class EndState extends State{
    constructor(){
        super();

        this.overlayAlpha = 1;

        this.background = new Shape(0,0,canvas.width,canvas.height,"#bbbbbb");
        this.topOverlay = new Shape(0,0,canvas.width,100,"#bbbbbb");
        this.screen = new Shape(365,100,550,400,"#bbbbbb");
        this.outside = endImage;

        this.started = false;
        this.reveal = false;

        this.buttons = [];
        this.table = new Shape(50,600,1180,120,"#A57927");

        setTimeout(function(){
            currentState.started = true;
            setTimeout(function(){
                speechAudio = TTS;
                speechAudio.play();
                setTimeout(function(){
                    currentState.reveal = true;
                },4000);
                setTimeout(function(){
                    currentState.buttons.push(new Button(canvas.width / 2,canvas.height - 150,200,50,150,50,"grey","red"));
                },21000);
            }),2000;
        },5000);
    }

    main(){
        this.buttons.forEach(button => {
            button.main();
        });
        if(this.started){
            this.overlayAlpha -= 0.01 * timeScale;
            if(this.overlayAlpha < 0){this.overlayAlpha = 0;}
        }
        if(this.reveal){
            this.screen.y -= 1 * timeScale;
        }
    }

    render(){
        clearScreen();
        
        ctx.globalAlpha = 1;
        this.background.draw();
        this.outside.draw();
        this.screen.draw();
        this.topOverlay.draw();

        this.table.draw();
        this.buttons.forEach(button => {
            button.draw();
        });

        ctx.globalAlpha = this.overlayAlpha;
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }

    onMouseMove(evt){
        mousePos = getMousePos(canvas,evt);
        for(let i = 0; i < this.buttons.length; i++){
            if(mousePos.x < this.buttons[i].x + this.buttons[i].base.width / 2 && mousePos.x > this.buttons[i].x - this.buttons[i].base.width / 2
            && mousePos.y < this.buttons[i].y + this.buttons[i].base.height + this.buttons[i].button.height && mousePos.y > this.buttons[i].y){
                canvas.style.cursor = 'grab';
                return;
            }
            else{
                canvas.style.cursor = 'default';
            }
        }
    }
    onMouseDown(evt){
        for(let i = 0; i < this.buttons.length; i++){
            if(mousePos.x < this.buttons[i].x + this.buttons[i].base.width / 2 && mousePos.x > this.buttons[i].x - this.buttons[i].base.width / 2
            && mousePos.y < this.buttons[i].y + this.buttons[i].base.height + this.buttons[i].button.height && mousePos.y > this.buttons[i].y){
                this.buttons[i].button.y += this.buttons[i].base.height / 2;
                this.selectedButton = i;
                return;
            }
        }
    }
    onMouseUp(evt){
        if(this.selectedButton != null){
            this.buttons[this.selectedButton].button.y -= this.buttons[this.selectedButton].base.height / 2;
            this.selectedButton = null;
            canvas.style.cursor = 'default';
            changeState(new CreditState());
        }
    }
}

class CreditState extends State {
    constructor(){
        super();
        console.log(currentState);
        this.background = new Shape(0,0,canvas.width,canvas.height,"black");
    }

    render(){
        clearScreen();
        this.background.draw();

        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.font = "120px Berlin Sans FB";
        ctx.fillText("Button Factory",250,canvas.height / 2);
    }

    onClick(){
        changeState(new MenuState());
    }
}