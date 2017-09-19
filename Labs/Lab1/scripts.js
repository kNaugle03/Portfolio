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
    //alert(x.className);
    var d1 = document.getElementById("div1");
    var d2 = document.getElementById("div2");
    if(d1.className == "front"){
        d1.className = "back";
        d2.className = "front";
        d1.style.opacity = 0.5;
        d2.style.opacity = 1;
    }
    else{
        d1.className = "front";
        d2.className = "back";
        d1.style.opacity = 1;
        d2.style.opacity = .5;
    }
}