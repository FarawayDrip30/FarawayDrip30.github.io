class Wall {
	constructor() {
  	this.v;
  	this.gapV;
  	this.gapSize;
  	this.horizontal;
  	this.speed;

  	this.screenV;
  	this.paused = true;
  	this.from0;

  	this.wallColour;
	};

	changeValues(_gapV, _gapSize, _horizontal, _speed, _screenV, _wallColour, _from0, tileSize) {
		this.paused = false;

		this.from0 = _from0;
		this.screenV = _screenV;
		if(this.from0) {
			this.v = 0-tileSize;
			this.speed = _speed;
		}
		else {
			this.v = _screenV;
			this.speed = -_speed;
		}

		this.gapV = _gapV;
		this.gapSize = _gapSize;

		this.horizontal = _horizontal;

		/*
		let tCol = HextoRGB(_wallColour);
		console.log(tCol);
		tCol.r *= 1.4;
		tCol.r = Math.min(Math.floor(tCol.r), 255);
		tCol.g *= 1.4;
		tCol.g = Math.min(Math.floor(tCol.g), 255);
		tCol.b *= 1.4;
		tCol.b = Math.min(Math.floor(tCol.b), 255);
		this.wallColour = RGBtoHex(tCol.r, tCol.g, tCol.b);
		console.log(tCol);
		console.log(this.wallColour);
		*/

		this.wallColour = _wallColour;

		this.burnedValue();
	}

	burnedValue() {

	}

	update(playerX,playerY,tileSize) {
		if(!this.paused) {
			if(this.from0) {
				if(this.v > this.screenV) {
					this.paused = true;
				}
			}
			else {
				if(this.v < 0-tileSize) {
					this.paused = true;
				}
			}
			this.v += this.speed;
			if(this.horizontal) {
				let inWall = false;
				if(this.from0) {
					if(playerY < this.v && playerY > this.v - tileSize) {
						inWall = true;
					}
				}
				else {
					if(playerY > this.v && playerY < this.v + tileSize) {
						inWall = true;
					}
				}
				if(inWall) {
					this.paused = true;
					if(playerX+tileSize/2 > this.gapV && playerX < (this.gapV + this.gapSize*tileSize)) {
						return 1;
					}
					else {
						return 2;
					}
				}
			}
			else {
				let inWall = false;
				if(this.from0) {
					if(playerX < this.v && playerX > this.v - tileSize) {
						inWall = true;
					}
				}
				else {
					if(playerX > this.v && playerX < this.v + tileSize) {
						inWall = true;
					}
				}
				if(inWall) {
					this.paused = true;
					if(playerY+tileSize/2 > this.gapV && playerY < (this.gapV + this.gapSize*tileSize)) {
						return 1;
					}
					else {
						return 2;
					}
				}
			}
		}
		return 0;
	}

	draw(g2, tileSize, pixelSize) {
		if(this.horizontal) {
			g2.fillStyle = "black";
			fillRect(g2, 0, this.v, this.gapV, tileSize);
			fillRect(g2, this.gapV+this.gapSize*tileSize,this.v,this.screenV*2,tileSize);

			g2.fillStyle = this.wallColour;
			fillRect(g2, 0, this.v+pixelSize, this.gapV-pixelSize, tileSize-pixelSize*2);
			fillRect(g2, this.gapV+this.gapSize*tileSize+pixelSize,this.v+pixelSize,this.screenV*2,tileSize-pixelSize*2);
		}
		else {
			g2.fillStyle = "black";
			fillRect(g2, this.v, 0, tileSize, this.gapV);
			fillRect(g2, this.v,this.gapV+this.gapSize*tileSize,tileSize,this.screenV*2);

			g2.fillStyle = this.wallColour;
			fillRect(g2, this.v+pixelSize, 0, tileSize-pixelSize*2, this.gapV-pixelSize);
			fillRect(g2, this.v+pixelSize,this.gapV+this.gapSize*tileSize+pixelSize,tileSize-pixelSize*2,this.screenV*2);
		}
	}
}
