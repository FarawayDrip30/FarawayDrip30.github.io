var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var half_width = canvas.width/2;
var half_height = canvas.height/2;

ctx.strokeStyle = "black";

function draw_line(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.closePath();
}

function draw_dot(x,y){
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.stroke();
}

function draw_rect(x,y,w,h){
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.fill();
    ctx.closePath();
}
function in_rect(x,y,rx,ry,rw,rh){
    return (x > rx && x < rx + rw && y > ry && y < ry + rh);
}

function draw_text(txt, x, y){
    ctx.beginPath();
    ctx.fillText(txt, x, y);
    ctx.closePath();
}

// Distance of the screen to the camera
var screen_dis = 200
function transform_point_to_screen(x,y,z){
    let mult = screen_dis / z;
    return {x: x * mult, y: y * mult};
}

function degrees_to_radians(degrees){
    return degrees * (Math.PI / 180);
}
function rotate_point(point,x,y,degrees_x, degrees_y, degrees_z){
    let rads = degrees_to_radians(degrees_x);
    let sin = Math.sin(rads);
    let cos = Math.cos(rads);
    // x axis rotation
    let new_point = {
        x: point.x,
        y: point.z * sin + point.y * cos,
        z: point.z * cos - point.y * sin,
    }


    rads = degrees_to_radians(degrees_y);
    sin = Math.sin(rads);
    cos = Math.cos(rads);
    // y axis rotation
    new_point = {
        x: new_point.x * cos - new_point.z * sin,
        y: new_point.y,
        z: new_point.x * sin + new_point.z * cos,
    }

    rads = degrees_to_radians(degrees_z);
    sin = Math.sin(rads);
    cos = Math.cos(rads);
    // z axis rotation
    new_point = {
        x: new_point.x * cos - new_point.y * sin,
        y: new_point.x * sin + new_point.y * cos,
        z: new_point.z,
    }

    return new_point;
}

var cube_verts = [
    {x: -5, y: -5, z: -5},
    {x: 5, y: -5, z: -5},
    {x: 5, y: 5, z: -5},
    {x: -5, y: 5, z: -5},

    {x: -5, y: -5, z: 5},
    {x: 5, y: -5, z: 5},
    {x: 5, y: 5, z: 5},
    {x: -5, y: 5, z: 5},
]
var lines = [
    [0,1], [1,2], [2,3], [3,0],
    [0,4], [1,5], [2,6], [3,7],
    [4,5], [5,6], [6,7], [7,4],
]

var rotation_x = 0;
var rotation_y = 0;
var rotation_z = 0;

function rotate(is_up, axis){
    if(axis == 0){
        if(is_up){
            rotation_x++;
        }
        else{
            rotation_x--;
        }
    }
    else if(axis == 1){
        if(is_up){
            rotation_y++;
        }
        else{
            rotation_y--;
        }
    }
    else if(axis == 2){
        if(is_up){
            rotation_z++;
        }
        else{
            rotation_z--;
        }
    }
}


function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    let transformed_cube_verts = []
    for(let i = 0; i < cube_verts.length; i++){
        transformed_cube_verts.push(rotate_point(cube_verts[i], 0, 0, rotation_x, rotation_y, rotation_z));
    }

    for(let i = 0; i < cube_verts.length; i++){
        let transformed_vert = transform_point_to_screen(transformed_cube_verts[i].x, transformed_cube_verts[i].y, transformed_cube_verts[i].z - 20);
        draw_dot(transformed_vert.x + half_width, transformed_vert.y + half_height);
    }

    for(let i = 0; i < lines.length; i++){
        let transformed_vert_1 = transform_point_to_screen(transformed_cube_verts[lines[i][0]].x, transformed_cube_verts[lines[i][0]].y, transformed_cube_verts[lines[i][0]].z - 20);
        let transformed_vert_2 = transform_point_to_screen(transformed_cube_verts[lines[i][1]].x, transformed_cube_verts[lines[i][1]].y, transformed_cube_verts[lines[i][1]].z - 20);
        draw_line(transformed_vert_1.x + half_width, transformed_vert_1.y + half_height, transformed_vert_2.x + half_width, transformed_vert_2.y + half_height);
    }


    // UI
    draw_text("x axis", 10, 10);
    draw_rect(10, 15, 20, 20);
    draw_rect(35, 15, 20, 20);

    draw_text("y axis", 10, 45);
    draw_rect(10, 50, 20, 20);
    draw_rect(35, 50, 20, 20);

    draw_text("z axis", 10, 80);
    draw_rect(10, 85, 20, 20);
    draw_rect(35, 85, 20, 20);


    requestAnimationFrame(draw);
}
    
requestAnimationFrame(draw);
