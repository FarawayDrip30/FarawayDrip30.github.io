class State extends PIXI.Application{
	constructor(htmlElement){
		super({
			width: 1000,
			height: 600,
			view: htmlElement
		});
		resources = this.loader.resources;
		this.stage.on('pointerdown', (evt)=>{
			if(this.onClick !== undefined){
				this.onClick(evt);
			}
		})

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
	}

	onClick(evt){
		if(localPlayer.canMove == true){
			localPlayer.mouseX = Math.floor(evt.data.global.x);
			localPlayer.mouseY = Math.floor(evt.data.global.y);
			localPlayer.move();
			const playerMovement = {
				mouseX: localPlayer.mouseX,
				mouseY: localPlayer.mouseY
			}
			socket.emit('playerMovement', playerMovement);
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
		this.loader.add('racket', `Minigames/Ping Pong/racket.png`);
		this.loader.add('tabble', `Minigames/Ping Pong/tabble.png`);
		this.loader.add('ball', `Minigames/Ping Pong/ball.png`);
		this.loader.add('gsap', `Minigames/Ping Pong/gsap.min.js`);
		this.loader.add('game', `Minigames/Ping Pong/game.js`);
		this.loader.load();

		this.loader.onComplete.add(()=>{
			for(let file in resources){
				if(resources[file].extension === 'js'){
					let script = document.createElement('script');
					script.setAttribute('src', resources[file].url);
					document.getElementById('Scripts').appendChild(script);
				}
			}
		})
	}
}