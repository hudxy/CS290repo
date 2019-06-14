var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'index'});
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8123);

app.get('/', function(req, res){
  var dataParams =[];
  for(var p in req.query) {
    dataParams.push({'name': p, 'value' : req.query[p]});
  }
  var data = {};
  data.param = dataParams;
  res.render('get', data);
});

app.post('/', function(req,res){
  var dataParams = [];
  for (var p in req.body){
    dataParams.push({'name':p,'value':req.body[p]})
  }
  var data = {};
  data.param = dataParams;
  res.render('post', data);
});

app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on flip' + app.get('port') + '; press Ctrl-C to terminate.');
});
