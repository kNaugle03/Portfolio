
var studentArray = [];
var usedId = [];
//var theForm = document.getElementById("theForm");
var button = document.getElementById("submit");
var studentList = document.getElementById("studentList");
var jsonList = document.getElementById("jsonList");
var hiddenDiv = document.getElementById("hidden");
var studentDiv = document.getElementById("students");
var studentId = document.getElementById("id");
var firstName = document.getElementById("fName");
var lastName = document.getElementById("lName");

studentDiv.addEventListener("mouseenter", showJsonList);

hiddenDiv.addEventListener("click", function(){
    this.style.visibility = "hidden";
});

button.addEventListener("click", function(){
    var currentId = studentId.value;
    var fName = firstName.value;
    var lName = lastName.value;

    for(var i=0;i<usedId.length;i++){
        if(currentId === usedId[i]){
            document.getElementById("errorMessage").style.visibility = "visible";
            studentId.style.border = "3px inset red";
            return false;
        }
    }
    var student = new Student(currentId, fName, lName);
    studentArray.push(student);
    document.getElementById("errorMessage").style.visibility = "hidden";
    var node = student.generateReportNode();
    studentList.appendChild(node);
    clearTextBoxes();
});


function Student(id, firstName, lastName) {
    this.studentId = id;
    usedId.push(id);
    this.fName = firstName;
    this.lName = lastName;

    this.generateReportNode = function(){
        var node = document.createElement("LI");
        var text = document.createTextNode("ID: " + this.studentId + ",  " + "First Name:  " +
                                           this.fName + ",  " + "Last Name:  " + this.lName);
        node.appendChild(text);
        return node;
    }
}


function clearTextBoxes(){
    studentId.value = "";
    firstName.value = "";
    lastName.value = "";
}


function showJsonList(){
    while(jsonList.firstChild){
        jsonList.removeChild(jsonList.firstChild);
    }
    for(var i=0;i<studentArray.length;i++){
        var node = document.createElement("LI");
        var txt = document.createTextNode(JSON.stringify(studentArray[i]));
        node.appendChild(txt);
        jsonList.appendChild(node);
    }
    hiddenDiv.style.visibility = "visible";
}