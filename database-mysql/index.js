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

const addUser = function(email, password, firstname, lastname, bio, role, location, race, cb) {
  bcrypt.hash(password, 10, function(err, hash) {
    connection.query('INSERT INTO users (email, password, firstname, lastname, bio, role, location, race) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [email, hash, firstname, lastname, bio, role, location, race], function(err, results) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    }
  )
})
}


var getUserByEmail = function(email, cb) {
  connection.query('SELECT * FROM users WHERE email=?', [email], function(err, results) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  })
}

var getUserByName = function(first, last, cb) {
  connection.query('SELECT * FROM users WHERE firstname=? AND lastname=?', [first, last], function(err, results) {
    // need to add query to also get followers/favorites from votercandidate table and send them back too
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
module.exports.getUserByName = getUserByName;
