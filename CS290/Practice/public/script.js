Handlebars.registerHelper('compare' function(temp, minTemp) {
  if(temp > minTemp) {
    minTemp.style.color = "lightgreen";
  }
});
