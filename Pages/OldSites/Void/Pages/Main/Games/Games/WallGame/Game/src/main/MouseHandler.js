class MouseHandler {

	constructor(_parentState){
    this.parentState;

    this.mousePressed = false;

	  //----------------------------------

	  let canvas = document.getElementById("canvas");
	  canvas.addEventListener("mousemove", this.mouseMoved);
		//canvas.addEventListener("mousedown", this.mousePressed);
		canvas.addEventListener("mouseup", this.mouseReleased);
		this.parentState = _parentState;
	}

	mouseDragged(e) {
		// TODO Auto-generated method stub

	}

	mouseMoved(e) {
  	if(this.parentState){
  		this.parentState.mouseMoved(e);
  	}
	}

	mouseClicked(e) {
		// TODO Auto-generated method stub

	}

	mousePressed(e) {
		this.mousePressed = true;

	}

	mouseReleased(e) {
		this.mousePressed = false;

	}

	mouseEntered(e) {
		// TODO Auto-generated method stub

	}

	mouseExited(e) {
  	if(this.parentState){
  		this.parentState.mouseExited(e);
  	}
	}

}
