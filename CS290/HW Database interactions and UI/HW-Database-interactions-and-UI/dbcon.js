var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_deanh',
  password        : '8918',
  database        : 'cs290_deanh'
});

module.exports.pool = pool;
