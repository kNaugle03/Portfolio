// Two failed attempts at doing part 1

// function pushToBack(x){
//     if(x.className = "front"){
//         x.className = "back";
//     }
// }
//
// function pushToFront(x){
//     if(x.className = "back"){
//         x.className = "front";
//     }
// }

document.getElementById("div1").addEventListener("dblclick", toggleClass);
document.getElementById("div2").addEventListener("dblclick", toggleClass);


function toggleClass(){
    var d1 = document.getElementById("div1");
    var d2 = document.getElementById("div2");
    if(d1.className == "front") {
        d1.className = "back";
        d2.className = "front";
    }
    else if(d2.className == "front"){
        d1.className = "front";
        d2.className = "back";
    }
}

// got this cool idea from this codepen - https://codepen.io/sureshrkm/pen/ZbzBpr
// I am borrowing heavily from this idea but I've coded it by hand and used my own naming conventions
var slides = document.getElementsByClassName("slide");

var accHeaders = document.getElementsByClassName("accordion-heading");
for(var i = 0; i<accHeaders.length;i++){
    accHeaders[i].addEventListener("click", toggleAccordion);
}

function toggleAccordion(){
    var target = this.parentNode.className;
    for(var i = 0;i<slides.length;i++){
        slides[i].className = "slide closed";
    }
    if(target == "slide closed"){
        this.parentNode.className = "slide open";
    }
}


var imgs = document.getElementsByClassName("img");
var count = 0;
var timer = setInterval(function(){
    for(var i=0;i<imgs.length;i++){
        imgs[i].className = "img back"
    }
    imgs[count].className = "img front";
    count++;
    if(count == imgs.length){
        count = 0;
    }
}, 5000);