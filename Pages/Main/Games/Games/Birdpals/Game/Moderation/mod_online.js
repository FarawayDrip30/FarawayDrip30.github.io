socket.on('playerBanned!', () =>{
	setLocalMessage('Successfully Banned :)', true);
})

socket.on('playerUnbanned!', () =>{
	setLocalMessage('Successfully UnBanned :)', true);
})