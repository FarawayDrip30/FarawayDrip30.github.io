function fillRect(ctx, x, y, w, h){
  ctx.beginPath();
  ctx.fillRect(x,y,w,h);
  ctx.closePath();
}

function drawString(ctx, text, x, y){
  //ctx.beginPath();
  ctx.fillText(text, x, y);
  //ctx.closePath();
}

function drawImage(ctx, img, x, y, w, h){
  ctx.beginPath();
  ctx.drawImage(img, x, y, w, h);
  ctx.closePath();
}

function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function RGBtoHex(r, g, b) {
  //return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return "#" + r.toString(16).padStart(2,'0') + g.toString(16).padStart(2,'0') + b.toString(16).padStart(2,'0');
}

function HextoRGB(hex){
  return {
    r: parseInt(hex.slice(1,2), 16),
    g: parseInt(hex.slice(3,4), 16),
    b: parseInt(hex.slice(5,6), 16)
  }
}
