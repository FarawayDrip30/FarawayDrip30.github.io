var possible_pupils = [
    {"src": "Assets/Images/FaceStuff/Pupils/blue_yellow.png", "chance": 25},
    {"src": "Assets/Images/FaceStuff/Pupils/orange_red.png", "chance": 25},
    {"src": "Assets/Images/FaceStuff/Pupils/pink_white.png", "chance": 25},
    {"src": "Assets/Images/FaceStuff/Pupils/white_purple.png", "chance": 25},
]
var possible_eyes = [
    {"src": "Assets/Images/FaceStuff/Eyes/blue_orange.png", "chance": 25},
    {"src": "Assets/Images/FaceStuff/Eyes/red_green.png", "chance": 25},
    {"src": "Assets/Images/FaceStuff/Eyes/yellow_blue.png", "chance": 25},
    {"src": "Assets/Images/FaceStuff/Eyes/green_pink.png", "chance": 25},
]

function setRandomImg(imgElement, arr, randomTotal){
    let randomValue = Math.floor(Math.random() * randomTotal);
    for(let i = 0; i < arr.length; i++){
        randomValue -= arr[i].chance;
        if(randomValue <= 0){
            imgElement.src = arr[i].src;
            return;
        }
    }
}

var eye_offset_x = 0.5;
var eye_offset_y = 0.5;

function start_eyes(){
    var pupil = document.getElementById("pupil");
    var eye = document.getElementById("eye");

    setRandomImg(pupil, possible_pupils, 100);
    setRandomImg(eye, possible_eyes, 100);

    //let mouse_x = (window.innerWidth / 2);
    //let mouse_y = (window.innerHeight / 2);
    let mouse_x = 0;
    let mouse_y = 0;

    function moveMouse(evt){
        //let x = 25 + (evt.clientX - (window.innerWidth / 2))/50;
        //let y = 25 + (evt.clientY - (window.innerHeight / 2))/50;
        mouse_x = (evt.clientX - (window.innerWidth / 2));
        mouse_y = (evt.clientY - (window.innerHeight / 2));    
    }

    let pupil_x = 0;
    let pupil_y = 0;
    let pupil_jitter = 2;
    
    let eye_x = 0;    
    let eye_y = 0;

    function moveEye(){
        let pupil_target_x = mouse_x/4;
        let pupil_target_y = mouse_y/4;
        pupil_x = (pupil_x + pupil_target_x) / 2;
        pupil_y = (pupil_y + pupil_target_y) / 2;
        pupil.style.left = pupil_x + Math.random() * pupil_jitter + "px";    
        pupil.style.top = pupil_y + Math.random() * pupil_jitter + "px";

        let eye_target_x = mouse_x/10;
        let eye_target_y = mouse_y/10;
        eye_x = (eye_x + eye_target_x) / 2;
        eye_y = (eye_y + eye_target_y) / 2;
        eye.style.left = eye_x + "px";        
        eye.style.top = eye_y + "px";

        requestAnimationFrame(moveEye);
    }
    
    moveEye();
    
    document.addEventListener("mousemove", moveMouse)
}