(function(){ // IIFE Start
    "use strict";

    //USED FOR TESTING ONLY
    //document.getElementById("finish").addEventListener("click", finishGame);
    //USED FOR TESTING ONLY

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

    var checkPuzzle = document.getElementById("check-puzzle");
    var showIncorrect = document.getElementById("show-incorrect");
    var playAgain = document.getElementById("play-again");
    var giveUp = document.getElementById("give-up");

    // set all my listeners
    function setListeners() {
        var clickables = document.getElementsByClassName("clickable");
        for(var i=0;i<clickables.length;i++){
            clickables[i].addEventListener("click", changeColor);
        }
        checkPuzzle.addEventListener("click", puzzleChecker);
        showIncorrect.addEventListener("click", checkIncorrectSquares);
        playAgain.addEventListener("click", restart);
        giveUp.addEventListener("click", restart);
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
        showIncorrect.checked = false;
        var colors = ["lightgray", "purple", "green"];
        var current = this.style.backgroundColor;

        for (var a = 0; a< colorArray.length; a++) { // reset all incorrect squares
            for (var b = 0; b < colorArray.length; b++) {
                colorArray[a][b].incorrect.style.visibility = "hidden";
            }
        }

        if(current === colors[0]){
            current = colors[1];
            this.currentColor = current;
            this.style.backgroundColor = current;
        }
        else if(current === colors[1]){
            current = colors[2];
            this.currentColor = current;
            this.style.backgroundColor = current;
        }
        else{
            current = colors[0];
            this.currentColor = current;
            this.style.backgroundColor = current;
        }

    }

    // function to check the state of the puzzle
    function puzzleChecker() {
        var msgRight = document.getElementById("msg1");
        var msgWrong = document.getElementById("msg2");
        var msgDone = document.getElementById("msg3");
        msgRight.style.display = "none";
        msgWrong.style.display = "none";
        msgDone.style.display = "none";

        outerLoop:
        for(var x=0;x<colorArray.length;x++){
            for(var y=0;y<colorArray.length;y++){
                var cell = document.getElementById("cell"+x+"-"+y);
                var lastCell = document.getElementById("cell5-5");
                if(cell.style.backgroundColor !== colorArray[x][y].correctColor
                    && cell.style.backgroundColor !== "lightgray"){
                    msgRight.style.display = "none";
                    msgWrong.style.display = "block";
                    break outerLoop;
                }
                else if(colorArray[x][y].currentColor === colorArray[x][y].correctColor){
                    msgRight.style.display = "block";
                }
                else if(lastCell.style.backgroundColor === colorArray[5][5].correctColor){
                    msgRight.style.display = "none";
                    msgDone.style.display = "block";
                    finishGame();
                    break outerLoop;
                }
            }
        }
    }

    // function to check and highlight incorrect squares
    function checkIncorrectSquares() {
        if(this.checked) {
            for (var x = 0; x < colorArray.length; x++) {
                for (var y = 0; y < colorArray.length; y++) {
                    var cell = document.getElementById("cell"+x+"-"+y);
                    if ((cell.style.backgroundColor !== colorArray[x][y].correctColor)
                        && cell.style.backgroundColor !== "lightgray") {
                        colorArray[x][y].incorrect.style.visibility = "visible";
                    }
                }
            }
        }
        else if(!this.checked){
            for (var a = 0; a< colorArray.length; a++) {
                for (var b = 0; b < colorArray.length; b++) {
                    colorArray[a][b].incorrect.style.visibility = "hidden";
                }
            }
        }
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

    function restart(){
        var yes = confirm("Would you like to play again?");
        var div = document.getElementById("table-wrapper");

        if(yes){
            while (div.firstChild){
                div.removeChild(div.firstChild)
            }
            drawTable();
            setListeners();
        }

        document.getElementById("msg4").style.display = "none";
        document.getElementById("inc-label").style.display = "inline-block";
        giveUp.style.display = "block";
        showIncorrect.style.display = "initial";
        checkPuzzle.style.display = "block";
        playAgain.style.display = "none";
    }

    // remove all listeners and complete the game
    function finishGame() {
        var clickables = document.getElementsByClassName("clickable");

        for(var i=0;i<clickables.length;i++){
            clickables[i].removeEventListener("click", changeColor);
        }
        for(var x=0;x<colorArray.length;x++){
            for(var y=0;y<colorArray.length;y++){
                var id = "cell"+x+"-"+y;
                var tag = document.getElementById(id);
                tag.style.backgroundColor = "white";
                tag.style.border = "2px dashed green";
            }
        }

        document.getElementById("msg1").style.display = "none";
        document.getElementById("msg2").style.display = "none";
        document.getElementById("msg3").style.display = "none";
        document.getElementById("msg4").style.display = "block";
        document.getElementById("inc-label").style.display = "none";
        giveUp.style.display = "none";
        checkPuzzle.style.display = "none";
        showIncorrect.style.display = "none";
        playAgain.style.display = "block";

    }

    drawTable(); // DRAW THE TABLE
    setListeners(); // ADD MY EVENT LISTENERS

})(); // IIFE End