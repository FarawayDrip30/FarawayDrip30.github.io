var canvas = document.getElementById("EpicoCanvas");
var ctx = canvas.getContext("2d");

canvas.addEventListener("click", onClick);

var currentState = new PlayState();

var eyelashesOn = false;
var eyelashesAvailable = true;
var checkbox = document.getElementById("Checkbox")
checkbox.addEventListener("click",function(){
    if(eyelashesAvailable){
        if(eyelashesOn){
            eyelashesOn = false;
            checkbox.src="Assets/Sprites/unchecked.png"
        }
        else{
            eyelashesOn = true;
            checkbox.src="Assets/Sprites/checkmark.png"
        }
    }
});

function changeMicrofigure(srcname){
    currentState.body.img.src = "Assets/Sprites/microfigures/"+srcname+".png"
    if(srcname == "rat" || srcname == "fashion box worker" ||  srcname == "barman"){
        eyelashesOn = false;
        checkbox.src="Assets/Sprites/unchecked.png"
        eyelashesAvailable = false;
    }
    else{
        eyelashesAvailable = true;
    }
}

var microfigures=[
    "default","artist","baseball","bee","gumball","beta","bricky cola","cardborg","chicken","clown","devil","explorer","fancy","farmer","fireman","black hoodie","blue hoodie","green hoodie",
    "red hoodie","ghost","hedgehog","hog","i love toyventure guy","jason","green brick","chef","conspirator","fly","mummy","camo","boxer","hazmat","rat","red brick","robot",
    "school bully","scientist","skeleton costume","skeleton","sleep","snowventure","step dad","swim","TACO","top hat","turtleneck","vampire","witch","construction worker","fast food worker",
    "yeehaw","zombie","fashion box worker","barman"
];
var microfigureDiv = document.getElementById("MicrofigureDiv");
for(let i = 0; i < microfigures.length; i++){
    microfigString = '"'+microfigures[i]+'"'
    microfigureDiv.innerHTML+="<p id='"+microfigures[i]+"' onclick='changeMicrofigure("+microfigString+")'>"+microfigures[i]+"</p>";
}

function main(){
    currentState.main();
    requestAnimationFrame(main);
}
function render(){
    currentState.render();
    requestAnimationFrame(render);
}
function onClick(evt){
    currentState.onClick(evt);
}

main()
render()