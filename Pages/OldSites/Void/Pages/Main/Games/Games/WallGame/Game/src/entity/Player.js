class Player extends Entity {
  constructor(_gp, _keyH, _x, _y) {
    super();

    this.gp;
    this.keyH;

    this.tileSize;

    //----------------
		this.gp = _gp;
		this.keyH = _keyH;

		this.x = _x;
		this.y = _y;
		this.speed = 7;

		this.direction = "down";

		this.getPlayerImage();

		this.tileSize = this.gp.tileSize;
	}

	getPlayerImage() {
		this.up1 = g_sprites.pu_1;
		this.up2 = g_sprites.pu_2;
		this.down1 = g_sprites.pd_1;
		this.down2 = g_sprites.pd_2;
		this.left1 = g_sprites.pl_1;
		this.left2 = g_sprites.pl_2;
		this.right1 = g_sprites.pr_1;
		this.right2 = g_sprites.pr_2;
	}

	update() {
		if(g_keyH.upPressed || g_keyH.downPressed || g_keyH.leftPressed || g_keyH.rightPressed) {
			if(g_keyH.upPressed) {
				this.direction = "up";
				this.y -= this.speed;
			}
			if(g_keyH.downPressed) {
				this.direction = "down";
				this.y += this.speed;
			}
			if(g_keyH.leftPressed) {
				this.direction = "left";
				this.x -= this.speed;
			}
			if(g_keyH.rightPressed) {
				this.direction = "right";
				this.x += this.speed;
			}

			if(this.x > this.gp.screenWidth) {
				this.x = 0-this.tileSize;
			}
			else {
				if(this.x < 0-this.tileSize) {
					this.x = this.gp.screenWidth;
				}
			}
			if(this.y > this.gp.screenHeight) {
				this.y = 0-this.tileSize;
			}
			else {
				if(this.y < 0-this.tileSize) {
					this.y = this.gp.screenHeight;
				}
			}

			this.spriteCounter++;
			if(this.spriteCounter > 8) {
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

	draw(g2) {
		//g2.setColor(Color.white);
		//g2.fillRect(this.x, this.y, tileSize, tileSize);

		let image = null;

		switch(this.direction) {
		case "up":
			if(this.spriteNum == 1) {
				image = this.up1;
			}else {
				image = this.up2;
			}
			break;
		case "down":
			if(this.spriteNum == 1) {
				image = this.down1;
			}else {
				image = this.down2;
			}
			break;
		case "left":
			if(this.spriteNum == 1) {
				image = this.left1;
			}else {
				image = this.left2;
			}
			break;
		case "right":
			if(this.spriteNum == 1) {
				image = this.right1;
			}else {
				image = this.right2;
			}
			break;
		}

		drawImage(g2, image,this.x,this.y,this.tileSize,this.tileSize);
	}

}

console.log("PLAYER LOADED")
