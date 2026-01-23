class BurnedWall{


	constructor() {
  	this.x = 0;
  	this.y = 0;
  	this.width = 0;
  	this.height = 0;

  	this.velX = 0;
  	this.velY = 0;
  	this.gravity = 1;

  	this.isVisible = true;
  	this.maxVisibleTick = 3;
  	this.visibleTick = this.maxVisibleTick;
	}

	setWall(_horizontal, _v, _gapV, _gapSize, _tileSize, _screenV, wall1) {
		this.velX = Math.floor(Math.random() * 10) - 10;
		this.velY = -Math.floor(Math.random() * 10);
		if(wall1) {
			if(_horizontal) {
				this.x = 0;
				this.y = _v;
				this.width = _gapV;
				this.height = _tileSize;
			}
			else {
				this.x = _v;
				this.y = 0;
				this.width = _tileSize;
				this.height = _gapV;
			}
		}
		else {
			if(_horizontal) {
				this.x = _gapV + _gapSize*_tileSize;
				this.y = _v;
				this.width = _screenV*2;
				this.height = _tileSize;
			}
			else {
				this.x = _v;
				this.y = _gapV + _gapSize*_tileSize;
				this.width = _tileSize;
				this.height = _screenV*2;
			}
		}
	}

	update() {
		this.x += this.velX;
		this.y += this.velY;
		this.velY += this.gravity;
	}

	draw(g2, tileSize, pixelSize) {
		if(this.isVisible) {
			g2.fillStyle = "black";
			fillRect(g2, this.x, this.y, this.width, this.height);

			g2.fillStyle = "#333333";
			fillRect(g2, this.x + pixelSize, this.y + pixelSize, this.width - pixelSize * 2, this.height - pixelSize * 2);
		}
		this.visibleTick--;
		if(this.visibleTick < 0) {
			this.visibleTick = this.maxVisibleTick;
			this.isVisible = !this.isVisible;
		}


		/*
		if(horizontal) {
			g2.setColor(Color.BLACK);
			g2.fillRect(0, v, gapV, tileSize);
			g2.fillRect(gapV+gapSize*tileSize,v,screenV*2,tileSize);

			g2.setColor(wallColour);
			g2.fillRect(0, v+pixelSize, gapV-pixelSize, tileSize-pixelSize*2);
			g2.fillRect(gapV+gapSize*tileSize+pixelSize,v+pixelSize,screenV*2,tileSize-pixelSize*2);
		}
		else {
			g2.setColor(Color.BLACK);
			g2.fillRect(v, 0, tileSize, gapV);
			g2.fillRect(v,gapV+gapSize*tileSize,tileSize,screenV*2);

			g2.setColor(wallColour);
			g2.fillRect(v+pixelSize, 0, tileSize-pixelSize*2, gapV-pixelSize);
			g2.fillRect(v+pixelSize,gapV+gapSize*tileSize+pixelSize,tileSize-pixelSize*2,screenV*2);
		}
		*/
	}
}
