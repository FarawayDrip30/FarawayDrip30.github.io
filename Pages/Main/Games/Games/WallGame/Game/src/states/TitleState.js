class TitleState extends State{



	constructor(_gamePanel) {
		super(_gamePanel);

		console.log(NGIO.medals);
		//--------------------------------

		this.titleFont = "60px serif";
		this.loadingFont = "12px serif";

  	this.title = "WallGame";

    this.inSettings = false;
  	this.selections = ["WallGame","MouseGame","BounceGame","","HowToPlay","HighScores", "", "Settings"];
    //if(!ng_usingNewgrounds){ this.selections.push("Connect to Newgrounds"); }
  	this.selectionMenu;

  	//this.soundPaths = ["/sound/The only thing I can see around me is ocean.wav"];
  	this.soundHandler = new SoundHandler();

    //-----------------------------------

    SaveObject.init();

		this.selectionMenu = new SelectionMenu(250,200,this.selections,this.gamePanel.keyH,this.gamePanel.mouseH);
		this.settingsMenu = new SettingsMenu(250,200,this.gamePanel.keyH, this.gamePanel.mouseH,this.soundHandler);

		console.log(this.gamePanel.mouseH);
		this.gamePanel.mouseH.parentState = this;

		this.soundHandler.playSound("ocean", 0, true);



	}

	mouseMoved(e) {
	  console.log("mouse moved")

	}

	update() {
	  if(!this.inSettings){
  	  this.selectionMenu.checkMouse(g_mouseH.x,g_mouseH.y);
  		let selectionMade = this.selectionMenu.update();
  		//                        ensure we got save data
  		if(selectionMade != -1 && g_data_loaded) {
  			if(selectionMade != 7){ this.soundHandler.stopSound(0); }
  			switch(selectionMade) {
  			case 0:
  				this.gamePanel.currentState = new GameState(this.gamePanel);
  				break;
  			case 1:
  				this.gamePanel.currentState = new MouseState(this.gamePanel);
  				break;
  			case 2:
  				this.gamePanel.currentState = new BounceState(this.gamePanel);
  				break;
  			case 4:
  				this.gamePanel.currentState = new HowToPlayState(this.gamePanel);
  				break;
  			case 5:
  				this.gamePanel.currentState = new HighScoresState(this.gamePanel);
  				break;
  			//case 6:
  			//	this.gamePanel.close();
  			//	break;
  			case 7:
  			  /*console.log("NEWGROUNDS");
  			  this.gamePanel.currentState = new NewgroundsState(this.gamePanel);*/
          this.inSettings = true;
  				break;
  			}
  		}
		}
		else{
		  this.settingsMenu.checkMouse(g_mouseH.x,g_mouseH.y);
		  let selectionMade = this.settingsMenu.update();
			if(selectionMade == 0){
			  this.inSettings = false;
			}
		}
	}

	draw(g2) {
		g2.fillStyle = "#0000b2";
		fillRect(g2, 0, 0, this.gamePanel.screenWidth, this.gamePanel.screenHeight);

		g2.font = this.titleFont;
		g2.fillStyle = "black";
		let lastCharX = 250;
		for(let i = 0; i < this.title.length; i++) {
			let newX = lastCharX;
			if(i > 0) {
				newX += g2.measureText(""+this.title[i-1]).width;
			}
			let sineWave = Math.sin(i*50+Date.now()/120);
			let hsb = HSVtoRGB(i*0.1, 0.8, 0.8);
			g2.fillStyle = "rgb("+hsb.r+","+hsb.g+","+hsb.b+")";
			drawString(g2, ""+this.title[i], newX, (100+(sineWave)*10));
			lastCharX = newX;
		}

		if(!g_data_loaded){
		  g2.fillStyle = "white";
			g2.font = this.loadingFont;
		  drawString(g2, "Loading Save Data...", 10, 16);
		}

		if(this.inSettings){
		  this.settingsMenu.draw(g2);
		}
		else{
		  this.selectionMenu.draw(g2);
		}

		//g2.dispose();
	}
}
