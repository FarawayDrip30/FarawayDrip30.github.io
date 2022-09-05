$.getJSON('Assets/JSONs/myGames.json', function(data) {
    $.each(data.Games, function(i, item) {
        var name = item.name;
        console.log(name)
        // now display the name and price on the page here!
    });
    }, 
);