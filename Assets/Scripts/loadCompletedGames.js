var gamesTable = document.getElementById("gamesTable")
var gamesJSON = null
$.getJSON('../Assets/JSONs/completedGames.json', function(data) {
    gamesJSON = data.Games;

    for(let i = 0; i < data.Games.length; i++){
        let item = data.Games[i];
        
        let name = item.name;
        let platform = item.platform;
        let dateCompleted = item.completionDate;
        let effort = item.effort
        let noeffort
        if(!effort){noeffort = "hidden class='noEffort'"}
        gamesTable.innerHTML += '<tr '+noeffort+'><td>'+name+'</td><td>'+platform+'</td><td>'+dateCompleted+'</td><td>'+effort+'</td></tr>'
    }
},);