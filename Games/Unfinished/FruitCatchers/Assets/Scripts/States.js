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
        
        this.mouseDown = false;
        this.mouseRight = true;

        this.speed = 15;

        let pwidth = 115.2;
        let pheight = 86.6;
        this.player = new Sprite(createImage("Assets/Sprites/beepbeeplosers.png"),0,0,576,433,canvas.width / 2 - pwidth / 2,canvas.height - pheight,pwidth,pheight,0,0);

        this.items = [];
        this.itemToRemove = null;
        this.itemspeed = 5;
        this.itemSpawnTime = 1000;
        this.spawnTimer = setTimeout(function(){currentState.spawnItem()}, this.itemSpawnTime);

        this.score = 0;
    }
    main(){
        if(this.mouseDown){
            if(this.mouseRight){
                if(this.player.x + this.player.width > canvas.width == false)
                    this.player.x += this.speed * timeScale;
            }
            else{
                if(this.player.x < 0 == false)
                    this.player.x -= this.speed * timeScale;
            }
        }

        let itemsToRemove = []

        for(let i = 0; i < this.items.length; i++){
            this.items[i].y += this.itemspeed * timeScale;
            if(this.items[i].y > this.player.y-10){
                if(this.items[i].y > canvas.height){
                    itemsToRemove.push(i);
                }
                let middle = this.items[i].x + this.items[i].width/2
                if(middle < this.player.x + this.player.width && middle > this.player.x){
                    this.score += 10;
                    console.log("Score: " + this.score);
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
    }
    onMouseDown(evt){
        this.mouseDown = true;
        if(getMousePos(canvas,evt).x > canvas.width / 2){
            this.mouseRight = true;
        }
        else{
            this.mouseRight = false;
        }
    }
    onMouseUp(evt){
        this.mouseDown = false;
    }
    spawnItem(){
        this.spawnTimer = setTimeout(function(){currentState.spawnItem()}, this.itemSpawnTime);
        this.items.push(new Shape(Math.random()*(canvas.width-50),-50,50,50,"red"));
    }
}