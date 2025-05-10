function getElementFromArray(element, customIdentifier, array){
	let tempElement;
	array.forEach(arrayElement =>{
		if(arrayElement[customIdentifier] === element[customIdentifier]){
			tempElement = arrayElement;
		}
	})
	return tempElement != undefined ? tempElement : false;
}

function checkIfElementIsInArray(element, customIdentifier, array){
	return getElementFromArray(element, customIdentifier, array) ? true : false;
}

function getElementFromArrayByValue(value, customIdentifier, array){
	let tempElement;
	array.forEach(arrayElement =>{
		if(arrayElement[customIdentifier] == value){
			tempElement = arrayElement;
		}
	});
	return tempElement != undefined ? tempElement : false;
}

function removeElementFromArray(element, array){
	array.splice(array.indexOf(element), 1);
}

function separateStrings(string){
	if(string == undefined) return;
	let separated = string.split(" ");
	return separated;
}

function command(command, message){
	console.log(command)
	if(command == "/room"){
		loading_screen.hidden = false;
		leaveRoom()
		currentRoom.changeRoom(message.split(" ")[1],message.split(" ")[2])
		addPlayer()
	}
	else if(command == "/items"){
		for(let key in resources.itemClasses.data){
			offlineAddItem(key,true);
		}
	}
	//socket.emit(command, message);	//Send command to the server
}

function setLocalMessage(thisMessage){
	console.log(thisMessage)
	let checkCommand = thisMessage.split(" ");
	if(checkCommand[0].includes("/") == true){	//Check if it's a command
		command(checkCommand[0], thisMessage);
	}else{
		addToChatbox(localPlayer.username + ": " + thisMessage);
		localPlayer.message = thisMessage;
		if(localPlayer.messageTimeout != undefined){
			clearTimeout(localPlayer.messageTimeout);
			if(localPlayer.bubble.children[0] !== undefined) localPlayer.bubble.removeChildAt(0);
			localPlayer.drawBubble();
		}else if(localPlayer.messageTimeout == undefined){
			localPlayer.drawBubble();
		}
		//socket.emit('message', thisMessage);
	}
}