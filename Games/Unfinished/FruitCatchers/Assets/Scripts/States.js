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
    onMouseDown(evt){

    }
    onMouseUp(evt){

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
        this.playButton = new Shape(canvas.width/2-150,canvas.height/2-50,300,100,"black");
    }

    render(){
        clearScreen();
        this.playButton.draw();
    }

    onClick(evt){
        let mousePos = getMousePos(canvas,evt);
        if(isInRect(mousePos.x,mousePos.y,this.playButton.x,this.playButton.y,this.playButton.width,this.playButton.height)){
            changeState(new PlayState());
        }
    }
}

class PlayState extends State{
    constructor(){
        super();

        this.speed = 15;

        let pwidth = 115.2;
        let pheight = 86.6;
        this.player = new Sprite(createImage("Assets/Sprites/beepbeeplosers.png"),0,0,576,433,canvas.width / 2 - pwidth / 2,canvas.height - pheight,pwidth,pheight,0,0);

        this.items = [];
        this.itemToRemove = null;
        this.itemspeed = 5;
        this.timeToSpawn = 50;
        this.spawnTimer = 0

        this.score = 0;
        this.scoreText = new Text("Score: 0",10,30,30,"Arial","black");

        this.lives = 3;
        this.livesText = new Text("Lives: 3",10,60,30,"Arial","black");

        this.rightPressed = false;
        this.leftPressed = false;
    }
    main(){
        if(this.rightPressed){
            if(this.player.x + this.player.width > canvas.width == false)
                this.player.x += this.speed * timeScale;
        }
        else if(this.leftPressed){
            if(this.player.x < 0 == false)
                this.player.x -= this.speed * timeScale;
        }

        if(this.spawnTimer > this.timeToSpawn){
            this.spawnTimer = 0;
            this.spawnItem();
        }
        else{
            this.spawnTimer += timeScale;
        }


        let itemsToRemove = []

        for(let i = 0; i < this.items.length; i++){
            this.items[i].y += this.itemspeed * timeScale;
            if(this.items[i].y > this.player.y-10){
                if(this.items[i].y > canvas.height){
                    itemsToRemove.push(i);
                    if(this.items[i].points > 0){
                        if(this.lives > 0){
                            this.lives -= 1;
                            this.livesText.text = "Lives: " + this.lives.toString();
                        }
                        else{
                            changeState(new MenuState());
                        }
                    }
                }
                if(this.items[i].x < this.player.x + this.player.width && this.items[i].x > this.player.x - this.items[i].width){
                    this.score += this.items[i].points;
                    this.scoreText.text = "Score: " + this.score.toString();
                    itemsToRemove.push(i);
                }
            }
            
        }
        for(let i = 0; i < itemsToRemove.length; i++){
            this.items = removeItemFromArray(itemsToRemove[i],this.items);
        }
    }
    render(){
        clearScreen();
        this.player.draw();
        this.items.forEach(function(item){item.draw()});
        this.scoreText.draw();
        this.livesText.draw();
    }
    onMouseDown(evt){
        this.mouseDown = true;
        if(getMousePos(canvas,evt).x > canvas.width / 2){
            this.rightPressed = true;
        }
        else{
            this.leftPressed = true;
        }
    }
    onMouseUp(evt){
        this.rightPressed = false;
        this.leftPressed = false;
    }
    onKeyDown(evt){
        if(evt.keyCode == 37){
            this.leftPressed = true;
        }
        else if(evt.keyCode == 39){
            this.rightPressed = true;
        }
    }
    onKeyUp(evt){
        if(evt.keyCode == 37){
            this.leftPressed = false;
        }
        else if(evt.keyCode == 39){
            this.rightPressed = false;
        }
    }
    spawnItem(){
        if(this.timeToSpawn > 25){this.timeToSpawn -= 0.1;}
        let rand = Math.random() * 159;
        if(rand < 50){
            this.items.push(new Fruit(Math.random()*(canvas.width-50),-50,"yellow",2,false));
            return;
        }
        else{
            rand -= 50;
        }

        if(rand < 33){this.items.push(new Fruit(Math.random()*(canvas.width-50),-50,"brown",3,false)); return;}else{rand -= 33}
        if(rand < 33){this.items.push(new Fruit(Math.random()*(canvas.width-50),-50,"black",-5,false)); return;}else{rand -= 33}
        if(rand < 20){this.items.push(new Fruit(Math.random()*(canvas.width-50),-50,"orange",5,false)); return;}else{rand -= 20}
        if(rand < 13){this.items.push(new Fruit(Math.random()*(canvas.width-50),-50,"green",6,false)); return;}else{rand -= 13}
        if(rand < 10){this.items.push(new Fruit(Math.random()*(canvas.width-50),-50,"blue",10,false)); return;}else{rand -= 10}

        this.items.push(new Fruit(Math.random()*(canvas.width-50),-50,"yellow",2,false)); return;
        
    }
}