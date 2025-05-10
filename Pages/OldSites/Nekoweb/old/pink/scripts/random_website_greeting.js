function rwg_generate_greeting(){
    let greetings = ["Salutations","Howdy","Congratulations","Howdy doo","Come on in","Make yourself at home","What's up"];
    let adjectives = ["Wacky","Awesome","Perpendicular","Orange"];
    let places = ["Segment","Corner","Demonstration","Lair"];
    let internet = ["Net","Internet","Redes Sociales","Dot com bubble","Hellscape"];
    document.getElementById("Greeting").innerHTML = "["+ greetings[Math.floor(Math.random()*greetings.length)] + "] to my [" + adjectives[Math.floor(Math.random()*adjectives.length)] + "] [" + places[Math.floor(Math.random()*places.length)] + "] of the [" + internet[Math.floor(Math.random()*internet.length)] + "]";
}
rwg_generate_greeting()