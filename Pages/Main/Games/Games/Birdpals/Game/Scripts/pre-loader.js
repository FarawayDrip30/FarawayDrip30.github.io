var canvas = document.getElementById("game");

var app, resources;
var serverIsReady, ticket, playerId;
//var socket = io();
ticket = sessionStorage.ticket;
playerId = sessionStorage.playerId;

var loading_screen = document.getElementById('loading');

var objects, localPlayer, UI, inventory;
var transparentBg = new PIXI.Sprite(PIXI.Texture.WHITE);
var playersInGame = new Array();

var JSONSrc = 'JSONS/';
var spritesSrc = 'Sprites/';
var charactersSrc = spritesSrc + 'characters/';
var roomsSrc = spritesSrc + 'rooms/';
var hudSrc = spritesSrc + 'hud/';
var fontSrc = 'Fonts/';
var itemsSrc = spritesSrc + 'items/';
var audioSrc = 'Audio/';

var rooms, currentRoom, triggers, collisionArray, roomCollCellWidth, roomCollCellHeight, predictArray, triggers;
var foreground;
var particles;

var chatbox = document.getElementById("chatbox");
var isChatBoxToggle = false;

var inputElements = document.getElementById("inputElements")

var colourPickers = document.getElementById("colourPickers")

window.onload = ()=>{
	app = new WorldState(document.getElementById('game'));

	loadWorld();
}

function loadWorld(){
	//new Date() is used to ignore the stupid dumb idiotic cache
	app.loader.defaultQueryString=Date.now()+""

	app.loader.add('allRooms', `${JSONSrc}roomsJSON.json`);
	app.loader.add('town', `${JSONSrc}town.json`);
	app.loader.add('bird_blue', `${JSONSrc}bird_blue.json`);
	app.loader.add('bubble_message', `${spritesSrc}hud/bubble.png`);
	app.loader.add('items', `${JSONSrc}items.json`);
	app.loader.add('itemClasses', `${JSONSrc}offlineItemClasses.json`);
	app.loader.add('Arial', `${fontSrc}Arial.fnt`);
	app.loader.add('BCaslon_font', `${fontSrc}CaslonAntique-BoldItalic.fnt`);
	app.loader.add('Caslon_font', `${fontSrc}CaslonAntique-BoldItalic.ttf`);
	app.loader.add('VarelaRound', `${fontSrc}VarelaRound-Regular.ttf`);
	app.loader.add('book', `${hudSrc}book.png`);
	app.loader.add('book_X', `${hudSrc}book_X.png`);
	app.loader.add('arrow', `${hudSrc}arrow.png`);
	app.loader.add('bio_button', `${hudSrc}bio_button.png`);
	app.loader.add('bio_button_opened', `${hudSrc}bio_button_opened.png`);
	app.loader.add('report_button', `${hudSrc}reportBookmark.png`);
	app.loader.add('loading_i', `${hudSrc}loading_i.png`);
	app.loader.add('big_bird', `${hudSrc}big_bird.png`);
	app.loader.add('snow', `${JSONSrc}emitter.json`);
	app.loader.add('snowTexture', `${hudSrc}Snow100.png`);
	app.loader.add('colorReplacementFrag', `Scripts/colorReplace.frag`);
	app.loader.add('shader', `Scripts/shader.frag`);
	app.loader.add('invertColourShader', `Shaders/invertColour.frag`);
	app.loader.add('bubblePop', `${audioSrc}bubblePop.wav`)
	
	app.loader.onProgress.add(showLoading);
	app.loader.onComplete.add(finishedPreLoading);
	app.loader.onError.add(loadingError);
	
	app.loader.load();

	function showLoading(e){
		loading_screen.hidden = false;
	}
	
	function loadingError(e){
		console.error(`There was an error when loading: ${e.message}`);
	}

	function finishedPreLoading(){
		console.log("finished Pre Loading")
		objects = new PIXI.Container();
		objects.name = 'Objects';
		objects.sortableChildren = true;

		rooms = new PIXI.Container();
		rooms.name = 'Rooms';
		
		foreground = new PIXI.Container();
		foreground.name = 'Foreground';
		foreground.zIndex = objects.zIndex + 1;

		particles = new PIXI.ParticleContainer();
		particles.name = 'Particles';
		particles.zIndex = foreground.zIndex + 1;

		UI = new PIXI.Container();
		UI.name = 'UI';
		UI.zIndex = particles.zIndex + 1;
		transparentBg.width = 1000;
		transparentBg.height = 600;
		transparentBg.tint = 0x000000;
		transparentBg.alpha = 0.6;
		transparentBg.visible = false;
		UI.addChild(transparentBg);

		PIXI.BitmapFont.from("LUsernameFont", fontStyle('bolder', '#FFFFFF', '#000000'));
		PIXI.BitmapFont.from('NUsernameFont', fontStyle('normal', '#FFFFFF', '#000000'));
		
		app.viewport.addChild(rooms);
		app.viewport.addChild(objects);
		app.viewport.addChild(foreground);
		app.viewport.addChild(particles);
		app.viewport.addChild(UI);
		
		waitServerResponse();
	}

	function waitServerResponse(){
		if(serverIsReady){
			//socket.emit('Im Ready');
			currentRoom = new Room('town');
			rooms.addChild(currentRoom);
			currentRoom.getCollision('town');
			currentRoom.getObjects(resources);
			
			var script = document.createElement("script");
			script.src = "./Scripts/localG.js";
			document.head.appendChild(script);

			loading_screen.hidden = true;

			addPlayer()
		}
		else{
			setTimeout(waitServerResponse,100);
		}
	}

	function fontStyle(fontWeight, fill, stroke){
		return {
		fontFamily: "Arial",
		fontSize: 18,
		strokeThickness: 6.5,
		fill: fill,
		stroke: stroke,
		lineJoin: 'round',
		fontWeight: fontWeight}
	}

	posElement('#inputElements', 630, 325);
	posElement('#bioInput', 180, 510);
	posElement('#chatbox', 5, 5);
	posElement('#reportDiv', 40, 300);
}

window.onresize = ()=>{
	posElement('#inputElements', 630, 325);
	posElement('#bioInput', 180, 510);
	posElement('#chatbox', 5, 5);
	posElement('#reportDiv', 40, 300);
}

function posElement(elementId, top, left){
	let c_rect = app.view.getBoundingClientRect();
	$(elementId).css({
		top: c_rect.top + top + window.scrollY,
		left: c_rect.left + left + window.scrollX
	})
}


PIXI.settings.RENDER_OPTIONS.antialias = true;