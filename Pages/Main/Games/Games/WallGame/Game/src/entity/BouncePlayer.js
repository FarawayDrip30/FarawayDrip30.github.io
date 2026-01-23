class BouncePlayer extends Entity {

    constructor(_gp, _keyH, _x, _y) {
        super();
        //----------------------------
        this.gp;
        this.keyH;

        this.tileSize;

        this.gravity = 0.2;
        this.lowGravity = 0.1;
        this.highGravity = 0.5;

        this.gravType = 1;
        this.velY = 0;

        this.right = true;

        //-------------------------------
        this.gp = _gp;
        this.keyH = _keyH;

        this.x = _x;
        this.y = _y;
        this.speed = 7;

        this.getPlayerImage();

        this.tileSize = this.gp.tileSize;
    }

    getPlayerImage() {
      this.up1 = g_sprites.b_plu;
      this.up2 = g_sprites.b_pru;
      this.down1 = g_sprites.b_pld;
      this.down2 = g_sprites.b_prd;
    }

    update() {
        let gravType = 1;
        if (
            g_keyH.upPressed ||
            g_keyH.downPressed ||
            g_keyH.leftPressed ||
            g_keyH.rightPressed
        ) {
            if (g_keyH.upPressed) {
                //y -= speed;
                gravType = 2;
            }
            if (g_keyH.downPressed) {
                //y += speed;
                gravType = 3;
            }
            if (g_keyH.leftPressed) {
                this.x -= this.speed;
                this.right = false;
            }
            if (g_keyH.rightPressed) {
                this.x += this.speed;
                this.right = true;
            }

            if (this.x > this.gp.screenWidth - this.tileSize) {
                this.x = this.gp.screenWidth - this.tileSize;
            } else {
                if (this.x < 0) {
                    this.x = 0;
                }
            }
        }
        if (gravType == 1) {
            this.velY += this.gravity;
        } else if (gravType == 2) {
            this.velY += this.lowGravity;
        } else {
            this.velY += this.highGravity;
        }

        this.y += this.velY;

        if (this.y + this.tileSize >= this.gp.screenHeight) {
            this.velY = -10;
        }
    }

    draw(g2) {
        let image;
        if (this.velY > 0) {
            if (this.right) {
                image = this.up2;
            } else {
                image = this.up1;
            }
        } else {
            if (this.right) {
                image = this.down2;
            } else {
                image = this.down1;
            }
        }

        drawImage(g2, image, this.x, this.y, this.tileSize, this.tileSize);
    }
}
