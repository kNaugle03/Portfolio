(function(){ // IIFE Start
    "use strict";

    var colorArray = new Array(6);
    var defaultColors = [[2,0,0,0,0,0],
                         [0,1,0,0,0,0],
                         [0,0,2,0,2,0],
                         [0,0,0,0,0,1],
                         [0,1,0,2,0,1],
                         [0,0,0,2,0,0]];
    var p = "purple";
    var g = "green";
    var correctArray = [[g,g,p,p,g,p],
                        [p,p,g,g,p,g],
                        [p,p,g,p,g,g],
                        [g,g,p,p,g,p],
                        [g,p,g,g,p,p],
                        [p,g,p,g,p,g]];

    // creating the 2D array and populating them with Shape objects
    for(var row=0;row<colorArray.length;row++){
        colorArray[row] = new Array(6);
        for(var col=0;col<colorArray[row].length;col++){
            colorArray[row][col] = new Square(defaultColors[row][col], correctArray[row][col]);

        }
    }

    // function to draw out the table
    function drawTable(){
        var wrapper = document.getElementById("table-wrapper");
        var table = document.createElement("TABLE");

        table.id = "game-table";
        wrapper.appendChild(table);

        var t = document.getElementById("game-table");

        for(var x=0;x<colorArray.length;x++){
            var tr = document.createElement("TR");
            tr.id = "row" + x;
            t.appendChild(tr);
            for(var y=0;y<colorArray.length;y++){
                var r = document.getElementById("row" + x);
                var node = colorArray[x][y].print("cell"+x+"-"+y);
                r.appendChild(node);
            }
        }
    }

    // function to cycle through the colors
    function changeColor(){
        var colors = ["lightgray", "purple", "green"];
        var current = this.style.backgroundColor;

        if(current === colors[0]){
            current = colors[1];
            this.style.backgroundColor = current;
        }
        else if(current === colors[1]){
            current = colors[2];
            this.style.backgroundColor = current;
        }
        else{
            current = colors[0];
            this.style.backgroundColor = current;
        }

    }

    // function to check the correctness of the puzzle
    function checkPuzzle() {

    }

    function showIncorrect() {
        if(this.checked) {
            for (var x = 0; x < colorArray.length; x++) {
                for (var y = 0; y < colorArray.length; y++) {
                    if ((colorArray[x][y].currentColor !== colorArray[x][y].correctColor)
                        && colorArray[x][y].currentColor !== "lightgray") {
                        colorArray[x][y].innerHTML.style.visibility = "visible";
                    }
                }
            }
        }
        else if(!this.checked){
            for (var a = 0; a< colorArray.length; a++) {
                for (var b = 0; b < colorArray.length; b++) {
                    colorArray[a][b].innerHTML.style.visibility = "hidden";
                }
            }
        }
    }

    // set all my listeners
    function setListeners() {
        var clickables = document.getElementsByClassName("clickable");
        for(var i=0;i<clickables.length;i++){
            clickables[i].addEventListener("click", changeColor);
        }
        document.getElementById("check-puzzle").addEventListener("click", checkPuzzle);
        document.getElementById("show-incorrect").addEventListener("click", showIncorrect)
        // THIS IS THE OLD WAY
        // for(var x=0;x<colorArray.length;x++){
        //     for(var y=0;y<colorArray.length;y++){
        //         var id = "cell"+x+"-"+y;
        //         var tag = document.getElementById(id);
        //         if(tag.style.backgroundColor === "lightgray") {
        //             tag.addEventListener("click", changeColor)
        //         }
        //     }
        // }
    }

    //define my square object
    function Square(current, correct){
        this.colors = ["lightgray", "purple", "green"];
        this.currentColor = this.colors[current];
        this.correctColor = correct;
        this.incorrect = document.createElement("SPAN");
        this.incorrect.className = "incorrect";
        this.incorrect.innerHTML = "x";

        this.print = function (id) {
            var node = document.createElement("TD");
            node.id = id;
            node.style.backgroundColor = this.currentColor;
            if(node.style.backgroundColor === "lightgray"){
                node.className = "clickable";
                node.appendChild(this.incorrect);
            }
            return node;
        };

    }// end Square object



    drawTable(); // DRAW THE TABLE
    setListeners(); // ADD MY EVENT LISTENERS

})(); // IIFE End