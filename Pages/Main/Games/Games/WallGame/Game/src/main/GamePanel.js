class GamePanel {



	constructor(_window) {
  	//Screen Settings
    this.window;

  	this.originalTileSize = 16;
  	this.scale = 3;

  	this.tileSize = this.originalTileSize * this.scale;
  	this.maxScreenCol = 16;
  	this.maxScreenRow = 12;
  	this.screenWidth = this.maxScreenCol * this.tileSize;
  	this.screenHeight = this.maxScreenRow * this.tileSize;

  	this.defWidth = 768;
  	this.defHeight = 576;
  	this.defScale = 3;

  	this.FPS = 60;

  	this.gameThread;

  	this.saveObject = new SaveObject();

  	this.currentState = new LoadState(this);
    console.log(this.currentState);

  	//this.keyH = new KeyHandler();
  	this.mouseH = new MouseHandler(this.currentState);

  	this.g2;

	  //-----------------------------------------------------------

		this.window = _window;

		this.window.width = this.screenWidth;
		this.window.height = this.screenHeight;

		this.window.style.background = "black";
		//this.setDoubleBuffered(true);
		this.g2 = this.window.getContext("2d");
		console.log("SET G2");
		this.g2.imageSmoothingEnabled = false;

		//this.addKeyListener(this.keyH);
		//this.setFocusable(true);

		//this.addMouseMotionListener(this.mouseH);
		//this.addMouseListener(this.mouseH);
	}

	setState(new_state) {
		this.currentState = new_state;
		this.currentState.start_fr();
	}

	startGameThread() {
		//gameThread = new Thread(this);
		//gameThread.start();
		this.runStart();
	}

	getWindowSizes(_width, _height) {
		console.log(_width);
		console.log(_height);
		//scale = (int)();
		console.log((defScale / defWidth) * _width);

		tileSize = this.originalTileSize * this.scale;
		maxScreenCol = 16;
		maxScreenRow = 12;
		screenWidth = this.maxScreenCol * this.tileSize;
		screenHeight = this.maxScreenRow * this.tileSize;
	}

	runStart() {
		this.drawInterval = 1000/this.FPS;
		this.nextDrawTime = new Date().getMilliseconds() + this.drawInterval;

		GP_run(this);
	}



	paintComponent(g) {
		//super.paintComponent(g);

		//g2 = g;

		//g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
		this.currentState.draw(g);
	}

	close() {
		//window.dispatchEvent(new WindowEvent(window, WindowEvent.WINDOW_CLOSING));
	}
}


function GP_run(gp){
 	gp.currentState.update();
  g_mouseH.moving = false;
  //console.log(gp.keyH.startPressed);

 	gp.paintComponent(gp.g2);

 	let remainingTime = gp.nextDrawTime - new Date().getMilliseconds();
 	//setTimeout(function(){requestAnimationFrame()}, remainingTime);
 	//remainingTime = remainingTime / 1000000;

 	if(remainingTime < 0) {
 		remainingTime = 0;
     gp.nextDrawTime = new Date().getMilliseconds() + gp.drawInterval;
 	}

  requestAnimationFrame(function(){GP_run(gp)});
	}
