let reportingDiv = document.getElementById("reportingDiv");
document.getElementById('reportInput').setAttribute('placeholder', 'Write the ban reason here...');
document.getElementById('reportThanks').textContent = 'Thanks for the Ban!';
let durationLabel = document.createElement('label');
durationLabel.textContent = 'Ban Duration';
let durationInput = document.createElement('input');
durationInput.type = 'number'; durationInput.id = 'DurationInput'; durationInput.setAttribute('min', 0); durationInput.setAttribute('max', 9999);
durationLabel.appendChild(durationInput);
durationLabel.id = 'BanDuration';
let ipBan = document.createElement('input');
ipBan.type = 'checkbox'; ipBan.id = 'IpBanC';
let ipBanLabel = document.createElement('label');
ipBanLabel.textContent = 'Ip Ban'; ipBanLabel.id = 'IpBan';
durationLabel.appendChild(ipBanLabel);
durationLabel.appendChild(ipBan);
reportingDiv.appendChild(durationLabel);

$('#BanDuration').css({
	position: 'absolute',
	top: 395 + window.scrollY,
	left: 64,
	color: 'black',
	zIndex: 32
})
$('#IpBanC').css({
	position: 'absolute',
	top: 10 + window.scrollY,
	left: 230,
	zIndex: 32
})
$('#IpBan').css({
	position: 'absolute',
	top: 18 + window.scrollY,
	left: 194,
	width: '30%',
	zIndex: 32
})
$('#DurationInput').css({
	width: '39%',
})

document.getElementById('REPORTtext').textContent = 'BAN';

PlayerCard = class PlayerCard extends Book{
	constructor(player){
		super(player);
		this.name = 'PlayerCard';
	}

	customOpen(){
		UI.addChild(this);
		this.drawRectangle();
		this.drawBio();
		this.drawUsername();
		this.addChild(new Kick(this.username));
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

Report = class Ban extends PIXI.Sprite{
	constructor(playerUsername){
		super(PIXI.Texture.from('Moderation/prison.png'));
		this.interactive = true;
		this.buttonMode = true;
		this.name = 'Ban';
		this.x = 60;
		this.y = 20;
		this.reportDiv = document.getElementById("reportDiv");
		this.reportInput = document.getElementById("reportInput");
		this.reportingDiv = document.getElementById("reportingDiv");
		this.submittedDiv = document.getElementById("submittedDiv");
		this.durationInput = document.getElementById('DurationInput');
		this.ipBan = document.getElementById('IpBanC');
		this.playerToReport = playerUsername;
		this.on('pointerdown', ()=>{this.openBan()});
		//Add a gray background
		this.grayBg = _.cloneDeep(transparentBg);
		this.grayBg.visible = false;
		this.addChildAt(this.grayBg, 0);
		this.grayBg.x -= 50 + this.x;
		this.grayBg.y -= 40 + this.y;
	}

	openBan(){
		this.reportInput.value = "";
		this.durationInput.value = "";
		this.reportDiv.hidden = false;
		this.reportingDiv.hidden = false;
		this.submittedDiv.hidden = true;
		this.grayBg.visible = true;
		let thisReport = this.parent.getChildAt(this.parent.getChildIndex(this));
		document.getElementById('closeReport').onclick = function(){thisReport.closeBan();};
		document.getElementById('reportSubmit').onclick = function(){thisReport.submitBan();};
	}

	closeBan(){
		this.reportDiv.hidden = true;
		this.grayBg.visible = false;
	}

	submitBan(){
		let banMessage;
		banMessage = `${this.durationInput.value} ${this.playerToReport} ${this.reportInput.value}`;
		if(this.ipBan.checked == true){
			banMessage = `${this.durationInput.value} ${this.playerToReport} true ${this.reportInput.value}`;
		}
		command('/ban', banMessage);
		this.reportingDiv.hidden = true;
		this.submittedDiv.hidden = false;
	}
}

class Kick extends PIXI.Sprite{
	constructor(playerUsername){
		super(PIXI.Texture.from('Moderation/kick.png'));
		this.interactive = true;
		this.buttonMode = true;
		this.name = 'Kick';
		this.x = 120;
		this.y = 20;
		this.playerToKick = playerUsername;
		this.on('pointerdown', ()=>{this.kick()});
	}

	kick(){
		command('/remove', this.playerToKick);
		this.parent.close();
	}
}