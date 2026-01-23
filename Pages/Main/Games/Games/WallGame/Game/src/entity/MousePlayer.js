class MousePlayer extends Player{
	constructor(_gp, _keyH, _x, _y) {
		super(_gp, _keyH, _x, _y);

		this.lastX;
		this.lastY;
		//-------------------
		// TODO Auto-generated constructor stub
		this.direction = "down";
	}

	update() {
		if(this.x != this.lastX || this.y != this.lastY) {
			/*
			int xDiff = lastX - x;
			int yDiff = lastY - y;

			int xDiff2 = xDiff*xDiff;
			int yDiff2 = yDiff*yDiff;

			if(xDiff2 > 25 || yDiff2 > 25) {
				if(xDiff2 > yDiff2) {
					if(x < lastX) {
						direction = "right";
					}
					else {
						direction = "left";
					}
				}
				else {
					direction = "down";
				}
			}
			*/

			this.lastX = this.x;
			this.lastY = this.y;
		}

		this.spriteCounter++;
		if(this.spriteCounter > 2) {
			if(this.spriteNum == 1) {
				this.spriteNum = 2;
			}
			else {
				this.spriteNum = 1;
			}
			this.spriteCounter = 0;
		}
	}
}
