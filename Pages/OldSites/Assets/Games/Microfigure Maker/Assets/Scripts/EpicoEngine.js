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
            checkbox.src="../Assets/Sprites/unchecked.png"
        }
        else{
            eyelashesOn = true;
            checkbox.src="../Assets/Sprites/checkmark.png"
        }
    }
});

function changeMicrofigure(srcname){
    currentState.body.img.src = "../Assets/Sprites/microfigures/"+srcname+".png";
    if(srcname == "fashion box worker" ||  srcname == "barman"){
        eyelashesOn = false;
        checkbox.src="../Assets/Sprites/unchecked.png"
        eyelashesAvailable = false;
    }
    else{
        eyelashesAvailable = true;
    }
}
var wearingHat = false
function removeHat(){
    wearingHat = false;
}
function changeHat(srcname){
    currentState.hat.img.src = "../Assets/Sprites/hats/"+srcname+".png";
    wearingHat = true;
}

var microfigures=[
    "default","artist","baseball","bee","gumball","beta","bricky cola","cardborg","chicken","clown","devil","explorer","fancy","farmer","fireman","black hoodie","blue hoodie","green hoodie",
    "red hoodie","ghost","hedgehog","hog","i love toyventure guy","jason","green brick","chef","conspirator","fly","mummy","camo","boxer","hazmat","rat","red brick","robot",
    "school bully","scientist","skeleton costume","skeleton","sleep","snowventure","step dad","swim","TACO","top hat","turtleneck","vampire","witch","construction worker","fast food worker",
    "yeehaw","zombie","fashion box worker","barman"
];
var microfigureDiv = document.getElementById("MicrofigureDiv");
for(let i = 0; i < microfigures.length; i++){
    let microfigString = '"'+microfigures[i]+'"';
    microfigureDiv.innerHTML+="<p onclick='changeMicrofigure("+microfigString+")'>"+microfigures[i]+"</p>";
}

var hats=[
    "alien","artist","doll","beekeeper","bricky cola","bucket","hot dog","cardborg","clown","chicken","blue paper crown","devil","explorer","top hat","farmer","fireman","hard hat",
    "number 1 fan","hedgehog","hog","bowler","crown","chef","mexican fighter","snowball","pan","propeller","robber","paper crown","lamp","vampire","bat","viking","red cap","army","yeehaw",
    "sauce"
]
var hatDiv = document.getElementById("HatDiv");
for(let i = 0; i < hats.length; i++){
    let hatString = '"'+hats[i]+'"'
    hatDiv.innerHTML+="<p onclick='changeHat("+hatString+")'>"+hats[i]+"</p>";
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