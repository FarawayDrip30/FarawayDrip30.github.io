let racket = new Racket('user');
let tabble = new Tabble();
let ball = new Ball();

app.stage.on('pointermove', (evt)=>{
	racket.x = evt.data.global.x;
	if(evt.data.global.y > 200) racket.y = evt.data.global.y;
	racket.collider.x = racket.x;
	racket.collider.y = racket.y;
	let radian = Math.PI / 180;
	//How does it work? I honestly don't know :/
	//My guess is that we divide the distance between the racket and the center of the canvas to a number that indicates the radius of the rotation
	//Then we convert this distance to radians by getting the minimum value between the distance and the maximum angle.
	//And we get the maximum value between the angle if it was for the right and the maximum angle of the left.
	//Math.max(Math.min((racket.x - (canvas.width / 2)) / 200, 90 * radian), -90 * radian)
	let angleToLook = Math.max(Math.min((racket.x - 500) / 200, 90 * radian), -90 * radian);
	racket.rotation = angleToLook;
	racket.update(ball, evt.data.originalEvent);
})
app.stage.addChild(tabble);
app.stage.addChild(ball);
app.stage.addChild(racket);

let getBatsSpeed = setInterval(function(){
	//console.log(`Speed X: ${racket.speedX}px/s, Y: ${racket.speedY}px/s`);
	racket.lastRotation = racket.rotation;
	if(ball.lastHit !== 'user') racket.fx = racket.fy = 0;
}, 200);