var gamesDiv = document.getElementById("gamesDiv")
var gamesJSON = null
function loadGames(data) {
    gamesJSON = data.Games;

    for(let i = data.Games.length-1; i >= 0; i--){
        let item = data.Games[i];
        
        let name = item.name;
        let desc = item.description;
        let img = item.thumbnail;
        gamesDiv.innerHTML += '<a class="showcase" id="'+name+'" onclick="changeGame('+i+')"> <img class="showcaseImg" src="../Assets/Images/'+img+'"> <p class="showcaseText">'+name+'</p> </a>'
    }
};

var musicDiv = document.getElementById("musicDiv")
var musicJSON = null
function loadMusic(data) {
    musicJSON = data.Music;

    for(let i = data.Music.length-1; i >= 0; i--){
        let item = data.Music[i];
        
        let name = item.name;
        let desc = item.description;
        let img = item.thumbnail;
        musicDiv.innerHTML += '<a class="showcase" id="'+name+'" onclick="changeMusic('+i+')"> <img class="showcaseImg" src="../Assets/Images/'+img+'"> <p class="showcaseText">'+name+'</p> </a>'
    }
};

loadFromJSON("../Assets/JSONs/myGames.json", loadGames)
loadFromJSON("../Assets/JSONs/myMusic.json", loadMusic)