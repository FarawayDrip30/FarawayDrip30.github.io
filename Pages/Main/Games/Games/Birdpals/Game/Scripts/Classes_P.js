class Player extends PIXI.Container{
	constructor(player) {
		super();
		this.id = player.id;
		this.username = player.username;

		this.isMoving = player.isMoving;
		this.x = player.x;
		this.y = player.y;

		this.birdSprite = new PIXI.Sprite(resources.bird_blue.textures['4.png'])
		this.birdSprite.anchor.set(0.5, 0.7);
		this.birdSprite = this.addChild(this.birdSprite);

		if(player.colours !== undefined){
			this.topColour = player.colours.top;
			this.bottomColour = player.colours.bottom;
			this.updateColours();
		}

		this.visible = player.visible;

		this.mouseX = player.mouseX;
		this.mouseY = player.mouseY;

		this.movePlayerInterval;
		this.isDev = player.isDev;
		this.canMove = true;
		this.canDrawUsername = true;
		this.collider = new Point(this.x, this.y);
		this.hitArea = new PIXI.Polygon([-40,-100,40,-100,40,10,-40,10]);

		this.lookingInt = 4;
		
		//items
		this.gear = player.gear;
		this.gearImgs = new Array();
		this.updateGear();
		//Bubble
		let tempBubble = new PIXI.Graphics();
		tempBubble.beginFill(0xffffff);
		tempBubble.drawRoundedRect(0, 0, 200, 100, 20);
		this.bubble = this.addChild(tempBubble);
		this.bubble.visible = false;
		this.messageTimeout;
		//Bubble Tail
		let tempBubbleTail = new PIXI.Graphics();
		tempBubbleTail.beginFill(0xffffff);
		tempBubbleTail.drawPolygon([-10,0,10,0,0,10]);
		this.bubbleTail = this.addChild(tempBubbleTail);
		this.bubbleTail.visible = false;
		//ID
		this.id == sessionStorage.playerId ? this.local = true : this.local = false;
		//card
		this.bio = player.bio;
		this.usernameObj = null;
		switch(this.local){
			case true:
				this.drawUsername('LUsernameFont');
				break;
			case false:
				this.drawUsername('NUsernameFont');
				this.interactive = true;
				this.buttonMode = true;
				this.on('pointerdown', (event) => {
					this.playerCard = new PlayerCard(this);
					this.playerCard.open()
				});
				break;
			case friend:
				break;
		}
		this.zIndex = this.y;
		this.whereToLook();
	}

	updateColours(){
		try{
			this.birdSprite.filters = [new MultiBirdColorReplacement(0x38a2eb,0x359ade,this.bottomColour,this.topColour)]
		}
		catch(err){
			console.log(err)
		}
	}

	whereToLook(){
		let dx = this.mouseX - this.x;
		let dy = this.mouseY - this.y;

		let angleToLook = Math.atan2(dy, dx) * 180 / Math.PI;

		this.lookingInt = 1;

		if(angleToLook < 0) angleToLook += 360;

		if(angleToLook > 70 && angleToLook<= 110){	//look to the front
			this.lookingInt = 4;
		}else if (angleToLook > 110 && angleToLook <= 220){//look to the left
			this.lookingInt = 6;
		}else if(angleToLook > 220 && angleToLook <= 260){ //look to the upper left
			this.lookingInt = 2;
		}else if(angleToLook > 260 && angleToLook <= 281 ){//look to the back
			this.lookingInt = 1;
		}else if(angleToLook > 281 && angleToLook <= 330){//look to the upper right
			this.lookingInt = 5;
		}else if(angleToLook > 330 && angleToLook <= 360 || angleToLook <= 70){//look to the right
			this.lookingInt = 3;
		}
		this.updateTexturesToLook();
	}

	updateTexturesToLook(){
		this.birdSprite.texture = resources.bird_blue.textures[`${this.lookingInt}.png`];
		if(this.gearImgs.length > 0){
			this.gearImgs.forEach((item) =>{
				item.updateFrame(this.lookingInt);
			})
		}
	}

	move(){
		if(this.canMove == true){
			if(this.isMoving == false){
				this.movePlayer();
			}else{
				this.isMoving = false;
				if(this.movePlayerInterval != undefined){ //Makes sure movePlayerInterval has actually been set
					this.movePlayerInterval.destroy();
				}
				this.movePlayer();
			}
			this.whereToLook();
		}
	}

	movePlayer(){
		this.isMoving = true;
		let dx = this.mouseX - this.x;
		let dy = this.mouseY - this.y;
		
		let angleToMove = Math.atan2(dy,dx);

		let speed = 4;

		let velX = Math.cos(angleToMove) * speed;
		let velY = Math.sin(angleToMove) * speed;
		let timeToPlayerReachDestination = Math.floor(dx/velX);
		let rest = timeToPlayerReachDestination % 20;
		let collided = false;
		
		this.movePlayerInterval = new PIXI.Ticker();
		
		this.movePlayerInterval.add((delta)=>{
			if(timeToPlayerReachDestination <= 0 || collided == true){
				this.isMoving = false;
				this.checkTriggers();
				return this.movePlayerInterval.destroy();
			}

			let newX = this.x + velX * delta;
			let newY = this.y + velY * delta;
			this.collider.x = newX;
			this.collider.y = newY;
			let collisions = 0;
			collisionArray.forEach((polygon) =>{
				if(this.collider.collides(polygon) == false){
					collisions += 1;
				}
			})
			if(collisions == collisionArray.length){
				this.isMoving = false;
				this.collider.x = this.x;
				this.collider.y = this.y;
				this.checkTriggers()
				collided = true;
				//this.anchor.y = 0.95;
				//itemJump(this.gearImgs, true);
				return this.movePlayerInterval.destroy();
			}
			if(collided == false){
				this.x = newX;
				this.y = newY;
				//this.anchor.y = littleJump(timeToPlayerReachDestination);
				//itemJump(this.gearImgs, timeToPlayerReachDestination);
				timeToPlayerReachDestination--;
				this.zIndex = this.y;
			}
		})
		
		this.movePlayerInterval.start();

		function littleJump(currentDuration){
			let y;
			if(currentDuration > 20){
				//Modular equation of sine graph
				//f(x) = |0.3 * sin( ((2 * π) / 40) * x)| + 0.95
				y = Math.abs(0.3 * Math.sin( ((2 * Math.PI) / 40) * currentDuration) ) + 0.95;
			}else if(currentDuration <=20 || currentDuration == rest){
				//Vertical launch equation
				//y = 0.1 * x - 5 / 2
				y = (1 / (0.1 * currentDuration - 5 * Math.pow(currentDuration, 2)) ) + 1.15;
			}
			return y;
		}

		function itemJump(gearImgs, currentDuration){
			if(gearImgs.length > 0){
				gearImgs.forEach((item) =>{
					if(currentDuration === true){
						item.anchor.y = 0.5;
					}else{
						if(currentDuration > 20){
							//Modular equation of sine graph
							//f(x) = |0.6 * sin( ((2 * π) / 40) * x)| + 0.5
							item.anchor.y = Math.abs(1.1 * Math.sin( ((2 * Math.PI) / 40) * currentDuration) ) + 0.5;
						}else if(currentDuration <=20 || currentDuration == rest){
							//Vertical launch equation
							//y = 0.1 * x - 5 / 2
							item.anchor.y = (1 / (0.1 * currentDuration - 5 * Math.pow(currentDuration, 2)) ) + 0.7;
						}
					}
				})
			}
		}
	}

	checkTriggers(){
		triggers.forEach(function(tempTrigger){ //Goes through each trigger to see if the player is within it
			if(localPlayer.y >= tempTrigger[1] && localPlayer.y <= tempTrigger[3] && localPlayer.x >= tempTrigger[0] && localPlayer.x <= tempTrigger[2]){
				currentRoom.activateTrigger(tempTrigger);
			}
		});
	}

	drawBubble(){
		if(this.message != undefined){
			this.removeChild(this.bitmapText);

			this.message = wordwrapjs.wrap(this.message, {width: 19, break: true});
			this.bitmapText = new PIXI.BitmapText(this.message,{
				fontName: 'Arial',
				fontSize: 14,
				align: 'center',
				tint: 0x000000
			});

			//Sets the Size and Position of the Text
			this.bitmapText.anchor.set(0.5, 0.5);
			this.bitmapText.x = 0;
			this.bitmapText.y = -120;

			//Sets the Size and Position of the Bubble depending on the Text
			//Checks if the Text is too big, and if so, sets the text box bigger
			if(this.bitmapText.width > 100){	this.bubble.width = this.bitmapText.width + 20; } else{this.bubble.width = 100;}
			if(this.bitmapText.height > 30){	this.bubble.height = this.bitmapText.height + 20; } else{this.bubble.height = 35;}
			//Shapes don't have anchors so we have to manually set the X and Y to centre
			this.bubble.y = this.bitmapText.y - this.bubble.height / 2;
			this.bubble.x = this.bitmapText.x - this.bubble.width / 2;

			//Sets the position of the Bubble's Tail, a seperate shape
			this.bubbleTail.y = this.bubble.y + this.bubble.height;
			
			this.addChild(this.bitmapText);

			this.bubble.visible = true;
			this.bubbleTail.visible = true;
			
			if(app.state_name == "world_state"){
    			PIXI.sound.play("bubblePop", {volume:0.25*globalSFXVol});
			}

			this.hideBubble();
		}
	}

	hideBubble(){
		this.messageTimeout = setTimeout(() => {
			clearTimeout(this.messageTimeout);
			this.message = undefined;
			this.bubble.visible = false;
			this.bubbleTail.visible = false;
			this.removeChild(this.bitmapText);
		}, 10000);
	}

	drawUsername(fontName){
		let usernameText = new PIXI.BitmapText(this.username,{
			fontName: fontName,
			align: 'center'
		});
		usernameText.anchor.set(0.5, -1.5);
		usernameText.scale.set(0.85, 0.85);
		this.usernameObj = this.addChild(usernameText);
	}

	setGearIndex(){
		this.gear.forEach((item) =>{
			switch(item.ItemClass){
				case "feet":
					item.index = 0;
					break;
				case "back":
					item.index = 5;
				case "neck":
					item.index = 10;
					break;
				case "face":
					item.index = 20;
					break;
				case "head":
					item.index = 30;
					break;
			}
		})
	}
	updateGear(){
		if(this.gear != undefined){
			this.setGearIndex()
			this.gear.sort(function(a,b){return a.index - b.index});

			this.gearImgs.forEach((item) =>{
				this.removeChild(item);
			})
			this.gearImgs = new Array();
			
			this.gear.forEach((item) =>{
				let item_sprite = new Item(item.ItemId,this.lookingInt);
				this.addChild(item_sprite);
				this.gearImgs.push(item_sprite);
			})
			if(this.gearImgs.length > 0){
				this.gearImgs.forEach((item) =>{
					item.updateFrame(this.lookingInt);
				})
			}
		}
	}
}