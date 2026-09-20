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
    end(){

    }
}

class PlayState extends State{
    constructor(){
        super();
        
        this.body = new Sprite(createImage("Assets/Sprites/microfigures/default.png"),0,0,577,432,0,0,577,432,0,0);
        this.eyelashes = new Sprite(createImage("Assets/Sprites/eyelashes.png"),0,0,577,432,0,0,577,432,0,0)
        this.hat = new Sprite(createImage("Assets/Sprites/hats/alien.png"),0,0,577,432,0,0,577,432,0,0);
    }
    render(){
        clearScreen();
        this.body.draw();
        if(eyelashesOn){
            this.eyelashes.draw();
        }
        if(wearingHat)
            this.hat.draw();
    }
}