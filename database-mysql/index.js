var mysql = require('mysql');
var bcrypt = require('bcrypt');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'grassroots'
});

connection.connect(err => {
  if (err) {
    console.log('error connecting to database');
  } else {
    console.log('Database connected!');
  }
});

const selectAllRaces = function(cb) {
  connection.query('SELECT * FROM races', function(err, results) {
    if(err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
};

const addUser = function(email, password, firstname, lastname, role, bio, location, race, cb) {
  console.log(cb);
  bcrypt.hash(password, 10, function(err, hash) {
    connection.query('INSERT INTO users (email, password, name, role, bio, location, race) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [email, hash, firstname, lastname, role, bio, location, race], function(err, results) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    }
  )
})
}

const getUserByEmail = function(email, cb) {
  connection.query('SELECT * FROM users where email=?', [email], function(err, results) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  })
}


module.exports.selectAllRaces = selectAllRaces;
module.exports.addUser = addUser;
module.exports.getUserByEmail = getUserByEmail;
