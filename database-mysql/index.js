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

const saveRace = function(date, location, office, cb) {
  connection.query('INSERT INTO races (date, location, office) VALUES (?, ?, ?)',
  [date, location, office], function(err, results) {
    if (err) {
      console.log(err)
      cb(err, null)
    } else {
      console.log(results)
      cb(null, results)
    }
  })
}

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

var addEvent = function(title, location, date, time, description, host, cb) { // host should be the email of the logged in user
  getEventByTitle(title, function(err, event) {
    if (err) {
      cb(err, null);
    }
    if (event.length > 0) {
      cb(null, 'Event already exists');
    } else {
      connection.query('INSERT INTO events (title, location, date, time, description, host) VALUES (?, ?, ?, ?, ?, (SELECT id FROM users WHERE email=?))',
      [title, location, date, time, description, host], function(err, result) {
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
      });
    }
  });
}

var attendEvent = function(title, email, cb) { // query will insert based on userid and eventid so retrieve those first
  getUserByEmail(email, function(err, user) {
    if (err) {
      cb(err, null);
    } else {
      getEventAttendees(title, function(err, attendees) {
        let found = false;
        if (err) {
          cb(err, null);
        }
        attendees.forEach(attendee => {
          if (attendee.user === user[0].id) {
            found = true;
            cb(null, 'You are already attending that event.');
          }
        })
        if (!found) {
          connection.query('INSERT INTO eventsusers (event, user) VALUES ((SELECT id FROM events WHERE title=?), (SELECT id FROM users WHERE email=?))', [title, email], function(err, result) {
            if (err) {
              cb(err, null);
            } else {
              cb (null, result);
            }
          })
        }
      })
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

var getUserNameById = function(id, cb) {
  connection.query('SELECT firstname, lastname FROM users WHERE id=?', [id], function(err, user) {
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
  connection.query('SELECT * FROM events', function(err, events) {
    if (err) {
      cb(err, null);
    } else {
      getAllEventAttendees(function(err, attendees) {
        if (err) {
          cb(err, null);
        } else {
          cb(null, {events, attendees});
        }
      });
    }
  })
}

var getNewEvents = function(number, cb) {
  connection.query('SELECT events.id, events.title, events.location, events.date, events.time, events.description, users.firstname, users.lastname FROM events LEFT JOIN users ON events.host=users.id', function(err, events) {
    if (err) {
      cb(err, null)
    } else {
      cb(null, events);
    }
  })
  // connection.query('SELECT * FROM events LEFT JOIN users WHERE id>=? AND id<? + 10', [number, number], function(err, events) {
  //
  // })
}

var getEventByTitle = function(title, cb) {
  connection.query('SELECT * FROM events WHERE title=?', [title], function(err, event) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, event);
    }
  })
}

var getAllEventAttendees = function(cb) {
  connection.query('SELECT firstname, lastname, event FROM users INNER JOIN eventsusers WHERE users.id=user', function(err, attendees) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, attendees);
    }
  })
}

var getEventAttendees = function(event, cb) {
  connection.query('SELECT * FROM events e INNER JOIN eventsusers eu WHERE e.id = eu.event AND e.title=?', [event], function(err, event) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, event);
    }
  })
}

var findVoterCandidate = function(voter, candidate, cb) {
  connection.query('SELECT * FROM votercandidate WHERE voter = ? AND candidate = ?', [voter, candidate], function(err, results) {
    if (err) {
      console.log('something something query error');
    } else {
      cb(results);
    }
  })
}

var followCandidate = function(voter, candidate, cb) {
  //console.log('following!');
  //findVoterCandidate(voter, candidate, function(err, result) {
  //  if (err) {
  //    console.log('follow error');
  //  } else {
      //if (result.length === 0) {
        connection.query('INSERT INTO votercandidate (voter, candidate) VALUES (?, ?)', [voter, candidate], function(err, result) {
          if (err) {
            console.log(err)
            cb(result)
            //console.log('voter candidate insertion query error');
          } else {
            cb(result);
            //console.log('voter candidate insertion query success');
          }
        });
      //}
  //  }
  //});
}

var unfollowCandidate = function(voter, candidate, cb) {
  //console.log('unfollowing!');
  connection.query('DELETE FROM votercandidate WHERE voter = ? AND candidate = ?', [voter, candidate], function(err, result) {
    if (err) {
      cb(result)
    } else { 
      console.log('unfollowing!')
      cb(result); 
    }
  })
} 

module.exports.saveRace = saveRace;
module.exports.selectAllRaces = selectAllRaces;
module.exports.addUser = addUser;
module.exports.getUserByEmail = getUserByEmail;
module.exports.getUserByName = getUserByName;
module.exports.getAllEvents = getAllEvents;
module.exports.addEvent = addEvent;
module.exports.attendEvent = attendEvent;
module.exports.getNewEvents = getNewEvents;
module.exports.getUserByName = getUserByName;
module.exports.getEventByTitle = getEventByTitle;
module.exports.getAllEventAttendees = getAllEventAttendees;
module.exports.followCandidate = followCandidate;
module.exports.unfollowCandidate = unfollowCandidate;
module.exports.findVoterCandidate = findVoterCandidate;
