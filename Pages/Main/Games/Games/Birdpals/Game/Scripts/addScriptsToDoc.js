let antiCache = "?"+(new Date()).getTime();
let scriptsToAdd = [
    "./Scripts/States.js",
    "./Scripts/Classes_O.js",
    "./Scripts/Classes_PC.js",
    "./Scripts/Classes_Effects.js",
    "./Scripts/Classes_P.js",
    "./Scripts/Classes_G.js",
    "./Scripts/Classes_I.js",
    "./Scripts/Classes_IT.js",
    "./Minigames/Ping Pong/gsap.min.js",
    "./Minigames/Ping Pong/game.js",
    "./Scripts/pre-loader.js",
    "./Scripts/localM.js"];

let nextScriptToAddToDocIndex = 0
function addNextScriptToDoc(){
    let tempscript = document.createElement("script");
    tempscript.src = scriptsToAdd[nextScriptToAddToDocIndex] + antiCache;
    
    let tempAddedScript = document.head.appendChild(tempscript);
    tempAddedScript.onload = function(){advanceNextScriptToAddToDocIndex()}
}

function advanceNextScriptToAddToDocIndex(){
    nextScriptToAddToDocIndex += 1;
    if(nextScriptToAddToDocIndex < scriptsToAdd.length){
        addNextScriptToDoc();
    }
}

addNextScriptToDoc();