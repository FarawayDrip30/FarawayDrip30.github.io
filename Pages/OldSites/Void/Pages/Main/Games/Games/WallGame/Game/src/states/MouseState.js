class MouseState extends GameState{
	constructor(_gamePanel) {
		super(_gamePanel);

		this.player = new MousePlayer(this.gamePanel,this.gamePanel.keyH,this.player.x,this.player.y);

		//walls = new Wall[]{new Wall(),new Wall(),new Wall()};

		this.maxWallSpeed = 8;

		this.tutText = "Move the Mouse to Move";

		this.thisStateId = 2;
	}

	checkTut() {

	}

	startMusic() {
		 this.soundHandler.playSound("dolphin", 0,true);
	}

	movePlayer(e) {
		if(!this.paused) {
			this.player.x = e.x-this.gamePanel.tileSize/2;
			this.player.y = e.y;
			//System.out.println(e.getY());
			this.tutDone = true;

			if(e.outside){
			  this.mouseExited(e);
			}
		}
	}

	mouseExited(e) {
		if(!this.paused) {
			this.player.x = 10000;
			this.player.y = 10000;
		}
	}
}
