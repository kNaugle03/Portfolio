(function(){ // IIFE Start
    "use strict";

    var colorArray = new Array(6);
    var defaultColors = [[2,0,0,0,0,0],
                         [0,1,0,0,0,0],
                         [0,0,2,0,2,0],
                         [0,0,0,0,0,1],
                         [0,1,0,2,0,1],
                         [0,0,0,2,0,0]];
    var correctArray = [[],[],[],[],[],[]];

    // creating the 2D array and populating them with Shape objects
    for(var row=0;row<colorArray.length;row++){
        colorArray[row] = new Array(6);
        for(var col=0;col<colorArray[row].length;col++){
            colorArray[row][col] = new Square(defaultColors[row][col]);
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
                var node = colorArray[x][y].print("col"+x+"-"+y);
                r.appendChild(node);
            }
        }
    }

    //define my square object
    function Square(c){
        this.colors = ["lightgray", "purple", "green"];
        this.currentColor = this.colors[c];
        this.index = 0;

        this.changeColor = function(){
            this.index++;
            if(this.index >= this.colors.length){
                this.index = 0;
            }
            this.currentColor = this.colors[this.index];
        };

        this.print = function (id) {
            var node = document.createElement("TD");
            node.id = id;
            node.style.backgroundColor = this.currentColor;
            return node;
        };

    }// end Square object



    drawTable(); // DRAW THE TABLE

})(); // IIFE End