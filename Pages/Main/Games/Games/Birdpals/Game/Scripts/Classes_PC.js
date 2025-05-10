class PlayerCard extends Book{
	constructor(player){
		super(player);
		this.name = 'PlayerCard';
	}

	customOpen(){
		UI.addChild(this);
		this.drawRectangle();
		this.drawBio();
		this.drawUsername();
		this.addChild(new Report(this.username));
	}

	customClose(){
		this.destroy();
	}

	drawRectangle(){
		this.graphics = new PIXI.Graphics();
		this.graphics.lineStyle(5, 0x000000);
		this.graphics.drawRoundedRect(455, 102, 340, 305, 2)
		this.addChild(this.graphics);
	}

	drawBio(){
		let bioText = new PIXI.Text(this.bio,{
			fontFamily: 'Caslon_font',
			fill: '#615f5b',
			align: 'center',
			wordWrap: true,
			breakWords: true,
			wordWrapWidth: 330
		});
		bioText.anchor.x = 0.5;
		bioText.x = 622;
		bioText.y = 140;
		if(bioText.height >= 240){
			bioText.height = 240;
		}
		this.graphics.addChild(bioText);
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
		usernameText.y = 45;
		this.addChild(usernameText)
	}
}

class Report extends PIXI.Sprite{
	constructor(playerUsername){
		super(resources.report_button.texture);
		this.interactive = true;
		this.buttonMode = true;
		this.name = 'Report';
		this.x = 70;
		this.y = 20;
		this.reportDiv = document.getElementById("reportDiv");
		this.reportInput = document.getElementById("reportInput");
		this.reportingDiv = document.getElementById("reportingDiv");
		this.submittedDiv = document.getElementById("submittedDiv");
		this.playerToReport = playerUsername;
		this.on('pointerdown', ()=>{this.openReport()});
		//Add a gray background
		this.grayBg = _.cloneDeep(transparentBg);
		this.grayBg.visible = false;
		this.addChildAt(this.grayBg, 0);
		this.grayBg.x -= 50 + this.x;
		this.grayBg.y -= 40 + this.y;
	}

	openReport(){
		this.reportInput.value = "";
		this.reportDiv.hidden = false;
		this.reportingDiv.hidden = false;
		this.submittedDiv.hidden = true;
		this.grayBg.visible = true;
		let thisReport = this.parent.getChildAt(this.parent.getChildIndex(this));
		document.getElementById('closeReport').onclick = function(){thisReport.closeReport();};
		document.getElementById('reportSubmit').onclick = function(){thisReport.submitReport();};
	}

	closeReport(){
		this.reportDiv.hidden = true;
		this.grayBg.visible = false;
	}

	submitReport(){
		command('/report', `${this.playerToReport} ${this.reportInput.value}`);
		this.reportingDiv.hidden = true;
		this.submittedDiv.hidden = false;
	}
}