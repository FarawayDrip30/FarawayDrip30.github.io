class KeyHandler{
	constructor(){
  	this.upPressed = false;
  	this.downPressed = false;
  	this.leftPressed = false;
  	this.rightPressed = false;
  	this.startPressed = false;

	  //-----------------------------------

	  document.addEventListener("keydown", this.keyPressed);
		//document.addEventListener("keyup", this.keyReleased);
	}

	keyTyped(e) {
		// TODO Auto-generated method stub

	}

	keyPressed(e) {
		let code = e.key;

		if(code == 'w' || code == 'ArrowUp') {
			this.upPressed = true;
		}
		if(code == 's' || code == 'ArrowDown') {
			this.downPressed = true;
		}
		if(code == 'a' || code == 'ArrowLeft') {
			this.leftPressed = true;
		}
		if(code == 'd' || code == 'ArrowRight') {
			this.rightPressed = true;
		}

		if(code == ' ' || code == 'Enter' || code == 'Escape') {
		  console.log("start");
			this.startPressed = true;
			console.log(this.startPressed);
			console.log(g_keyH);
			console.log(g_keyH.getStartPressed());
		}
	}

	keyReleased(e) {
		let code = e.key;

		if(code == KeyEvent.VK_W || code == KeyEvent.VK_UP) {
			this.upPressed = false;
		}
		if(code == KeyEvent.VK_S || code == KeyEvent.VK_DOWN) {
			this.downPressed = false;
		}
		if(code == KeyEvent.VK_A || code == KeyEvent.VK_LEFT) {
			this.leftPressed = false;
		}
		if(code == KeyEvent.VK_D || code == KeyEvent.VK_RIGHT) {
			this.rightPressed = false;
		}

		if(code == KeyEvent.VK_SPACE || code == KeyEvent.VK_ENTER) {
			this.startPressed = false;
		}
	}

	getStartPressed(){
	  return this.startPressed;
	}

}
