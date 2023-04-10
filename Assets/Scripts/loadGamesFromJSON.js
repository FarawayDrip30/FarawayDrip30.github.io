var gamesDiv = document.getElementById("gamesDiv")
var gamesJSON = null
$.getJSON('Assets/JSONs/myGames.json', function(data) {
    gamesJSON = data.Games;

    for(let i = data.Games.length-1; i >= 0; i--){
        let item = data.Games[i];
        
        let name = item.name;
        let desc = item.description;
        let img = item.thumbnail;
        gamesDiv.innerHTML += '<a class="showcase" id="'+name+'" onclick="changeGame('+i+')"> <img class="showcaseImg" src="Assets/Images/'+img+'"> <p class="showcaseText">'+name+'</p> </a>'
    }
},);