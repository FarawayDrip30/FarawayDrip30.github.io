class HighScoresState extends State{


	constructor(_gamePanel) {
		super(_gamePanel);

		//----------------------------
		this.hscore1;
		this.hscore2;
		this.hscore3 = 0;

		this.titleFont = "60px serif";
		this.scoreFont = "30px serif";

		this.soundPaths = ["/sound/At least you are alive in real life.wav"];
		this.soundHandler = new SoundHandler(this.soundPaths);
		//----------------------------

		this.hscore1 = SaveObject.getScore(1);
		this.hscore2 = SaveObject.getScore(2);
		this.hscore3 = SaveObject.getScore(3);

		this.soundHandler.playSound("alive",0,true);
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
		g2.fillStyle = "cyan";
		fillRect(g2, 0, 0, this.gamePanel.screenWidth, this.gamePanel.screenHeight);

		g2.fillStyle = "black";

		g2.font = this.titleFont;
		drawString(g2, "HIGHSCORES", 50, 150);

		g2.font = this.scoreFont;
		drawString(g2, "WallGame: " + this.hscore1, 50, 230);
		drawString(g2, "MouseGame: " + this.hscore2, 50, 260);
		drawString(g2, "BounceGame: " + this.hscore3, 50, 290);

		drawString(g2, "Click/Space to Return to Menu", 50, 400);
	}
}
