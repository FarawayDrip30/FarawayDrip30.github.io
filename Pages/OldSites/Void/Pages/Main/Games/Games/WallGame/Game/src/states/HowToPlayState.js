class HowToPlayState extends State{
	constructor(_gamePanel) {
		super(_gamePanel);

		//--------------------------------------------
		this.image;

		this.selections = ["TitleScreen","Replay"];
		this.selectionMenu = new SelectionMenu(250,400,this.selections,this.gamePanel.keyH,this.gamePanel.mouseH);

		//this.soundPaths = ["/sound/Please help me good sir my dog has turned into jelly.wav"];
		this.soundHandler = new SoundHandler();
		//--------------------------------------------

		this.image = g_sprites.how_to_play;

		this.soundHandler.playSound("please",0,true);
	}

	update() {
		if(g_keyH.startPressed) {
			this.soundHandler.stopSound(0);
			g_keyH.startPressed = false;
			this.gamePanel.currentState = new TitleState(this.gamePanel);
		}
		if(g_mouseH.down) {
			this.soundHandler.stopSound(0);
			g_mouseH.down = false;
			this.gamePanel.currentState = new TitleState(this.gamePanel);
		}
	}

	draw(g2) {
		drawImage(g2, this.image,0,0,this.gamePanel.screenWidth,this.gamePanel.screenHeight);
	}
}
