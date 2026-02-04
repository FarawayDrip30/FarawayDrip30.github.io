// Random Offset
function roffset(element,offset){
    if(!element.style){console.log("Error: Element=" + element + ", Offset="+offset); return;}
    let offset_subtract = offset / 2;
    element.style.top = String(Math.floor(Math.random()*offset-offset_subtract)) + "px"
    element.style.left = String(Math.floor(Math.random()*offset-offset_subtract)) + "px"
}

function give_element_mouse_over(element,offset){
    element.onmouseover = function(){roffset(element,offset);}
    roffset(element,offset);
}

function make_as(element_tag,offset){
    let texts = Array.from(document.getElementsByTagName(element_tag));
    for(let i=0; i < texts.length; i++) {
        let text = texts[i].textContent
                
        let new_html = ""
        for(let char in text){
            new_html += '<a>' + text[char] + "</a>"
        }
            
        texts[i].innerHTML = new_html;
        
        for(let a in texts[i].children){
            give_element_mouse_over(texts[i].children[a],offset)
        }
    }
}

let as = document.getElementsByTagName("a");
for(let i in as){
    give_element_mouse_over(as[i],8);
}

make_as("h1",8);
make_as("h2",4);
make_as("h3",2);

as = document.getElementsByTagName("a");
// Run mouse over function
setInterval(function(){as[Math.floor(Math.random()*as.length)].onmouseover();},70);