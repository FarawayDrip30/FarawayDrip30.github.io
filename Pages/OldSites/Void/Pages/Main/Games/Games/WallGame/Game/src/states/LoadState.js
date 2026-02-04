class LoadState extends State{
	constructor(_gamePanel) {
		super(_gamePanel);

		//-------------------------------

		this.titleState;

  	this.loadingFont = "100px serif";
  	this.warningFont = "20px serif";
  	this.toStartFont = "30px serif";

  	this.canStart = false;

	}

	update() {
		if(!this.canStart) {
		  if(g_sprites_all_loaded && g_sounds_all_loaded){
				console.log("LOADED");
				this.canStart = true;
			}
		}
		else {
			if(this.gamePanel.mouseH.parentState == null) {
				this.gamePanel.mouseH.parentState = this;
			}

			if(g_keyH != null) {
			  console.log(g_keyH.startPressed);
				if(g_keyH.startPressed) {
					g_keyH.startPressed = false;
					this.gamePanel.currentState = new NewgroundsState(this.gamePanel);
				}
				if(g_mouseH.down) {
					g_mouseH.down = false;
					this.gamePanel.currentState = new NewgroundsState(this.gamePanel);
				}
			}
		}
	}

	draw(g2) {
	  //console.log(g2);
		g2.fillStyle = "RED";
		fillRect(g2, 0, 0, this.gamePanel.screenWidth, this.gamePanel.screenHeight);

		g2.fillStyle = "BLACK";
		g2.font = this.loadingFont;
		drawString(g2, "LOADING...", 150, 300);
		g2.font = this.warningFont;
		drawString(g2, "(Epilepsy Warning)", 400, 320);

		if(this.canStart) {
			g2.font = this.toStartFont;
			drawString(g2, "--Enter/Click To Start--", 250, 400);
		}

		//g2.dispose();
	}
}
