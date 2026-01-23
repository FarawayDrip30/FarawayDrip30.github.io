var ng_scoreboardIndexToId = [
  15497,
  15498,
  15499
];

class GameOverState extends State{

	constructor(_gamePanel, _score, _stateId) {
		super(_gamePanel);
		//-----------------------------------
		this.score;
		this.hscore;

		this.stateId;

		this.gameOverFont = "100px serif";
		this.scoreFont = "30px serif";

		this.selections = ["TitleScreen","Replay"];
		this.selectionMenu = new SelectionMenu(250,400,this.selections,this.gamePanel.keyH,this.gamePanel.mouseH);

		this.soundPaths = ["/sound/Food banks.wav"];
		this.soundHandler = new SoundHandler(this.soundPaths);
		//------------------------------------------

		this.hscore = SaveObject.getScore(_stateId);

		this.score = _score;

		if(this.score > this.hscore) {
			this.hscore = this.score;
			SaveObject.saveToFile(_stateId, _score);
		}

		if(ng_usingNewgrounds){
		  NGIO.postScore(ng_scoreboardIndexToId[_stateId-1], this.score);
		}

		this.stateId = _stateId;

		this.gamePanel.mouseH.parentState = this;

		this.soundHandler.playSound("food",0,true);
	}

	update() {
    this.selectionMenu.checkMouse(g_mouseH.x,g_mouseH.y);
		let selectionMade = this.selectionMenu.update();
		if(selectionMade != -1) {
			this.soundHandler.stopSound(0);
			switch(selectionMade) {
			case 0:
				this.gamePanel.currentState = new TitleState(this.gamePanel);
				break;
			case 1:
				if(this.stateId == 1) {
					this.gamePanel.currentState = new GameState(this.gamePanel);
				}
				else if(this.stateId == 2) {
					this.gamePanel.currentState = new MouseState(this.gamePanel);
				}
				else if(this.stateId == 3) {
					this.gamePanel.currentState = new BounceState(this.gamePanel);
				}
				break;
			}
		}
	}

	mouseMoved(e) {
		this.selectionMenu.checkMouse(e.clientX,e.clientY);
	}

	draw(g2) {
		g2.fillStyle = "orange";
		fillRect(g2, 0, 0, this.gamePanel.screenWidth, this.gamePanel.screenHeight);

		g2.fillStyle = "white";

		g2.font = this.gameOverFont;
		drawString(g2, "GAMEOVER", 100, 300);

		g2.font = this.scoreFont;
		drawString(g2, "Score: " + this.score, 150, 330);
		drawString(g2, "HighScore: " + this.hscore, 150, 360);

		this.selectionMenu.draw(g2);
	}
}
