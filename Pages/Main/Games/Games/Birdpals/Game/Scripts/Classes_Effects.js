class MultiBirdColorReplacement extends PIXI.Filter {
	constructor(originalBottomColor=0x38a2eb, originalUpperCollor=0x359ade, newBottomColor=0x38a2eb, newUpperColor=0x359ade) {
	  	super(null, resources.shader.data, {
			bottomColor: PIXI.utils.hex2rgb(originalBottomColor),
			upperColor: PIXI.utils.hex2rgb(originalUpperCollor),
			newBottomColor: PIXI.utils.hex2rgb(newBottomColor),
			newUpperColor: PIXI.utils.hex2rgb(newUpperColor),
	  	});
	}
}

class InvertColours extends PIXI.Filter{
    constructor(){
        super(null,resources.invertColourShader.data);
    }
}
