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

var addEvent = function(title, location, date, time, description, host, cb) { // host should be the email of the logged in user\
  connection.query('INSERT INTO events (title, location, date, time, description, host) VALUES (?, ?, ?, ?, ?, (SELECT id FROM users WHERE email=?))',
    [title, location, date, time, description, host], function(err, result) {
      console.log(err, result)
      if (err) {
        cb(err, null);
      } else {
        attendEvent(title, host, function(err, result) { // host will be listed as attendee so they have to attend
          if (err) {
            cb(err, null);
          } else {
            cb(null, result);
          }
        });
      }
    }
  )
}

var attendEvent = function(title, email, cb) { // query will insert based on userid and eventid so retrieve those first
  connection.query('INSERT INTO eventsusers (event, user) VALUES ((SELECT id FROM users WHERE email=?), (SELECT id FROM events WHERE title=?))', function(err, result) {
    if (err) {
      cb(err, null);
    } else {
      cb (null, result);
    }
  })
}

var getUserByEmail = function(email, cb) {
  connection.query('SELECT * FROM users WHERE email=?', [email], function(err, user) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, user);
    }
  })
}

var getUserByName = function(first, last, cb) {
  connection.query('SELECT * FROM users WHERE firstname=? AND lastname=?', [first, last], function(err, user) {
    // need to add query to also get followers/favorites from votercandidate table and send them back too
    if (err) {
      cb(err, null);
    } else {
      cb(null, user);
    }
  })
}

var getAllEvents = function(cb) {
  connection.query('SELECT * FROM events', function(err, results) {
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
module.exports.getAllEvents = getAllEvents;
module.exports.addEvent = addEvent;
module.exports.attendEvent = attendEvent;
