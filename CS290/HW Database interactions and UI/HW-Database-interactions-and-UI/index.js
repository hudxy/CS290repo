var express = require('express');
var app = express();


var bodyParser = require('body-parser');
var handlebars = require('express-handlebars').create({defaultView:'home'});
var mysql = require('./dbcon.js');
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static("public"));

app.set('mysql', mysql);


app.get('/', function(req, res) {
  var context = {};
  mysql.pool.query("SELECT * FROM workouts", function(error, results, fields){
    if(error) {
      console.log(error);
      res.write(JSON.stringify(error));
      res.end();
    }
    context.workout = results;

    res.status(202);
    res.render('home', context);
  });
});


app.get('/:id', function(req, res) {
  var context = {};
  mysql.pool.query("SELECT * FROM workouts", function(error, results, fields){
    if(error) {
      console.log(error);
      res.write(JSON.stringify(error));
      res.end();
    }
    context.workout = results;
    res.status(202);
    res.end(JSON.stringify(results));
  });
});


app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home', context);
    })
  });
});


app.post('/', function(req,res) {
  var context = {};
  var sql = "INSERT INTO workouts(name, reps, weight, date, lbs) VALUES (?,?,?,?,?)";
  var inserts = [req.body.Wname, req.body.reps, req.body.weight, req.body.date, req.body.lbs];
  sql = mysql.pool.query(sql,inserts, function(error, results, fields) {
    if(error) {
      console.log(error);
      res.write(JSON.stringify(error));
      res.end();
    } else {
      res.status(204);
      res.end('{"success" : "Updated Successfully", "status" : 200}');
    }
  });
});

app.get('/update/:id', function(req, res) {
  var context = {};
  var sql = "SELECT id, name, reps, weight, date, lbs FROM workouts WHERE id = ?";
  var inserts = [req.params.id];
  sql = mysql.pool.query(sql,inserts, function(error, results, fields) {
    if(error) {
      console.log(error);
      res.write(JSON.stringify(error));
      res.end();
    } else {
      context.workout = results[0];
      console.log(context.workout);
      res.render('update', context);
    }
  });
});

app.post('/update', function(req,res) {
  var context = {};
  var sql = "UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id =?";
  var inserts = [req.body.uname, req.body.ureps, req.body.uweight, req.body.udate, req.body.ulbs, req.body.uid];
  console.log(inserts);
  sql = mysql.pool.query(sql,inserts, function(error, results, fields) {
    if(error) {
      console.log(error);
      res.write(JSON.stringify(error));
      res.end();
    } else {
      console.log(results);

      res.redirect('../');
    }
  });
});

app.delete('/:id', function(req,res,next) {
  var context = {};
  var sql = "DELETE FROM workouts WHERE workouts.id =?";
  var inserts = [req.params.id];
  sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
    if(error) {
      console.log(error);
      res.write(JSON.stringify(error));
      res.status(400);
      res.end();
    } else {
      res.status(202)
      res.end();
    }
  });
});

app.use(function(req,res){
    res.status(404);
    res.send('<h1> 404 Not Found </h1>');
  });

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.send('<h1> 500 Something Went Wrong </h1>');
});

app.listen(app.get('port'), function(){
    console.log(`Express started on ${'port'} press Ctrl-C to terminate`);
});
