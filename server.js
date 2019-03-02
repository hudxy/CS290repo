var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
/* require session */
var session = require('express-session');
var request = require('request');


app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
/* new to session */
app.use(session({secret: 'password'}));


app.get('/', function(req, res, next) {
  var content = {};
  //if no session
  if(!req.session.name) {
    res.render('newForm', content);
    return;
  }
  context.name = req.session.name;
  context.toDoCount = req.session.toDo.length || 0;
  context.toDo = req.session.toDo || [];
  console.log(content.toDO);
  res.render('currentToDo', content);
});

app.post('/', function(req, res) {
  var content = {};
  //if this was submitted from newForm view
  if(req.body['New List']) {
    req.session.name = req.body.name;
    req.session.toDo = [];
    req.session.curId = 0;
  }
  //If theres no session, go to newForm
  if(!req.session.name) {
    res.render('newForm', content);
    return;
  }
  //add an toDo item
  if(req.body['Add Item']) {
    req.session.toDo.push({"name":req.body.name, "id":req.session.curId});
    req.session.curId++;
  }
  //if clicked done with task
  if(req.body['Done']) {
    req.session.toDo = req.session.toDo.filter(function(e) {
      return e.id != req.body.id;
    });
  }

  content.name = req.session.name;
  content.toDoCount = req.session.toDo.length;
  content.toDo = req.session.toDo;
  console.log(content.toDo);
  res.render('currentToDo', content);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
