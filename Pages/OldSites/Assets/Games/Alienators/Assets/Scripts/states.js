class State{
    constructor(){

    }

    main(){

    }

    render(){

    }

    onClick(evt){

    }
}

class TitleScreenState extends State{
    constructor(){
        super();

        let titleimage = new Image();
        titleimage.src = "../Assets/Sprites/Titlescreen.png";
        this.titlesprite = new Sprite(titleimage, 0, 0, 1280, 720, 0, 0, 1280, 720);
    }

    main(){
        //console.log(keyboardKeySet);
    }

    render(){
        clearScreen();
        this.titlesprite.draw();
    }

    onClick(evt){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        changeState(new VersusState());
    }
}

class VersusState extends State{
    constructor(){
        super();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let titleimage = new Image();
        titleimage.src = "../Assets/Sprites/wigglysteve.png";
        this.alien1 = new Alien(titleimage, 0, 0, 100, 100, 0, 0, 65, 65, keyboardKeySet);

        let stageimage = new Image();
        stageimage.src = "../Assets/Sprites/Stages/Colliseum/colliseum_beta.png"
        this.stage = new Sprite(stageimage,0,0,1280,720,0,0,1280,720);
    }

    main(){
        this.alien1.main();
    }

    render(){
        clearScreen();
        this.stage.draw();
        this.alien1.draw();
    }

    onClick(evt){
        this.alien1.click(evt);
    }
}