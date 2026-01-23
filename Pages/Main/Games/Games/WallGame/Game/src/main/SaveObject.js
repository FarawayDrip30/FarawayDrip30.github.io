var g_hscores = [0,0,0];
let numChars = "123";
var medalStarts = ["Wall", "Mouse", "Bounce"];
var medalNameToId = {
  Wall10: 87945,
  Wall25: 87946,
  Wall50: 87947,
  Wall100: 87948,

  Mouse10: 87949,
  Mouse25: 87950,
  Mouse50: 87951,
  Mouse100: 87952,

  Bounce10: 87953,
  Bounce25: 87954,
  Bounce50: 87955,
  Bounce100: 87956,
}
var ng_medalsGot = {
  Wall10: false,
  Wall25: false,
  Wall50: false,
  Wall100: false,

  Mouse10: false,
  Mouse25: false,
  Mouse50: false,
  Mouse100: false,

  Bounce10: false,
  Bounce25: false,
  Bounce50: false,
  Bounce100: false,
}

var g_data_loaded = false;
var ng_files_loaded = 0;

var g_save_inited = false;
class SaveObject {
	static init() {
	  if(g_save_inited) {return;}
		g_save_inited = true;

	  if(ng_usingNewgrounds){
			if (!NGIO.getSaveSlot(1).hasData) {
        // Warn the player they will lose existing save data!
        NGIO.setSaveSlotData(1, "0", onSaveComplete);
        NGIO.setSaveSlotData(2, "0", onSaveComplete);
        NGIO.setSaveSlotData(3, "0", onSaveComplete);
      }
      else{
        NGIO.getSaveSlotData(1, onSaveDataLoaded1);
        NGIO.getSaveSlotData(2, onSaveDataLoaded2);
        NGIO.getSaveSlotData(3, onSaveDataLoaded3);
      }
		}
		else{
  	  console.log("DOCUMENT COOKIE");
  		console.log(document.cookie);
  		if(document.cookie == ""){
  		  console.log("EMPTY COOKIE")
  			document.cookie = "scores1=0; expires=Thu, 18 Dec "+(new Date().getFullYear()+100)+" 12:00:00 UTC";
  			document.cookie = "scores2=0; expires=Thu, 18 Dec "+(new Date().getFullYear()+100)+" 12:00:00 UTC";
  			document.cookie = "scores3=0; expires=Thu, 18 Dec "+(new Date().getFullYear()+100)+" 12:00:00 UTC";
        g_data_loaded = true;
  		}
  		else{
  		  console.log("LOADING COOKIE");
  			let tCookie = document.cookie;
  			let numMode = false;
  			let numString = "";
        let lastChar = '';
  			let scoreId = 0;
  			for(let c = 0; c < tCookie.length; c++){
  			  if(numMode){
  					if(tCookie[c] == ';'){
  					  numMode = false;
  						g_hscores[scoreId] = parseInt(numString);
  						console.log("Score:",numString);
  						numString = '';
              lastChar = c;
  					  continue;
  					}
  					numString += tCookie[c];
  				}
  				else{
   			    if(tCookie[c] == '='){
         			numMode = true;
    				}
            else if(numChars.includes(tCookie[c]) && lastChar == 'e'){
              scoreId = parseInt(tCookie[c])-1;
              console.log("Cookie slot:",scoreId);
            }
  				}
          lastChar = c;
  			}
        // Add last cookie
        if(numMode){
      		g_hscores[scoreId] = parseInt(numString);
      	}

        g_data_loaded = true;
        console.log(g_hscores);
      }


      // Load Settings (We just use cookies fr)
      if(document.cookie == "" || document.cookie.search("musicVol") == -1 || document.cookie.search("sfxVol") == -1){
        document.cookie = "musicVol=8; expires=Thu, 18 Dec "+(new Date().getFullYear()+100)+" 12:00:00 UTC";
        document.cookie = "sfxVol=8; expires=Thu, 18 Dec "+(new Date().getFullYear()+100)+" 12:00:00 UTC";
      }
      else{
        let tCookie = document.cookie
        let pos = tCookie.search("musicVol");
        let numString = "";

        for(let c = pos + 9; c < tCookie.length; c++){
     			if(tCookie[c] == ';'){
            g_music_volume = parseInt(numString);
            g_musicGainNode.gain.value = g_music_volume/10;
            console.log("Music Volume: " + g_music_volume);
     				numString = '';
            break;
     			}
     			numString += tCookie[c];
        }
        if(numString != ''){
          g_music_volume = parseInt(numString);
          g_musicGainNode.gain.value = g_music_volume/10;
          console.log("Music Volume: " + g_music_volume);
   				numString = '';
        }

        pos = tCookie.search("sfxVol");
        for(let c = pos + 7; c < tCookie.length; c++){
     			if(tCookie[c] == ';'){
            g_sfx_volume = parseInt(numString);
            g_sfxGainNode.gain.value = g_sfx_volume/10;
            console.log("Sfx Volume: " + g_sfx_volume);
     				numString = '';
            break;
     			}
     			numString += tCookie[c];
        }
        if(numString != ''){
          g_sfx_volume = parseInt(numString);
          g_sfxGainNode.gain.value = g_sfx_volume/10;
          console.log("Sfx Volume: " + g_sfx_volume);
   				numString = '';
        }
      }
		}


		/*
		for(let i = 1; i < 4; i++) {
		  document.cookie = "scores"+i+"=0; expires=Thu, 18 Dec "+(new Date().getFullYear()+10)+" 12:00:00 UTC";
			try {
				File myObj = new File("saves/scores"+i+".txt");
				if (myObj.createNewFile()) {
					System.out.println("File created: " + myObj.getName());
			    } else {
			        System.out.println("File already exists.");
			    }
			} catch (e) {
			    System.out.println("An error occurred.");
			    e.printStackTrace();
			}
		}
		*/
	}

	static saveToFile(fileId, score) {
	  if(ng_usingNewgrounds){
			NGIO.setSaveSlotData(fileId, score.toString(), onSaveComplete);
		}
		else{
		  document.cookie = "scores"+fileId+"="+score+"; expires=Thu, 18 Dec "+(new Date().getFullYear()+100)+" 12:00:00 UTC";
		}
		g_hscores[fileId-1] = score;
	}

	static getScore(fileId) {
	  return(g_hscores[fileId-1])
	}
}


function onSaveComplete(slot) {
    console.log("Slot "+slot.id+" was updated");
    ngFileLoaded();
}

function onSaveDataLoaded1(data)
{
  g_hscores[0] = parseInt(data);
  console.log(g_hscores);
  ngFileLoaded();
}
function onSaveDataLoaded2(data)
{
  g_hscores[1] = parseInt(data);
  console.log(g_hscores);
  ngFileLoaded();
}
function onSaveDataLoaded3(data)
{
  g_hscores[2] = parseInt(data);
  console.log(g_hscores);
  ngFileLoaded();
}

function ngFileLoaded(){
  ng_files_loaded++;
  if(ng_files_loaded >= 3){
    console.log("DATA LOADED FROM NG");
    g_data_loaded = true;
  }
}
