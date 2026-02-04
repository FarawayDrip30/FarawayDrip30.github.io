var gamesTable = document.getElementById("gamesTable")
var gamesJSON = null
function loadCompletedGames(data){
    gamesJSON = data.Games;

    for(let i = 0; i < data.Games.length; i++){
        let item = data.Games[i];
        
        let name = item.name;
        let platform = item.platform;
        let dateCompleted = item.completionDate;
        let completionRequirement = item.completionRequirement
        if(completionRequirement == null){completionRequirement = "All Achievements"}
        let effort = item.effort
        let noeffort
        if(!effort){noeffort = "hidden class='noEffort'"}
        gamesTable.innerHTML += '<tr '+noeffort+'><td>'+name+'</td><td>'+platform+'</td><td>'+dateCompleted+'</td><td>'+completionRequirement+'</td><td>'+effort+'</td></tr>'
    }
};

loadFromJSON("../Assets/JSONs/completedGames.json", loadCompletedGames)