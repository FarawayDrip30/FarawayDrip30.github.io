function changeState(newState){
	app.destroy();
	app = newState;
}
function revertToWorld(){
	app.destroy();
	app = new WorldState(canvas);

	app.viewport.addChild(rooms);
	app.viewport.addChild(objects);
	app.viewport.addChild(foreground);
	app.viewport.addChild(particles);
	app.viewport.addChild(UI);

	chatbox.hidden = false;
	inputElements.hidden = false;
	colourPickers.hidden = true;
}

class State extends PIXI.Application{
	constructor(htmlElement){
		super({
			width: 1000,
			height: 600,
			view: htmlElement
		});
		if(resources == null || resources == undefined){
			resources = this.loader.resources;
		}
		this.stage.on('pointerdown', (evt)=>{
			this.onClick(evt);
		})
		this.stage.on('pointermove', (evt)=>{
			this.onMouseMove(evt);
		})

		this.state_name = "state"

	}

	onClick(evt){

	}
	onMouseMove(evt){

	}
}

class WorldState extends State{
	constructor(htmlElement){
		super(htmlElement);
		this.stage.interactive = true;
		this.viewport = new pixi_viewport.Viewport({
			screenWidth: window.innerWidth,
			screenHeight: window.innerHeight,
			worldWidth: this.stage.width,
			worldHeight: this.stage.height,
		
			interaction: this.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
		})

		this.stage.addChild(this.viewport);

		this.state_name = "world_state"
	}

	onClick(evt){
		//console.log(localPlayer)
		if(localPlayer.canMove == true){
			localPlayer.mouseX = Math.floor(evt.data.global.x);
			localPlayer.mouseY = Math.floor(evt.data.global.y);
			localPlayer.move();
			const playerMovement = {
				mouseX: localPlayer.mouseX,
				mouseY: localPlayer.mouseY
			}
			//socket.emit('playerMovement', playerMovement);
		} 
	}
}

class ColourChangeState extends State{
	constructor(htmlElement){
		super(htmlElement);
		this.stage.interactive = true;
		this.viewport = new pixi_viewport.Viewport({
			screenWidth: window.innerWidth,
			screenHeight: window.innerHeight,
			worldWidth: this.stage.width,
			worldHeight: this.stage.height,
		
			interaction: this.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
		})

		chatbox.hidden = true;
		inputElements.hidden = true;
		colourPickers.hidden = false;

		this.bg = this.stage.addChild(PIXI.Sprite.from("Sprites/other/colourChangerBackground.png"))
		this.exit = this.stage.addChild(PIXI.Sprite.from("Sprites/hud/closereport.png"))
		this.exit.on('pointerdown', (event) => {
			this.exitState()
		});
		this.exit.interactive = true;
		this.exit.x = 928;
		this.exit.y = 20;

		this.line = this.stage.addChild(new PIXI.Graphics());
		this.line.lineStyle(2,0x000000);
		this.line.moveTo(500,450);
		this.line.lineTo(500,600);

		this.player = this.stage.addChild(new Player(localPlayer))
		this.player.scale.set(1.2,1.2);
		this.player.lookingInt = 4;
		this.player.updateTexturesToLook();
		this.player.position.x = 500;
		this.player.position.y = 300;
		
		//this.topColour = 0x359ade;
		//this.bottomColour = 0x38a2eb;

		this.topColour = localPlayer.topColour;
		this.bottomColour = localPlayer.bottomColour;
		this.changeBirdFilter();

		this.topText = this.stage.addChild(new PIXI.BitmapText("Top",{
			fontName: 'Arial',
			fontSize: 14,
			align: 'center',
			tint: 0x000000,
		}));
		this.topText.x = 315;
		this.topText.y = 452;
		this.bottomText = this.stage.addChild(new PIXI.BitmapText("Bottom",{
			fontName: 'Arial',
			fontSize: 14,
			align: 'center',
			tint: 0x000000,
		}));
		this.bottomText.x = 670;
		this.bottomText.y = 452;
		//						Red		Orange	Yellow	  Green   D Green   L Blue  D Blue	   Purple  Pink		White	Grey		Black	Brown
		this.topColourVals = [0xFF352B,0xFF8C35,0xEFDA51,0x71F35C,0x3F9630,0x359ade,0x003466,0x8C29F5,0xD9A5F1,0xEAEAEA,0x56535B,0x1F1E21,0x873F36]
		//socket.emit('makeMeInvisible',{})
		this.addColours();
	}

	addColours(){
		for(let c = 0; c < this.topColourVals.length; c++){
			this.stage.addChild(new Colour(172+c*22,480,this.topColourVals[c],true))
		}
		for(let c = 0; c < this.topColourVals.length; c++){
			this.stage.addChild(new Colour(540+c*22,480,this.topColourVals[c],false))
		}
	}

	changeBirdFilter(){
		this.player.birdSprite.filters = [new MultiBirdColorReplacement(0x38a2eb,0x359ade,this.bottomColour,this.topColour)]
	}

	exitState(){
		localPlayer.topColour = app.topColour;
		localPlayer.bottomColour = app.bottomColour;
		localPlayer.updateColours();
		inventory.updateColours();
		//socket.emit('finishedChangingColour',{top:app.topColour,bottom:app.bottomColour})
		revertToWorld(canvas);
		
	}
}
class Colour extends PIXI.Graphics{
	constructor(x,y,colour,top){
		super();
		this.interactive = true;
		let size = 20;
		this.beginFill(colour);
		this.drawRoundedRect(x, y, size, size, 4);

		this.colour = colour;
		this.isTop = top;

		this.on('pointerdown', (event) => {
			if(this.isTop){
				app.topColour = this.colour;
			}
			else{
				app.bottomColour = this.colour;
			}
			app.changeBirdFilter();
		});
	}
}

class ShopState extends State{
	constructor(htmlElement){
		super(htmlElement);
		this.stage.interactive = true;
		this.viewport = new pixi_viewport.Viewport({
			screenWidth: window.innerWidth,
			screenHeight: window.innerHeight,
			worldWidth: this.stage.width,
			worldHeight: this.stage.height,
		
			interaction: this.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
		})

		this.stage.addChild(this.viewport);

		chatbox.hidden = true;

		this.shelves = [];

		this.addBackground();
		this.loadShelves();
	}

	addBackground(){
		let tempBackground = new PIXI.Graphics();
		tempBackground.beginFill(0xC37D37);
		tempBackground.drawRect(0,0,canvas.width,canvas.height);
		this.background = this.stage.addChild(tempBackground);
	}

	loadShelves(){
		for(let y = 0; y < 3; y++){
			for(let x = 0; x < 4; x++){
				let tempShelf = new PIXI.Graphics();
				tempShelf.beginFill(0x804000);
				tempShelf.drawRoundedRect(50 + x * 120, 50 + y * 120, 100, 100, 40);
				this.shelves.push(this.stage.addChild(tempShelf));
			}
		}
	}
}

class PingPong extends State{
	constructor(htmlElement){
		super(htmlElement);
		this.stage.interactive = true;
		this.viewport = new pixi_viewport.Viewport({
			screenWidth: window.innerWidth,
			screenHeight: window.innerHeight,
			worldWidth: this.stage.width,
			worldHeight: this.stage.height,
		
			interaction: this.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
		})

		chatbox.hidden = true;
		this.stage.addChild(this.viewport);
		this.loader.defaultQueryString=Date.now()+""
		this.loader.add('racket', `Minigames/Ping Pong/racket.png`);
		this.loader.add('tabble', `Minigames/Ping Pong/tabble.png`);
		this.loader.add('ball', `Minigames/Ping Pong/ball.png`);
		this.loader.load();

		this.loaded = false;

		this.loader.onComplete.add(()=>{
			this.racket = new Racket('user');
			this.tabble = new Tabble();
			this.ball = new Ball();

			this.loaded = true;

			app.stage.addChild(this.tabble);
			app.stage.addChild(this.ball);
			app.stage.addChild(this.racket);

			/*
			this.getBatsSpeed = setInterval(function(){
				//console.log(`Speed X: ${racket.speedX}px/s, Y: ${racket.speedY}px/s`);
				this.racket.lastRotation = this.racket.rotation;
				if(this.ball.lastHit !== 'user') this.racket.fx = this.racket.fy = 0;
			}, 200);
			*/
		})

		
	}

	onMouseMove(evt){
		this.racket.x = evt.data.global.x;
		if(evt.data.global.y > 200) this.racket.y = evt.data.global.y;
		this.racket.collider.x = this.racket.x;
		this.racket.collider.y = this.racket.y;
		let radian = Math.PI / 180;
		//How does it work? I honestly don't know :/
		//My guess is that we divide the distance between the racket and the center of the canvas to a number that indicates the radius of the rotation
		//Then we convert this distance to radians by getting the minimum value between the distance and the maximum angle.
		//And we get the maximum value between the angle if it was for the right and the maximum angle of the left.
		//Math.max(Math.min((racket.x - (canvas.width / 2)) / 200, 90 * radian), -90 * radian)
		let angleToLook = Math.max(Math.min((this.racket.x - 500) / 200, 90 * radian), -90 * radian);
		this.racket.rotation = angleToLook;
		this.racket.update(this.ball, evt.data.originalEvent);
	}
}