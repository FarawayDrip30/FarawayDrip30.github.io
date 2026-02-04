let ng_connectText = "Connecting to Newgrounds...";
let ng_connectText2 = "";
let ng_addConnectOption = false;
let ng_changeState = false;
let ng_usingNewgrounds = false;

let ng_atPassport = false;

class NewgroundsState extends State{
	constructor(_gamePanel) {
		super(_gamePanel);

		//--------------------------------

		ng_connectText = "Connecting to Newgrounds...";
		ng_connectText2 = "";

		this.connectFont = "30px serif";

  	this.selections = ["I don't Care (Skip)"]; //"Log in to Newgrounds"
  	this.selectionMenu;

    this.connected = false;

    //-----------------------------------

		this.selectionMenu = new SelectionMenu(250,200,this.selections,this.gamePanel.keyH,this.gamePanel.mouseH);

		this.passportSkips = 0;
		/*
		// Set up the options for NGIO.
    var ng_options = {
      // This should match the version number in your Newgrounds App Settings page
      version: "1.0.0",

      // If you aren't using any of these features, set them to false, or delete the line
      //checkHostLicense: true,
      //autoLogNewView: true,
      preloadMedals: true,
      preloadScoreBoards: true,
      preloadSaveSlots: true,
    };

    // initialize the API, using the App ID and AES key from your Newgrounds project
    NGIO.init("61371:aGWpxZar", "94EAjpI+PnLr60DMylG9oQ==", ng_options);

    setInterval(function(){
      console.log("Keep Newgrounds Session Alive")
      NGIO.keepSessionAlive();
    }, 10000);
    */
	}

	mouseMoved(e) {
	  console.log("mouse moved")

	}

	update() {
    // Note: the callback function only fires if there's a change in status
    NGIO.getConnectionStatus(function(status) {
      // You could hide any login/preload UI elements here (we'll show what we need later).

      // This is a generic check to see if we're waiting for something...
      if (NGIO.isWaitingStatus) {
        // We're either waiting for the server to respond, or the user to sign in on Newgrounds.
        // Show a "please wait" message and/or a spinner so the player knows something is happening
        ng_connectText = "Connecting to Newgrounds...";
        ng_connectText2 = "";
      }

      // check the actual connection status
      switch (status) {
        // we have version and license info
        case NGIO.STATUS_LOCAL_VERSION_CHECKED:
          if (NGIO.isDeprecated) {
            // this copy of the game is out of date
            // (or you forgot to update the version number in your init() call)

            // Show a 'new version available' button that calls
            // NGIO.loadOfficialUrl();
            ng_connectText = "Can't Connect to Newgrounds, ";
            ng_connectText2 = "Version too Old.";
          }
          if (!NGIO.legalHost) {
            // the site hosting this copy has been blocked

            // show the player a message ("This site is illegally hosting this game") , and add a button that calls
            // NGIO.loadOfficialUrl();
            ng_connectText = "Can't Connect to Newgrounds,";
            ng_connectText2 = "You are a Criminal."
          }
          break;
        // user needs to log in
        case NGIO.STATUS_LOGIN_REQUIRED:
          // present the user with a message ("This game uses features that require a Newgrounds account")
          // along with 2 buttons:

          // A "Log In" button that calls NGIO.openLoginPage();
          // A "No Thanks: button that calls NGIO.skipLogin();

          ng_connectText = "This Game has Features that use ";
          ng_connectText2 = "a Newgrounds Account. Log In?";
          ng_addConnectOption = true;

          break;

        // We are waiting for the user to log in (they should have a login page in a new browser tab)
        case NGIO.STATUS_WAITING_FOR_USER:

          // It's possible the user may close the login page without signing in.
          // Show a "Cancel Login" button that calls NGIO.cancelLogin();

          break;

              // user needs to log in
        case NGIO.STATUS_READY:
          if(NGIO.hasUser){
            console.log("NEWGROUNDS READY");
            // Everything should be loaded.

            // If NGIO.hasUser is false, the user opted not to sign in, so you may
            // need to do some special handling in your game.
            for(let i = 0; i < NGIO.medals.length; i++){
              ng_medalsGot[NGIO.medals[i].name] = NGIO.medals[i].unlocked;
            }

            ng_usingNewgrounds = true;
            ng_changeState = true;

            break;
          }
      }
    });

    if(ng_addConnectOption){
      ng_addConnectOption = false;
      this.selectionMenu.selections.push("Log In to Newgrounds")
    }
    if(ng_changeState){
      this.gamePanel.currentState = new TitleState(this.gamePanel);
    }

	  this.selectionMenu.checkMouse(g_mouseH.x,g_mouseH.y);
		let selectionMade = this.selectionMenu.update();
		if(selectionMade != -1) {
			switch(selectionMade) {
			case 0:
			  if(!ng_atPassport || this.passportSkips == 1){
					clearInterval(g_ngInterval);
  			  NGIO.skipLogin();
  				NGIO.logOut();
  				this.gamePanel.currentState = new TitleState(this.gamePanel);
				}
				else{
				  this.passportSkips++;
					ng_connectText = "Skip again to Skip";
          ng_connectText2 = "";
				}
				break;
			case 1:
			  ng_atPassport = true;
				ng_connectText = "Waiting for Passport...";
        ng_connectText2 = "";
			  NGIO.openLoginPage();
				//this.gamePanel.currentState = new TitleState(this.gamePanel);
				break;
			}
		}
	}

	draw(g2) {
		g2.fillStyle = "black";
		fillRect(g2, 0, 0, this.gamePanel.screenWidth, this.gamePanel.screenHeight);

		if(!this.connected){
  		g2.font = this.connectFont;
  		g2.fillStyle = "white";
  		drawString(g2, ng_connectText, 100, 100);
      drawString(g2, ng_connectText2, 100, 130);
		}

		this.selectionMenu.draw(g2);

		//g2.dispose();
	}
}
