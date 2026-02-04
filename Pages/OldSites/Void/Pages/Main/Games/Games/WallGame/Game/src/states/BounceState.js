class BounceState extends GameState{

	constructor(_gamePanel) {
		super(_gamePanel);

		this.horizontalWallsEnabled = false;
		//oppositeWallsEnabled = true;

		this.maxWallSpeed = 5;

		this.tutTextX = 0;
		this.tutText = "A/LEFT, D/RIGHT to Move Left & Right, W/UP to Jump Higher or Fall Slower, S/DOWN to Jump Lower of Fall Faster.";
		this.tutFont = "12px consolas";

		console.log("MAKING PLAYER");
		console.log(this.gamePanel)
		this.player = new BouncePlayer(this.gamePanel,this.gamePanel.keyH,this.gamePanel.screenWidth/2-this.gamePanel.tileSize/2,this.gamePanel.screenHeight/2-this.gamePanel.tileSize/2);

		this.thisStateId = 3;
	}

	startMusic() {
		 this.soundHandler.playSound("devil",0,true);
	}

}
