var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : '',
  user     : '',
  password : '',
  database : ''
});

var selectAll = function(callback) {
  connection.query('SELECT * FROM *******TABLE*******', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.selectAll = selectAll;
