//delete row of column and send delete request to server
function deleteRow(tableId, curRow, id) {
  try {
    var table = document.getElementById(tableId);
    var rowCount = table.rows.length;
    for (var i = 0; i < rowCount; i++) {
      var row = table.rows[i];
      if (row==curRow.parentNode.parentNode) {
        table.deleteRow(i);
        rowCount--;
        i--;
      }
    }
  }
  catch (e) {
    alert(e);
  }
  $.ajax({
    url : '/' + id,
    type: 'DELETE',
    success: function(result) {
      console.log('AJAX sent');
    }
  })
}

//send get request to server and update table
function addRow(tableId) {
  $.ajax({
    url : '/' + tableId,
    type: 'GET',
    success: function(result) {
      try {
        var table = document.getElementById('newTable');
        var rows = table.tBodies[0];
        if(table.tBodies[0]) {
          table.removeChild(rows);
        }
        var tbody = document.createElement("tbody");
        var tr = document.createElement("tr");
        var results = JSON.parse(result);
        for(var key in results) {
          var tr = document.createElement("tr");
          for(var p in results[key]) {
            var td = document.createElement("td");
            if(p == 'id') {
              var button = document.createElement("button");
              button.innerHTML = "Delete";
              button.value = results[key][p];
              td.appendChild(button);
              button.onclick = function() {deleteRow('newTable', this, this.value)};
              var update = document.createElement("a");
              update.innerHTML = "Update";
              update.href = "/update/" + results[key][p];
              td.appendChild(update);
            }
            else if(p == 'lbs') {
              if(results[key][p]) {
                var nnode = document.createTextNode("lbs");
              } else {
                var nnode = document.createTextNode("kg");
              }
              td.appendChild(nnode);
            }
            else {
              var nnode = document.createTextNode(results[key][p]);
              td.appendChild(nnode);
            }
            tr.appendChild(td);
          }
          tbody.appendChild(tr);
        }
        table.appendChild(tbody);
      }
      catch (e) {
        alert(e);
      }
    }
  })
}

//send post with form data to server and call add row to update table
function sendPost() {

  var sentData = {name: null, reps: null, weight: null, date: null, lbs: null};
  sentData.Wname = document.getElementById("Wname").value;
  sentData.reps = document.getElementById("reps").value;
  sentData.weight = document.getElementById("weight").value;
  sentData.date = document.getElementById("date").value;
  sentData.lbs = document.getElementById("lbs").value;

  $.ajax({
    url: "/",
    type: "POST",
    data: sentData,
    success: function(data) {
      console.log(data);
    }
  });
}
$(document).ready(function() {
  addRow('newTable');
})
