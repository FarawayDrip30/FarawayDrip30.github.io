class Room extends PIXI.Sprite{
	constructor(room){
		super(resources[room].textures[`${room}_Background.png`]);
		this.originalRoom = room;
		this.name = room;
		this.loader = new PIXI.Loader();
		this.loader.defaultQueryString=Date.now()+""
		this.loader.onComplete.add(() =>{
			this.changeTexture();
			this.getObjects(currentRoom.loader.resources);
		});
		this.loader.onError.add(this.loadingError);
		this.music = document.getElementById('backgroundMusic');
		new Foreground(room);
	}

	changeRoom(newRoom,entrance){
		this.name = newRoom;
	
		if(this.loader.resources[this.name] !== undefined){
			this.changeTexture();
			this.getObjects(this.loader.resources);
			setTimeout(function(){loading_screen.hidden = true},250);
		}else if(newRoom == this.originalRoom){
			this.texture = resources[newRoom].textures[`${newRoom}_Background.png`];
			foreground.children[0].changeTexture(newRoom, true);
			this.getObjects(resources);
			setTimeout(function(){loading_screen.hidden = true},250);
		}else{
			this.loader.add(this.name, `${JSONSrc + this.name}.json`);
			this.loader.load();
		}
		this.getCollision(this.name);
		this.music.src = `${audioSrc}${resources.allRooms.data[this.name].music}`;

		if(resources.allRooms.data[this.name].entrances && resources.allRooms.data[this.name].entrances[entrance] != undefined){
			if(entrance == null || entrance == undefined){entrance = 0}
			playerData.x = resources.allRooms.data[this.name].entrances[entrance][0];
			playerData.y = resources.allRooms.data[this.name].entrances[entrance][1];
			console.log(resources.allRooms.data[this.name].entrances[entrance][0])
		}
		else{
			playerData.x = 500;
			playerData.y = 460;
		}
	}

	loadingError(e){
		console.error(`There was an error when loading: ${e.message}`);
	}

	changeTexture(){
		this.texture = this.loader.resources[this.name].textures[`${this.name}_Background.png`];
		foreground.children[0].changeTexture(this.name);
	}

	getCollision(newRoom){
		collisionArray = new Array();
		let roomsData = resources.allRooms.data;
		let colliders = roomsData[newRoom].colliders;
		let convexPolygons = decomp.quickDecomp(colliders);
		convexPolygons.forEach(polygon => {
			collisionArray.push(new Polygon(currentRoom.x, currentRoom.y, polygon))
		});
		triggers = roomsData[newRoom].triggers;
	}

	activateTrigger(triggerArray){
		switch(triggerArray[4]){
			case "changeRoom":
				setLocalMessage("/room " + triggerArray[5] + " " + triggerArray[6]);
				break;
			case "getFreeItem":
				//socket.emit("getFreeItem", {name:triggerArray[5]});
				offlineAddItem(triggerArray[5],true)
				break;
			case "changeState":
				switch(triggerArray[5]){
					case "colourChangeState":
						changeState(new ColourChangeState(canvas));
						break;
				}
				break;
		}
	}

	getObjects(resources){
		for(let roomObject in resources[this.name].data.frames){
			if(roomObject.includes('Background') != true && roomObject.includes('Foreground') != true){
				objects.addChild(new RoomObject(this.name, roomObject, resources));
			}
		}
		loading_screen.hidden = true;
	}

	debugColliders(i){
		let t = new PIXI.Graphics();
		t.beginFill(0x0099FF, 0.3);
		t.drawPolygon(Object.values(collisionArray[i]._points));
		t.endFill();
		rooms.addChild(t);
	}
}

class RoomObject extends PIXI.Sprite{
	constructor(room, RoomObject, resources){
		super(resources[room].textures[RoomObject]);
		let thisData = resources[room].data.frames[RoomObject];
		this.x = thisData.position.x;
		this.y = thisData.position.y;
		this.zIndex = this.y + (this.height / 2) + 10;
	}
}

class Foreground extends PIXI.Sprite{
	constructor(room){
		super(resources[room].textures[`${room}_Foreground.png`]);
		this.Data = resources[room].data.frames[`${room}_Foreground.png`];
		this.x = 0;		
		this.y = this.Data.frame.y - this.Data.frame.h;
		foreground.addChild(this);
	}
	changeTexture(newRoom, isOriginal){
		if(isOriginal == true){
			this.texture = resources[newRoom].textures[`${newRoom}_Foreground.png`];
			this.Data = resources[newRoom].data.frames[`${newRoom}_Foreground.png`];
			this.y = this.Data.frame.y - this.Data.frame.h;
			this.x = 1000 - this.Data.frame.w;
			
			if(this.Data.position){this.x = this.Data.position.x; this.y = this.Data.position.y}
			if(this.Data.size){this.width = this.Data.size.w; this.height = this.Data.size.h;}
			else{this.width = this.Data.frame.w; this.height = this.Data.frame.h}
		}else{
			
			this.texture = currentRoom.loader.resources[newRoom].textures[`${newRoom}_Foreground.png`];
			this.Data = currentRoom.loader.resources[newRoom].data.frames[`${newRoom}_Foreground.png`];
			this.y = this.Data.frame.y - this.Data.frame.h;
			this.x = 1000 - this.Data.frame.w;
			if(this.Data.position){this.x = this.Data.position.x; this.y = this.Data.position.y}
			if(this.Data.size){this.width = this.Data.size.w; this.height = this.Data.size.h;}
			else{this.width = this.Data.frame.w; this.height = this.Data.frame.h}
		}
	}
}