if(ticket == null){
	//window.location.href = 'index.html';
}


var party_JSON_path = "";

function leaveRoom(){
	objects.removeChildren(0, objects.children.length);
	playersInGame = new Array();
}

let playerData = 
{
	id: playerId,
	username: "Bird",
	isMoving: false,
	x: 500,
	y: 460,
	mouseX: 495,
	mouseY: 492,
	gear: [],
	colours: {top:0x359ade,bottom:0x38a2eb},
	visible: true,
};

function addPlayer(){
	localPlayer = new Player(playerData);
	objects.addChild(localPlayer);
}

function offlineAddItem(itemName,declareInChat){
	for(let i = 0; i < inventory.items.length; i++){
		if(inventory.items[i].ItemId == itemName){
			return;
		}
	};
	if(declareInChat){addToChatbox("You Found "+itemName+"!")}
	inventory.items.push({ItemClass: resources.itemClasses.data[itemName], ItemId: itemName, CustomData:{isEquipped: false}});
}

/*
socket.on('disconnect', () => {
	alert('You lost connection.');
	window.location.href = "index.html";
});

socket.on('errors', (error) =>{
	alert(error);
	window.location.href = "index.html";
})

socket.on('loggedOut', () =>{
	window.location.href = "index.html";
})

socket.emit('login', ticket);

socket.on('readyToPlay?', () =>{	//Server is asking if the player can be added on the client
	serverIsReady = true;
});

socket.on('loggedIn', (receivedPlayers) =>{	//Server response to "Im Ready";
	receivedPlayers.forEach(player => {
		if(player.id == playerId){
			localPlayer = new Player(player);
			objects.addChild(localPlayer);
		} 
		else if(player.id != playerId && !checkIfElementIsInArray(player, 'id', playersInGame)){
			let tempPlayer = new Player(player);
			playersInGame.push(tempPlayer);
			objects.addChild(tempPlayer);
			delete tempPlayer;
		}
	});
})

socket.on('newPlayer', (player) => {
	let tempPlayer = new Player(player);
	playersInGame.push(tempPlayer); 
	objects.addChild(tempPlayer);
});

socket.on('byePlayer', (playerThatLeft) =>{
	let playerG = getElementFromArray(playerThatLeft, playerThatLeft.id, playersInGame);
	if(playerG != false){
		removeElementFromArray(playerG, playersInGame);
		objects.removeChild(playerG);
	}
});

socket.on('joinRoom', (joinRoom) =>{
	currentRoom.changeRoom(joinRoom.name);
})

socket.on('leaveRoom', () => {
	leaveRoom()
})

socket.on('playerIsMoving', (player) =>{
	let playerG = getElementFromArray(player, player.id, playersInGame);
	if(playerG != false){ //Makes sure the Player is actually in playersInGame so the game doesn't get confused
		playerG.mouseX = player.mouseX;
		playerG.mouseY = player.mouseY
		playerG.move();
	}
})

socket.on('playerSaid', (player) => {
	let playerO = getElementFromArray(player, 'id', objects.children);
	if(playerO != false && playerO != undefined){
		playerO.message = player.message;

		if(playerO.messageTimeout != undefined){
			clearTimeout(playerO.messageTimeout);
			if(playerO.bubble.children[0] !== undefined) playerO.bubble.removeChildAt(0);
			playerO.drawBubble();
		}else if(playerO.messageTimeout == undefined){
			playerO.drawBubble();
		}

		addToChatbox(`${playerO.username}: ${player.message}`);
	}
});

socket.on('changedBio', (newBio) =>{
	let player = getElementFromArrayByValue(newBio.player, 'id', playersInGame);
	if(player != false){
		player.bio = newBio.newBio;
	}
})

socket.on('changingInventory', (boolean) =>{
	setTimeout(() => {
		inventory.isChanging = boolean;
	}, 5000);
})

socket.on('changedBio', (newBio) =>{
	let player = getElementFromArrayByValue(newBio.player, 'id', playersInGame);
	if(player != false){
		player.bio = newBio.newBio;
	}
})

socket.on("gotItem", (name) => {
	addToChatbox("You Found "+name+"!")
	inventory.items = null;
})

socket.on("playerUpdatedGear", (info) => {
	let player = getElementFromArrayByValue(info.player, 'id', playersInGame);
	if(player != false){
		player.gear = info.gear;
		player.updateGear();
	}
})

socket.on("colourChange", (info) => {
	let player = getElementFromArrayByValue(info.id, 'id', playersInGame);
	if(player != false){
		player.topColour = info.colours.top;
		player.bottomColour = info.colours.bottom;
		player.updateColours();
		player.visible = true;
	}
});

socket.on("makeInvisible", (info) => {
	let player = getElementFromArrayByValue(info.id, 'id', playersInGame);
	if(player != false){
		player.visible = false;
	}
});

socket.on("HideLoading", () => {
	loading_screen.hidden = true;
})

socket.on('M', (s) =>{
	s.forEach((src) =>{
		let script = document.createElement('script');
		script.setAttribute('src', src);
		document.getElementById('Scripts').appendChild(script);
	})
})

console.log("%cATTENTION!","color: #FF2D00; font-family:sans-serif; font-size: 45px; font-weight: 900; text-shadow: #000 3px 3px 3px");
console.log(`%cIf someone told you to copy/paste here, DON'T DO IT!`,"color: #F8FF00; font-family:sans-serif; font-size: 18px; font-weight: 900; text-shadow: #000 2px 2px 3px");
console.log(`%cThey might be trying to STEAL YOUR ACCOUNT!`,"color: #FCE92F; font-family:sans-serif; font-size: 14px; font-weight: 900; text-shadow: #000 2px 2px 2px");
*/

serverIsReady = true;

/*
this.id = id;
		this.username = username;
		this.x = 500;
		this.y = 460;
		this.isMoving = false;
		this.mouseX = 495;
		this.mouseY = 492;
		this.message = "";
		this.movePlayerInterval;
		this.gear = gear;
		this.bio = biography;
		this.friends = friends;
		this.collider = new Point(this.x, this.y);

		//this.colours = {top:0x359ade,bottom:0x38a2eb}
		this.colours = {top:topColour,bottom:bottomColour}

		this.visible = true;
		*/

		/*
let playerData = 
{
	id: 0,
	username: "Bird",
	isMoving: false,
	x: 500,
	y: 500,
	colours: {top:0x359ade,bottom:0x38a2eb},
	visible: true,
};
console.log(playerData)

localPlayer = new Player(playerData);
objects.addChild(localPlayer);

console.log(localPlayer)
*/