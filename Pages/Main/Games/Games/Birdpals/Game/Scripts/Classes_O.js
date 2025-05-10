class BigBird extends PIXI.Sprite{
	constructor(player){
		super(resources.bird_blue.textures['4.png']);
		this.player = player;
		this.filters = player.filters;
		this.scale.set(1.2,1.2);
	}

	updateColor(){
		this.filters = this.player.filters;
	}
}

class Book extends PIXI.Sprite{
	constructor(player){
		super(resources.book.texture);
		this.visible = false;
		this.x = 50;
		this.y = 40;
		this.isOpen = false;
		this.closeButton = this.addChild(PIXI.Sprite.from(resources.book_X.texture));
		this.closeButton.x = 795;
		this.closeButton.y = 24;
		this.closeButton.interactive = true;
		this.closeButton.buttonMode = true;
		this.closeButton.scale.set(0.35, 0.35);
		this.closeButton.on('pointerdown', (event) => {this.close()});
		this.closeButton.on('pointerover', (event) => {this.closeButton.tint =  0xA3A3A3});
		this.closeButton.on('pointerout', (event) => {this.closeButton.tint =  0xFFFFFF});
		this.bio = player.bio;
		this.username = player.username;
		//Big Bird
		this.big_bird = new Player(player);
		this.big_bird.birdSprite.filters = player.birdSprite.filters;
		this.big_bird.x = 160;
		this.big_bird.y = 210;
		this.big_bird.scale.set(1.2,1.2);
		this.big_bird.removeChild(this.big_bird.usernameObj);
		this.addChild(this.big_bird);
		//Borders
		this.bbBorder = new PIXI.Graphics();
		this.bbBorder.lineStyle(3, 0x000000);
		this.bbBorder.drawRoundedRect(95, 92, 130, 150, 2)
		this.addChild(this.bbBorder);
		this.topBorder = new PIXI.Graphics();
		this.topBorder.lineStyle(3, 0x000000);
		this.topBorder.drawRoundedRect(95, 92, 288, 150, 2)
		this.addChild(this.topBorder);
		//Stats
		let levelText = new PIXI.BitmapText("Level: 999", {fontName: "Arial",fontSize: 20,tint: 0x000000});
		levelText.x = 105
		levelText.y = 247
		this.addChild(levelText)
		let strengthText = new PIXI.BitmapText("Stength: 999", {fontName: "Arial",fontSize: 20,tint: 0x000000});;
		strengthText.x = 105
		strengthText.y = 267
		this.addChild(strengthText)
		let speedText = new PIXI.BitmapText("Speed: 999", {fontName: "Arial",fontSize: 20,tint: 0x000000});
		speedText.x = 105
		speedText.y = 287
		this.addChild(speedText)
		let manaText = new PIXI.BitmapText("Mana: 999", {fontName: "Arial",fontSize: 20,tint: 0x000000});
		manaText.x = 105
		manaText.y = 307
		this.addChild(manaText)

		let moneyText = new PIXI.BitmapText("Money: 0", {fontName: "Arial",fontSize: 20,tint: 0x000000});
		moneyText.x = 105
		moneyText.y = 383
		this.addChild(moneyText)
	}

	open(){
		if(!this.isOpen){
			localPlayer.canMove = false;
			this.visible = true;
			transparentBg.visible = true;
			chatbox.hidden = true;
			playersInGame.forEach((player) =>{
				player.interactive = false;
			})
			this.isOpen = true;
			this.customOpen();
		}
	}

	customOpen(){

	}

	customClose(){

	}

	close(){
		this.customClose();
		this.visible = false;
		transparentBg.visible = false;
		this.isOpen = false;
		isChatBoxToggle == true ? chatbox.hidden = true : chatbox.hidden = false;
		playersInGame.forEach((player) =>{
			player.interactive = true;
		})
		setTimeout(() => {
			localPlayer.canMove = true;
		}, 10);
	}
}

class BirdColorReplacement extends PIXI.Filter {
	constructor(originalColor = 0x3db0ff, newColor, epsilon = 0.4) {
	  super(null, resources.colorReplacementFrag.data, {
		originalColor: PIXI.utils.hex2rgb(originalColor),
		newColor: PIXI.utils.hex2rgb(newColor),
		epsilon: epsilon,
	  });
	}
  }

class SnowParticle extends PIXI.particles.Emitter{
	constructor(){
		super(particles, PIXI.particles.upgradeConfig(resources.snow.data, [resources.snowTexture.texture]));
	}
}