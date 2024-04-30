function clearScreen(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function createImage(src){
	let tempImage = new Image();
	tempImage.src = src;
	return tempImage;
}

async function customGetJSON(json){
	return await new Promise((resolve) => {
		$.getJSON(json, (data) =>{
			resolve(data);
		});
	})
}

function isInRect(x,y,rectX,rectY,rectWidth,rectHeight){
    if(x < rectX + rectWidth && x > rectX && y < rectY + rectHeight && y > rectY){
        return true;
    }
}

function getMousePos(cv, evt) {
	var rect = cv.getBoundingClientRect();
		return {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
}};

var lastCalledTime;
var delta;
var timeScale;

function getFPS() {
	if (lastCalledTime) {
		delta = (Date.now() - lastCalledTime)/1000;
		let fps = 1/delta;
		timeScale = fps > 10 ? fps/90 : 10/90;
	}
	lastCalledTime = Date.now();
}

function removeItemFromArray(index,temparray){
	let newArray = [];

    for(let i = 0; i < temparray.length; i++){
        if(i != index){
            newArray.push(temparray[i]);
        }
    }

    return newArray;
}