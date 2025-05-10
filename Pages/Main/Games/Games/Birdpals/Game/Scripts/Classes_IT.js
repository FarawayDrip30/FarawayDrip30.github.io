class Item extends PIXI.Sprite{
	constructor(item, frame){
		super(resources.items.textures[`${item}_4.png`]);
		this.anchor.set(0.5, -0.5);
		this.item = item;
		this.frame = frame;
		this.itemData = resources.items.data;
		this.updateFrame(frame);
	}

	updateFrame(frame){
		if(this.itemData.frames[`${this.item}_${frame}.png`] != undefined){
			this.visible = true;
			this.texture = resources.items.textures[`${this.item}_${frame}.png`];
			this.y = this.itemData.frames[`${this.item}_${frame}.png`].position.y;
			this.x = this.itemData.frames[`${this.item}_${frame}.png`].position.x;
		}
		else{
			this.visible = false;
		}

		this.frame = frame; //For debugging
	}
}