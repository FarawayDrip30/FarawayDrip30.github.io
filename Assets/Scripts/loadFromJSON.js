function loadFromJSON(file,func){
    $.getJSON(file+'?dc='+(new Date()).getTime(), function(data){
        func(data);
    });
}