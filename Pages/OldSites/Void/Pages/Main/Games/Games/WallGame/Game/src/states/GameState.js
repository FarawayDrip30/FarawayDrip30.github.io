class GameState extends State{
  constructor(_gamePanel) {
		super(_gamePanel);

		//-------------------------------
		this.player;

		this.thisStateId = 1;

		this.gapSize = 3;
		this.avWallSpeed = 2;
		this.maxWallSpeed = 6;

		this.pauseMenuItems = ["Resume","","Settings","MainMenu"];
		this.pauseMenu = new SelectionMenu(100,100,this.pauseMenuItems,this.gamePanel.keyH,this.gamePanel.mouseH);

		this.paused = false;
		this.inSettings = false;

		this.tutDone = false;
		this.tutText = "Press W/A/S/D or UP/LEFT/DOWN/RIGHT to Move.";
		this.tutTextX = 200;

		this.walls = [new Wall(),new Wall()];
		this.burnedWalls = [new BurnedWall(), new BurnedWall(), new BurnedWall(), new BurnedWall()];
		this.burnedWallId = 0;

		this.wallDoneCounter = 0;
		this.lastWallHor = true;

		this.score = 0;
		this.scoreX = 100;
		this.scoreY = 100;

		this.lives = 3;

		this.tookDamageCounter = 0;

		this.livesFont = "32px serif";
		this.scoreFont = "96px serif";
		this.screamFont = "196px serif";
		this.tutFont = "16px consolas";

		this.backColour = 0.1;

		this.owchImg;
		this.owchImgs = [null,null,null,null];

		this.horizontalWallsEnabled = true;
		this.oppositeWallsEnabled = false;

		//this.soundPaths = ["/sound/fizz.wav"];
		this.soundHandler = new SoundHandler();
		//this.soundPaths2 = ["/sound/scream.wav"];
		//this.soundHandler2 = new SoundHandler(this.soundPaths2);
		//
		this.settingsMenu = new SettingsMenu(100,100,this.gamePanel.keyH,this.gamePanel.mouseH,this.soundHandler);
		//--------------------------------------------------


		this.player = new Player(_gamePanel, _gamePanel.keyH, _gamePanel.screenWidth/2 - _gamePanel.tileSize/2, _gamePanel.screenHeight/2-_gamePanel.tileSize/2);
		this.backColour = Math.random();

		this.owchImg = g_sprites.owch;

		g_keyH.startPressed = false;
		this.gamePanel.mouseH.parentState = this;

		this.medalText = "";
		this.medalTicksMax = 60 * 5;
		this.medalTicks = this.medalTicksMax;

		this.startMusic(this.soundHandler);
	}


	startMusic() {
	  this.soundHandler.playSound("motherfucker",0,true)
	}

	changeWall(i) {
		let tempHor = true;
		let tempScreenV = this.gamePanel.screenHeight;
		let tempScreenW = this.gamePanel.screenWidth;

		let from0 = true;

		//let tempColour = "#" + (Math.floor(Math.random() * 16777216).toString(16)).padStart(6, '0') //"#100000"// Math.floor(Math.random() * 0x10000000));
		let tempColour = RGBtoHex(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255));

		let otherI = 0;
		if(i == 0) {
			otherI = 1;
		}

		if(Math.random() >= 0.5 || !this.horizontalWallsEnabled) {
			tempHor = false;
			tempScreenV = this.gamePanel.screenWidth;
			tempScreenW = this.gamePanel.screenHeight;
		}
		if(Math.random() >= 0.5) {
			from0 = false;
		}

		if(!this.oppositeWallsEnabled) {
			if(this.walls[otherI].horizontal == tempHor) {
				if(this.walls[otherI].from0 != from0) {
					from0 = !from0;
				}
			}
		}

		this.walls[i].changeValues(Math.floor(Math.random()*(tempScreenW-this.gapSize*this.gamePanel.tileSize)),this.gapSize+Math.floor(Math.random()),tempHor,this.avWallSpeed,tempScreenV,tempColour,from0,this.gamePanel.tileSize);

		this.lastWallHor = tempHor;
	}

	checkTut() {
		if(g_keyH.upPressed || g_keyH.downPressed || g_keyH.leftPressed || g_keyH.rightPressed) {
			this.tutDone = true;
		}
	}

	update() {
	  this.mouseMoved(g_mouseH);

		if(!this.paused) {
			if(g_keyH.startPressed == true) {
				this.paused = true;
				g_keyH.startPressed = false;
			}

			this.player.update();

			if(this.wallDoneCounter > 0) {
				this.wallDoneCounter--;
			}
			if(this.tookDamageCounter > 0) {
				this.tookDamageCounter--;
			}

			if(!this.tutDone) {
				this.checkTut();
			}
			else {
				for(let i = 0; i < this.walls.length; i++) {
					let scored = this.walls[i].update(this.player.x,this.player.y,this.gamePanel.tileSize);
					if(scored == 1) {
						this.score++;
						this.soundHandler.playSound("fizz",1);

						if(ng_usingNewgrounds){
						  let medalSteps = [10,25,50,100];
							for(let s = 0; s < medalSteps.length; s++){
							  if(this.score >= medalSteps[s] && !ng_medalsGot[medalStarts[this.thisStateId-1] + medalSteps[s].toString()]){
							    NGIO.unlockMedal(medalNameToId[ medalStarts[this.thisStateId-1] + medalSteps[s].toString() ], earnedMedal);
                  ng_medalsGot[medalStarts[this.thisStateId-1] + medalSteps[s].toString()] = true;
								}
							}
						}

						this.burnedWalls[this.burnedWallId].setWall(this.walls[i].horizontal, this.walls[i].v, this.walls[i].gapV, this.walls[i].gapSize, this.gamePanel.tileSize, this.walls[i].screenV, true);
						this.burnedWalls[this.burnedWallId+1].setWall(this.walls[i].horizontal, this.walls[i].v, this.walls[i].gapV, this.walls[i].gapSize, this.gamePanel.tileSize, this.walls[i].screenV, false);
						this.burnedWallId += 2;
						while(this.burnedWallId >= 4) {
							this.burnedWallId -= 4;
						}

						this.scoreX = Math.floor(Math.random() * this.gamePanel.screenWidth);
						this.scoreY = Math.floor(Math.random() * this.gamePanel.screenHeight);
					}
					else if(scored == 2) {
						if(this.tookDamageCounter <= 0) {
							if(this.lives <= 0) {
								this.soundHandler.stopSound(0);
								this.gamePanel.currentState = new GameOverState(this.gamePanel,this.score,this.thisStateId);
							}
							else {
								this.lives--;
								this.soundHandler.playSound("scream", 2);
							}
							this.tookDamageCounter = 60;


							for(let tempOwImg = 0; tempOwImg < this.owchImgs.length; tempOwImg++) {
							  this.owchImgs[tempOwImg] = new Image();
								let owchRGB = HSVtoRGB((Math.random()), 0.9, 0.9);
								g_recolourCanvas.width = g_sprites.owch.width;
								g_recolourCanvas.height = g_sprites.owch.height;
								g_recolourCtx.drawImage(g_sprites.owch, 0, 0);
								let imgData = g_recolourCtx.getImageData(0,0,g_recolourCanvas.width,g_recolourCanvas.height);
								let d = imgData.data;
								for (let i = 0; i < d.length; i += 4) {
								  if(d[i+3] != 0){
										d[i] = owchRGB.r;
										d[i+1] = owchRGB.g;
										d[i+2] = owchRGB.b;
									}
					    	}
								g_recolourCtx.putImageData(imgData, 0, 0);
								this.owchImgs[tempOwImg].src = g_recolourCanvas.toDataURL();
							}
						}
					}
					if(this.walls[i].paused) {
						if(this.avWallSpeed < this.maxWallSpeed) {
							this.avWallSpeed += 0.05;
						}
						this.walls[i].v = 100000;
						if(this.wallDoneCounter <= 0) {
							this.changeWall(i);
							this.wallDoneCounter = 20;
						}
					}
				}
			}
			if(this.backColour < 1) {
				this.backColour += 0.001;
			}
			else {
				this.backColour = 0;
			}

			for(let i = 0; i < this.burnedWalls.length; i++) {
				this.burnedWalls[i].update();
			}

			this.medalTicks--;
			if(this.medalTicks < 0){
			  this.medalText = "";
			}
		}
		else {
			/*if(gamePanel.keyH.startPressed == true) {
				paused = false;
				gamePanel.keyH.startPressed = false;
			}*/
			if(this.inSettings){
			  let selInt = this.settingsMenu.update();
				if(selInt == 0){
				  this.inSettings = false;
				}
			}
			else{
			  let selInt = this.pauseMenu.update();
  			if(selInt >= 0) {
  				g_keyH.startPressed = false;
  			}
  			switch(selInt) {
  				case 0:
  					this.paused = false;
  					break;
          case 2:
            this.inSettings = true;
            break;
  				case 3:
  				  this.soundHandler.stopSound(0);
  					this.gamePanel.currentState = new TitleState(this.gamePanel);
  					break;
  				case 4:
  					this.gamePanel.close();
  					break;
  			}
			}
		}
		//System.out.println(FPS);
	}

	draw(g2) {
	  let tCol = HSVtoRGB(this.backColour, 0.5, 0.5);
		g2.fillStyle = RGBtoHex(tCol.r,tCol.g,tCol.b);
		fillRect(g2, 0, 0, this.gamePanel.screenWidth, this.gamePanel.screenHeight);

		for(let i = 0; i < this.walls.length; i++) {
			this.walls[i].draw(g2, this.gamePanel.tileSize, this.gamePanel.scale);
		}
		for(let i = 0; i < this.burnedWalls.length; i++) {
			this.burnedWalls[i].draw(g2, this.gamePanel.tileSize, this.gamePanel.scale);
		}

		this.player.draw(g2);

		g2.fillStyle = "black";
		g2.font = this.livesFont;
	  drawString(g2, "LIVES: " + this.lives, 10, 30);

	  if(!this.tutDone) {
	    g2.font = this.tutFont;
	    drawString(g2, this.tutText, this.tutTextX, 250);
	  }

		g2.fillStyle = "red";
		g2.font = this.scoreFont;
	  drawString(g2, this.score+"", Math.floor(this.scoreX+(this.getSpeedRandom())), Math.floor(this.scoreY+(this.getSpeedRandom())));

	  if(this.tookDamageCounter > 0) {
	    for(let ow = 0; ow < this.owchImgs.length; ow++) {
	    	drawImage(g2, this.owchImgs[ow], Math.floor(20+(this.getSpeedRandom())), Math.floor(200+(this.getSpeedRandom())),750,200);
	    }
	  }


		g2.fillStyle = "blue";
		g2.font = this.livesFont;
		drawString(g2, this.medalText, 320, 500);

	  if(this.paused) {
			g2.globalAlpha = 0.5;
	    g2.fillStyle = "rgb(0,0,0)";
	    fillRect(g2, 0, 0, this.gamePanel.screenWidth, this.gamePanel.screenHeight);

			if(this.inSettings){
			  this.settingsMenu.draw(g2);
			}
			else{
	      this.pauseMenu.draw(g2);
			}
			g2.globalAlpha = 1;
	  }


		//g2.dispose();
	}

	movePlayer(e) {

	}

	mouseMoved(e) {
		if(this.paused) {
		  if(this.inSettings){
				this.settingsMenu.checkMouse(e.x,e.y);
			}
			else{
			  this.pauseMenu.checkMouse(e.x, e.y);
			}
		}
		this.movePlayer(e);
	}

	getSpeedRandom() {
		if(!this.paused) {
			return ((Math.random()*this.avWallSpeed-this.avWallSpeed)*this.avWallSpeed);
		}
		else {
			return 0.0;
		}
	}


}

function earnedMedal(medal){
	  g_gamePanel.currentState.medalTicks = g_gamePanel.currentState.medalTicksMax;
	  g_gamePanel.currentState.medalText = "Unlocked Medal " + medal.name
}
