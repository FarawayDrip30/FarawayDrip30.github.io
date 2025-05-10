let devCommands = [{command:'/ban', message:'Banning...'}, {command:'/unban', message: 'Unbanning...'}, {command: '/remove', message: 'Removing Player...'}];

command = function command(command, message){
	let isDevCommand = getElementFromArrayByValue(command, 'command', devCommands);
	if(isDevCommand !== false){
		setLocalMessage(isDevCommand.message, true);	//Make the bird say words like Banning...
	}
	socket.emit(command, message);	//Send command to the server
}

setLocalMessage = function setLocalMessage(thisMessage, isDevCommand){
	let checkCommand = thisMessage.split(" ");
	if(checkCommand[0].includes("/") == true){	//Check if it's a command
		command(checkCommand[0], thisMessage);
	}else{
		localPlayer.message = thisMessage;
		if(localPlayer.messageTimeout != undefined){
			clearTimeout(localPlayer.messageTimeout);
			if(localPlayer.bubble.children[0] !== undefined) localPlayer.bubble.removeChildAt(0);
			localPlayer.drawBubble();
		}else if(localPlayer.messageTimeout == undefined){
			localPlayer.drawBubble();
		}
		if(isDevCommand == false || isDevCommand == undefined){	//Prevents from the moderators or devs saying, for example, Banning... for everyone
			socket.emit('message', thisMessage);
		}
	}
}