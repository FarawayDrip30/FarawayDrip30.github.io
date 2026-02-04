class Sprite{
    constructor(img, sx, sy, swidth, sheight, x, y, width, height){
        this.img = img;
        this.sx = sx;
        this.sy = sy;
        this.swidth = swidth;
        this.sheight = sheight;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.originX = 0;
        this.originY = 0;
    }

    draw(){
        ctx.drawImage(this.img, this.sx, this.sy, this.swidth, this.sheight, this.x + this.originX, this.y + this.originY, this.width, this.height);
        this.customDraw();
    }

    customDraw(){
        
    }
}

class Alien extends Sprite{
    constructor(img, sx, sy, swidth, sheight, x, y, width, height, keyset){
        super(img, sx, sy, swidth, sheight, x, y, width, height);

        this.keyset = keyset;

        this.maxgroundspeed = 7;
        this.groundaccelleration = 1;
        this.jumpheight = 5;
        this.maxairspeed = 10;
        this.airaccelleration = 0.25;
        this.maxfallspeed = 1;

        this.gravityscale = 0.1;
        this.isGrounded = false;

        this.originX = width/2;
        this.originY = height/2;

        this.velX = 0;
        this.velY = 0;

        this.mousePos = {x:0, y:0};
        this.bulletForce = 2;
    }

    main(){
        if(this.isGrounded){ //On Ground Movement
            if(this.keyset[0] && this.velX > -this.maxgroundspeed){ // Left
                this.velX += -this.groundaccelleration;
            }
            else if(this.keyset[1] && this.velX < this.maxgroundspeed){ // Right
                this.velX += this.groundaccelleration;
            }
            else{
                if(this.velX < 1 && this.velX > -1){
                    this.velX = 0;
                }
                else{
                    if(this.velX < 0)
                        this.velX += this.groundaccelleration;
                    else
                        this.velX -= this.groundaccelleration;
                }
            }
        }
        else{ //Midair Movement
            if(this.keyset[0] && this.velX > -this.maxairspeed){ // Left
                this.velX += -this.airaccelleration;
            }
            else if(this.keyset[1] && this.velX < this.maxairspeed){ // Right
                this.velX += this.airaccelleration;
            }
        }

        if(this.keyset[2] && this.isGrounded){
            this.isGrounded = false;
            this.velY = -this.jumpheight;
        }

        if(this.y < canvas.height - this.height){
            this.velY += this.gravityscale;
        }
        else if(this.velY > 0){
            this.velY = 0;
            this.y = canvas.height - this.height;
            this.isGrounded = true;
        }

        this.x += this.velX * deltaTime;
        this.y += this.velY * deltaTime;
    }

    click(evt){
        if(!this.isGrounded){
            this.mousePos = getMousePos(canvas, evt);
            
            let dx = this.mousePos.x - this.x;
            let dy = this.mousePos.y - this.y;
            
            let angleToMove = Math.atan2(dy,dx);

            this.velX += -Math.cos(angleToMove) * this.bulletForce;
            this.velY += -Math.sin(angleToMove) * this.bulletForce;
        }
    }
}