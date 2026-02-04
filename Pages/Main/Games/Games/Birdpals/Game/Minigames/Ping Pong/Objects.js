class Racket extends PIXI.Sprite{
	constructor(id){
		super(resources.racket.texture);
		this.anchor.set(0.5, 0.5);
		this.collider = new Circle(this.x, this.y, 50);
		this.fx = 0;
		this.fy = 0;
		this.id = id;
		this.lastRotation = 0;
	}

	updateSpeed(evt){
		this.fx = evt.movementX;
		this.fy = evt.movementY;
	}
	
	updateSize(){
		this.scale.set(this.y / 400, this.y / 400);
	}

	hitBall(ball){
		let totalSpeedY = Math.abs(this.speedY);

		if(this.collider.collides(ball.collider) == true && ball.lastHit !== this.id){
			ball.lastHit = this.id;
			if(this.y > ball.y){
				if(totalSpeedY >= 150){
					console.log('Powerfull shot');
				}else{
					console.log('Normal shot');
				}
				ball.move(new Vector(this.fx, this.fy), Math.abs(this.rotation - this.lastRotation), this);
			}else{
				if(totalSpeedY >= 150){
					console.log('Powerfull spin shot');
				}else{
					console.log('Normal spin shot')
				}
				ball.move(new Vector(-this.fx, -this.fy), Math.abs(this.rotation - this.lastRotation), this, 'spin');
			}
		}
	}

	update(ball, speed){
		this.updateSize();
		this.hitBall(ball);
		this.updateSpeed(speed);
	}
}

class Tabble extends PIXI.Sprite{
	constructor(){
		super(resources.tabble.texture);
		this.anchor.set(0.5, 0.5);
		this.x = 500;
		this.y = 300;
	}
}

class Ball extends PIXI.Sprite{
	constructor(){
		super(resources.ball.texture);
		this.anchor.set(0.5, 0.5);
		this.vector = new Vector(500, 350);
		this.x = this.vector.x;
		this.y = this.vector.y;
		this.z = 16; //Controls the height of the ball
		this.radius = 0.004; //Radius of a normal ping pong = 0.004m
		this.collider = new Circle(this.x, this.y, 36);
		app.ticker.add((delta)=>{
			this.scale.set(this.y / 600, this.y / 600); //Gives more depth to the ball's position.
		})
		this.lastHit = '';
	}

	move(Force, rotation, spin){
		let t = 0;
		let Torque = Math.floor(rotation * Force.length());
		let maximumForceValue = 5;
		let maximumForce = new Vector(Force.x >= 0 ? maximumForceValue : -maximumForceValue, -maximumForceValue); //It's unrealistic, but it helps to improve the player's experience
		if(Force.length() >= maximumForce.length()) Force = maximumForce;
		if(Torque > Force.length() && spin === undefined){
			Torque = Force.length() - 5;
		}else if(Torque >= 12 && spin !== undefined){
			Torque = -12;
		}
		console.log(`Force: ${Force.length()} N`,`Torque: ${Torque} N m`);
		this.moveInterval = new PIXI.Ticker();
		this.moveInterval.add((delta) =>{
			this.vector.add(Force);
			this.vector.x -= Torque;
			this.updatePos();
			this.anim(t);
			t++;
		})
		this.moveInterval.start();
	}

	updatePos(){
		this.x = this.vector.x;
		this.y = this.vector.y;
	}

	anim(t){
		this.anchor.y = ((10 * t - 5 * Math.pow(t, 2)) ) + 1.2;
	}
}