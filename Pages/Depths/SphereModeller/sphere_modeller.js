window.onload = function(){
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

    // Distance of the screen to the camera
    var screen_dis = 200
    function transform_point_to_screen(x,y,z){
        let mult = screen_dis / z;
        return {x: x * mult, y: y * mult};
    }

    function degrees_to_radians(degrees){
        return degrees * (Math.PI / 180);
    }
    function rotate_point(point,x,y,degrees){
        let rads = degrees_to_radians(degrees);
        let sin = Math.sin(rads);
        let cos = Math.cos(rads);

        let new_point = {
            x: point.x * cos - point.y * sin,
            y: point.x * sin + point.y * cos,
            z: point.z,
        }

        /*new_point = {
            x: new_point.x,
            y: new_point.x * sin + new_point.y * cos,
            z: new_point.x * cos - new_point.y * sin,
        }*/

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

    var rotation = 0;
    function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);

        rotation++;

        let transformed_cube_verts = []
        for(let i = 0; i < cube_verts.length; i++){
            transformed_cube_verts.push(rotate_point(cube_verts[i], 0, 0, rotation));
        }

        for(let i = 0; i < cube_verts.length; i++){
            let transformed_vert = transform_point_to_screen(transformed_cube_verts[i].x, transformed_cube_verts[i].y, transformed_cube_verts[i].z);
            draw_dot(transformed_vert.x + half_width, transformed_vert.y + half_height);
        }

        for(let i = 0; i < lines.length; i++){
            let transformed_vert_1 = transform_point_to_screen(transformed_cube_verts[lines[i][0]].x, transformed_cube_verts[lines[i][0]].y, transformed_cube_verts[lines[i][0]].z);
            let transformed_vert_2 = transform_point_to_screen(transformed_cube_verts[lines[i][1]].x, transformed_cube_verts[lines[i][1]].y, transformed_cube_verts[lines[i][1]].z);
            draw_line(transformed_vert_1.x + half_width, transformed_vert_1.y + half_height, transformed_vert_2.x + half_width, transformed_vert_2.y + half_height);
        }

        requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
}