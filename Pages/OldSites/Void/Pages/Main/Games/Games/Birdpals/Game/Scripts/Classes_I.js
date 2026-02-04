class Inventory extends Book{
	constructor(){
		super(localPlayer);
		this.isChanging = false;
		UI.addChild(this);
		this.items = [];
		this.pageStart = 0;
		this.drawArrows();
	}

	customOpen(){
		this.drawUsername();
		this.drawGrid();
		this.drawBio();
		this.getInventory();
		this.updateColours();
	}

	updateColours(){
		console.log("Update Colours")
		this.big_bird.topColour = localPlayer.topColour;
		this.big_bird.bottomColour = localPlayer.bottomColour;
		this.big_bird.updateColours();
		playerData.colours.top = localPlayer.topColour;
		playerData.colours.bottom = localPlayer.bottomColour;
	}

	customClose(){
		this.cells.forEach((cell) =>{
			if(cell.item !== undefined){
				this.items[this.items.indexOf(cell.item)].CustomData.isEquipped = cell.isSelected.toString();
			}
			cell.destroy();
		})

		let bio = document.getElementById('bioInput');
		if(bio.value !== ''){
			command('/changeBio', bio.value);
			localPlayer.bio = bio.value;
			this.bio = bio.value;
		} 
		bio.hidden = true;
		command('/updateInventory', this.items);
		this.isChanging = true;
		localPlayer.updateGear();
	}

	drawUsername(){
		let usernameText = new PIXI.BitmapText(this.username,{
			fontName: 'Caslon Antique',
			fontSize: 40,
			align: 'center',
			tint: 0x615f5b
		});
		usernameText.anchor.x = 0.5;
		usernameText.x = 235;
		usernameText.y = 35;
		this.addChild(usernameText)
	}

	getInventory(){
		if(this.items == null){ //If the player has already got the inventory, no need to get it again
			/*
			PlayFabClientSDK.GetUserInventory({SessionTicket: sessionStorage.ticket}, (result, error) =>{
				if(result !== null){
					this.items = result.data.Inventory;
					this.loadInventory();
				}else if(error !== null){
					console.log(error);
				}
			})
			*/
		}
		else{
			this.loadInventory();
		}
	}

	loadInventory(){
		let cell_i = 0;
		for(let i = this.pageStart; i < this.pageStart+16; i++){
			if(this.items[i] !== undefined){
				this.cells[cell_i].item = this.items[i];
				this.cells[cell_i].loadIcons(this.items[i]);
				this.cells[cell_i].interactive = true;
				this.cells[cell_i].buttonMode = true;
				this.cells[cell_i].visible = true;
			}else{
				this.cells[cell_i].stopLoadingAnimation();
				if(this.cells[cell_i].iconChild != undefined){
					this.cells[cell_i].iconChild.visible = false;
				}
			}
			cell_i++;
		}
	}

	drawGrid(){
		let pastX = 455;
		let pastY = 102;
		let squareWidth = 85;
		let squareHeight = 76.25;
		this.cells = new Array();
		for(let i = 0; i < 16; i++){
			if(i % 4 == 0 && i != 0){
				pastX = 455;
				pastY += squareHeight;
			}
			let cell = new Cell(pastX, pastY, squareWidth, squareHeight, 2);
			this.cells.push(cell);
			this.addChild(cell);
			cell.loadingAnimation();
			pastX += squareWidth;
		}
		this.drawGridBound();
	}

	drawGridBound(){
		this.graphics = new PIXI.Graphics();
		this.graphics.lineStyle(5, 0x000000);
		this.graphics.drawRoundedRect(455, 102, 340, 305, 2)
		this.addChild(this.graphics);
	}

	drawArrows(){
		this.addChild(new Arrow(740 , 430), new Arrow(690, 430, true));
	}

	drawBio(){
		if(this.bioIcon == null){
			this.bioIcon = this.addChild(new Bio(475, 450));
		}
	}

	hideInventory(){
		this.cells.forEach((cell) =>{
			cell.visible = false;
		})
	}

	redrawInventory(){
		this.cells.forEach((cell) =>{
			cell.visible = true;
		})
	}
}

class Cell extends PIXI.Graphics{
	constructor(x, y, width, height, round){
		super();
		this.nx = x;
		this.ny = y;
		this.nw = width;
		this.nh = height;
		this.nr = round;
		this.hitArea = new PIXI.Rectangle(this.nx, this.ny, this.nw - 4, this.nh - 4);
		this.isFastRect = true;
		this.isSelected = false;

		this.lineStyle(5, 0x000000);
		this.drawRoundedRect(this.nx, this.ny, this.nw, this.nh, this.nr);
		
		this.loadingSprite = new PIXI.Sprite(resources.loading_i.texture);
		this.loadingSprite.anchor.set(0.5, 0.5);
		this.loadingSprite.scale.set(0.7, 0.7);
		this.loadingSprite.x = x + 42.5;
		this.loadingSprite.y = y + 38;
		this.loadingSprite.ticker = new PIXI.Ticker();

		this.on('pointerover', (event) => {
			this.fillGray();
			if(this.isSelected == true)	this.icon.tint = 0x575757; 
		});
		this.on('pointerout', (event) =>{
			this.clearGray();
			if(this.isSelected == true){
				//redraws the selected gray color
				this.fillGray();
			}
		})
		this.on('pointerdown', (event) => {
			if(this.isSelected == false){
				this.fillGray();
				this.isSelected = true;
				//Remove items of same class
				if (getElementFromArrayByValue(this.item.ItemId, 'ItemId', localPlayer.gear) == false){
					localPlayer.gear.forEach((item) =>{
						if(item.ItemClass === this.item.ItemClass){
							removeElementFromArray(item, localPlayer.gear);
							this.parent.cells.forEach((cell) =>{
								if(cell.item !== undefined && cell.item.ItemId === item.ItemId){
									cell.isSelected = false;
									cell.clearGray();
								}
							})
						}
					})
					localPlayer.gear.push(this.item);
				}
			}else{
				//Remove items by clicking on already worn ones
				this.isSelected = false;
				this.clearGray();
				localPlayer.gear.forEach((item) =>{
					if(item.ItemClass === this.item.ItemClass){
						removeElementFromArray(item, localPlayer.gear);
					}
				})
			}
			this.parent.big_bird.gear = localPlayer.gear;
			this.parent.big_bird.updateGear();
		});
	}

	loadingAnimation(){
		this.loadingSprite.ticker.add((delta) =>{
			this.loadingSprite.rotation += 0.1 * delta;
		});
		this.loadingSprite.ticker.start();
		this.addChild(this.loadingSprite);
	}

	stopLoadingAnimation(){
		this.loadingSprite.visible = false;
	}

	loadIcons(item){
		if(item.CustomData.isEquipped == 'true') this.isSelected = true;
		this.stopLoadingAnimation();
		this.addIcon(item);
	}

	addIcon(item){
		if(this.iconChild != undefined){
			this.iconChild.destroy();
			this.clearGray();
		}
		this.icon = new PIXI.Sprite(resources.items.textures[`${item.ItemId}_4.png`]);
		if(this.icon.width > 25){ //Checks if the Item is big enough to be sized correctly (otherwise the strtching would be BAD)
			if(this.icon.width > this.icon.height){ //Finds whether the width or height of the item is bigger, 
													//then sets the size of the items to the cell size while keeping the aspect ratio
				this.icon.height /= this.icon.width / this.nw;
				this.icon.width = this.nw;
			}
			else{
				this.icon.width *= this.icon.height / this.nh;
				this.icon.height = this.nh;
			}
		}
		else{ //Makes small items the max size before they look stretched
			this.icon.width *= 1.5;
			this.icon.height *= 1.5;
		}
		this.icon.anchor.set(0.5,0.5);
		this.icon.x = this.nx + this.width / 2 - 2;
		this.icon.y = this.ny + this.height / 2 - 2;
		if(this.isSelected == true) this.fillGray();
		this.iconChild = this.addChild(this.icon);
	}

	fillGray(){
		if(this.icon !== undefined)this.icon.tint = 0xA3A3A3;
		this.beginFill(0x0000, 0.3);
		this.drawRoundedRect(this.nx, this.ny, this.nw, this.nh, this.nr);
		this.endFill();
	}

	clearGray(){
		if(this.icon.tint !== undefined)this.icon.tint = 0xFFFFFF;
		this.clear();
		this.lineStyle(5, 0x000000);
		this.drawRoundedRect(this.nx, this.ny, this.nw, this.nh, this.nr);
	}
}

class Arrow extends PIXI.Sprite{
	constructor(x, y, flip){
		super(resources.arrow.texture);
		this.x = x;
		this.y = y;
		if(flip == true){this.scale.x = -1;}
		this.interactive = true;
		this.buttonMode = true;
		this.on('pointerover', (event) => {this.tint = 0xA3A3A3});
		this.on('pointerout', (event) => {this.tint = 0xFFFFFF});
		this.on('pointerdown', (event) => {
			if(!flip){
				if(this.parent.pageStart + 16 < this.parent.items.length){
					this.parent.pageStart += 16;
				}
			}
			else{
				if(this.parent.pageStart - 16 >= 0){
					this.parent.pageStart -= 16;
				}
			}
			this.cells = [];
			this.parent.getInventory();
		});
	}
}

class Bio extends PIXI.Sprite{
	constructor(x, y){
		super(resources.bio_button.texture);
		this.x = x;
		this.y = y;
		this.anchor.set(0.5, 0.5);
		this.interactive = true;
		this.buttonMode = true;
		this.isOpen = false;
		this.on('pointerdown', (event) => {
			this.parent.hideInventory();
			this.isOpen == false ? this.open() : this.close();
		});
		this.bio = document.getElementById('bioInput');
	}

	open(){
		this.isOpen = true;
		this.bio.hidden = false;
		this.texture = resources.bio_button_opened.texture;
		if(this.parent.bio !== undefined){this.bio.value = this.parent.bio};
	}

	close(){
		this.isOpen = false;
		this.bio.hidden = true;
		this.texture = resources.bio_button.texture;
		this.parent.redrawInventory();
	}
}