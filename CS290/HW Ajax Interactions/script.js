var weatherApiKey = '5649970fb81d67a36e54aea1471258c9';
var weather;
document.addEventListener('DOMContentLoaded', bindSubmit);
function bindSubmit(){
  document.getElementById("citySubmit").addEventListener("click", function(e) {
    var location = document.getElementById("citys").value;
     //console.log(location);
    var req = new XMLHttpRequest();
    req.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + weatherApiKey, true);
    //add addEventListener before calling send for asynchronous calls
    req.addEventListener("load", function() {
      if(req.status >=200 && req.status < 400) {
        var response = JSON.parse(req.responseText);
        console.log(JSON.parse(req.responseText));
        var temperature = response.main.temp;
        //convert to farenheit;
        var convertFarentheit = (temperature * (9/5)) - 459.67;
        document.getElementById("temp").textContent = parseFloat(convertFarentheit).toPrecision(4);
        document.getElementById("endCity").textContent = response.name;

        document.getElementById("humidity").textContent = response.main.humidity;


      } else {
        console.log("Error in network request: " + req.statusText);
      }});
    req.send();
    e.preventDefault();
})}

document.addEventListener('DOMContentLoaded', postFormSubmit);
function postFormSubmit(){
  document.getElementById("postSubmit").addEventListener("click", function(e) {
    var req = new XMLHttpRequest();
    var sentData = {temp :null, city: null, data:null};
    //populate JSON sendData
    sentData.temp = document.getElementById("temp").textContent;
    sentData.city = document.getElementById("endCity").textContent;
    sentData.data = document.getElementById("postIn").value;
    req.open("POST", "http://httpbin.org/post", true);
    //add addEventListener before calling send for asynchronous calls
    req.addEventListener("load", function() {
      if(req.status >=200 && req.status < 400) {
        var response = JSON.parse(req.responseText);
        console.log(JSON.parse(req.responseText));
        document.getElementById("postTemp").textContent = response.json.temp;
        document.getElementById("postCity").textContent = response.json.city;
        document.getElementById("postOut").textContent = response.json.data;
      }else {
        console.log("Error in network request: " + req.statusText);
      }});
      req.send(JSON.stringify(sentData));
      e.preventDefault();
})}
