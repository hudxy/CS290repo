
//Change a elements border
var select = function(cell) {
  var yes;
  if(cell.style.backgroundColor == "yellow") {
    yes = true;
  }
  else {
    yes = false;
  }

  if((cell.getAttribute("border") == 0) || (cell.getAttribute("border") == null)) {
    cell.setAttribute("border", "10");
    cell.style.cssText = "color: black; border: 5px solid black";
    if(yes) {
      cell.style.cssText += "background-color: yellow";
    }

  }
  else {
    cell.setAttribute("border", "0");
    cell.style.cssText = "color: black; border: 1";
    if(yes) {
      cell.style.cssText += "background-color: yellow";
    }
  }
}


//refernce body
var body = document.body;

//create table
var table = document.createElement("table");
//create table body
var tableBody = document.createElement("tbody");
//create table header
var tableHead = document.createElement("thead");
//create first Header Row
var row1 = document.createElement("tr");

for(var t = 0; t<4; t++) {
    //create table header cell
  var dataHead = document.createElement("th");
    //add contents to head cell
  dataHead.textContent = "Header " + (t+1);
    //add head cell to row
  row1.appendChild(dataHead);
}
  //add row to table header
tableHead.appendChild(row1);

 
for (var i = 0; i < 3; i++) {
   //create table row
  var row = document.createElement("tr");

  for (var j = 0; j < 4; j++) {
     //create data cell
    var data = document.createElement("td");
      //add contents to data cell
    data.textContent = "position: " + (i+1) + " , " + (j+1);
      //add data cell to row
    row.appendChild(data);
  }

   //add row to table body
  tableBody.appendChild(row);
}
  //add table header to table
table.appendChild(tableHead);
  //add tbale body to table
table.appendChild(tableBody);
 //add table to HTML body
body.appendChild(table);
 //add border to table
table.setAttribute("border", "5");


var i =0;
var j =0;
var first = tableBody.children[i].children[j];
select(first);




document.addEventListener('keydown', function(e) {
//de-select data cell
  select(first);
  //UP arrow
  if(e.keyCode == '38') {
    i = i-1;
  }
  //RIGHT arrow
  else if(e.keyCode == '39') {
    j = j+1;
  }
  //LEFT arrow
  else if(e.keyCode == '37') {
    j = j - 1;
  }
  //DOWN arrow
  else if(e.keyCode == '40') {
    i = i+1;
  }

//Out of bounds checks for up and down
  if(i > 2) {
    i = 2;
  }
  else if(i < 0) {
    i = 0;
  }
//Out of bounds checks for left and right
  if(j > 3) {
    j = 3;
  }
  else if(j < 0) {
    j = 0;
  }

  first = tableBody.children[i].children[j];
//select new data cell
  select(first);
});

//make button
var button = document.createElement("button");
button.textContent = "Mark Cell";

//add button to body
body.appendChild(button);

button.addEventListener("click", function() {
  var current = first;
  current.style.cssText += "background-color: yellow";

});
