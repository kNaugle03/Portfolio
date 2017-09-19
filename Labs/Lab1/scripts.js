function pushToBack(x){
    if(x.className = "front"){
        x.className = "back";
    }
}
function pushToFront(x){
    if(x.className = "back"){
        x.className = "front";
    }
}
function toggleClass(){
    var d1 = document.getElementById("div1");
    var d2 = document.getElementById("div2");
    if(d1.className == "front"){
        d1.className = "back";
        d2.className = "front";
    }
    else if(d2.className == "front"){
        d1.className = "front";
        d2.className = "back";
    }
}