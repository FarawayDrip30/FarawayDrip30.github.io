class SelectionMenu {
	constructor(_x, _y, _selections, _keyH, _mouseH) {
    this.x;
  	this.y;

  	this.mouseH;

  	this.selectionFont = "20px serif"
  	this.myG2;

  	this.selections = [];
  	this.selected = 0;
  	this.buttonJustPressed = false;
  	this.upLastPressed = false;

  	this.parentState;

	  //-------------------------------

		this.keyH = _keyH;
		this.mouseH = _mouseH;
		this.x = _x;
		this.y = _y;

		this.selections = _selections;
	}

	checkMouse(_x, _y) {
	  if(!g_mouseH.moving){
			return;
		}
		for(let i = 0; i < this.selections.length; i++) {
			if(_y+20 > this.y + i * 25 && _y+20 < this.y + (i+1)*25) {
				if(this.selections[i] != "") {
					this.selected = i;
				}
				return;
			}
		}
	}

	update() {
		if(this.buttonJustPressed) {
			if(this.upLastPressed) {
				if(!g_keyH.upPressed) {
					this.buttonJustPressed = false;
				}
			}
			else {
				if(!g_keyH.downPressed) {
					this.buttonJustPressed = false;
				}
			}
		}
		else {
			if(g_keyH.downPressed && this.selected+1 < this.selections.length) {
				this.selected++;
				this.buttonJustPressed = true;
				this.upLastPressed = false;
				if(this.selections[this.selected] == "") {
					this.selected++;
				}
			}
			else if(g_keyH.upPressed && this.selected > 0) {
				this.selected--;
				this.buttonJustPressed = true;
				this.upLastPressed = true;
				if(this.selections[this.selected] == "") {
					this.selected--;
				}
			}
		}
		if(g_keyH.startPressed || g_mouseH.down) {
		  g_mouseH.down = false;
			g_keyH.startPressed = false;
			return this.selected;
		}

		return -1;
	}

	draw(g2) {
		g2.font = this.selectionFont;
		g2.fillStyle = "WHITE";
		for(let i = 0; i < this.selections.length; i++) {
			let tempString = this.selections[i];
			if(this.selected == i) {
				tempString = ">".concat(tempString);
			}
			drawString(g2, tempString, this.x, this.y+i*25);
		}

	}
}
