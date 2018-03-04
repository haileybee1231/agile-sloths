let express = require('express');
let bodyParser = require('body-parser');
let db = require('../database-mysql');
let session = require('express-session');
let path = require('path');
let passport = require('passport');
let moment = require('moment');
let flash = require('connect-flash');
// let serverHelpers = require('../lib/serverHelpers.js'); // to delete?
let app = express();

require('dotenv').config();
require('../server/config/passport')(passport);

app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_PASSWORD || 'supersecretsecret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // uses flash connect to allow flash messages in stored session
app.use(express.static(path.join(__dirname, '../react-client/dist')));

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).end('You must log in to do that!');
}



app.get('/api/events?*', (req, res) => {
  let number = req._parsedOriginalUrl.query;
  db.getNewEvents(0, (err, events) => {
    if (err) {
      res.status(500).end(err);
    } else {
      res.write(JSON.stringify(events));
      res.status(200).end();
    }
  })
});

app.get('/api/user*', (req, res) => {
  let username = decodeURIComponent(req._parsedOriginalUrl.query).split(' ');
  db.getUserByName(username[0], username[1], (err, user) => {
    db.getAllEvents((err, results) => {
      let userEvents = null;
      if (results) {
        userEvents = results.events.filter(event => {
          return event.host === user[0].id
        })
      }
      results.events.forEach(event => {
        event.host = username.join(' ');
        event.date = moment(event.date).format('MM/DD/YYYY');
        // event.time = event.time.slice(0, event.time.length - 3);
        if (event.time.slice(0, 2) > 12) {
          event.time = `at ${event.time.slice(0,2) - 12}:${event.time.slice(3, 5)} PM`
        } else if (event.time.slice(0, 2) === '00') {
          event.time = `at 12:${event.time.slice(3, 5)} AM`
        } else {
          event.time = `at ${event.time.slice(0,2)}:${event.time.slice(3, 4)} AM`
        }
      })
      results.events.forEach(event => {
        event.attendees = [];
        results.attendees.forEach(attendee => {
          if (attendee.event === event.id) {
            event.attendees.push(`${attendee.firstname} ${attendee.lastname}`);
          }
        })
      })
      if (err) {
        res.status(500).end();
      }
      if (user && !user.length) {
        res.status(404).end();
      }
      user = user[0];
      delete user.password;
      let body = JSON.stringify({user, userEvents});
      res.write(body);
      res.status(200).end();
    })
  });
});

app.get('/races', (req, res) => {
  db.selectAllRaces(function(err, races) {
    res.json(races)
  })
})

app.post('/api/events', isLoggedIn, (req, res) => {
  const event = req.body;
  db.addEvent(event.title, event.location, event.date, event.time, event.description, event.host, function(err, result) {
    if (err) {
      res.send(JSON.stringify(err));
    } else if (result === 'Event already exists') {
      res.status(500).send(result);
    } else {
      res.status(201).end();
    }
  });
})

app.post('/attend', isLoggedIn, (req, res) => {
  db.attendEvent(req.body.event, req.body.user, function(err, result) {
    res.status(201).end(JSON.stringify(result));
  })
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../react-client/dist', '/index.html'));
});
// EVERYTHING BELOW TO BE DELETED?



// ///// MAIN PAGE REQUESTS /////
// app.get('/', function(req, res) {
//   // will render index page regardless of logged in or not
//   // but only those logged in will be able to create/save
//   res.render('index');
// });

// // get request for specific candidate
// app.get('/candidates/:id', function(req, res) {
  //   // retreive candidate information from DB
  //   db.getCandidateById(function(err, data) { // this function doesn't actually exist yet
  //     if(err) {
    //       console.log('Error finding candidate');
    //       res.status(500).end();
//     } else {
  //       console.log('Successfully retreived candidate');
  //       res.status(200).send(JSON.stringify(data));
  //     }
//   });
// });

// // a post request adds to the list of candidates
// // or should this be a request to the API??
// app.post('/candidates', function(req, res) {
  //   // receives post request upon new candidate form submission
  //   // parse out all of the information from the req.body
//   // check if that candidate exists in the database
//   // save to the database
//   // res.status(201).end()
// });

// // get request for specific event
// app.get('/events/:id', function(req, res) {
  //   // retreive event information from DB
//   db.getEventById(function (err, data) { // this function doesn't actually exist yet
//     if (err) {
  //       console.log('Error finding event');
  //       res.status(500).end();
  //     } else {
    //       console.log('Successfully retreived event');
//       res.status(200).send(JSON.stringify(data));
//     }
//   });
// });

// // a post request adds to the list of events
// // or should this be a request to the API??
// app.post('/events', function(req, res) {
  //   // receives post request upon new candidate form submission
//   // parse out all of the information from the req.body
//   // check if that candidate exists in the database
//   // save to the database
//   // res.status(201).end()
// });


// ///// USER-RELATED REQUESTS /////
app.post('/login', passport.authenticate('local-login'), (req, res) => {
  let response = {username: req.body.username, sessionID: req.sessionID}
  res.status(201).send(response);
});

app.post('/signup', passport.authenticate('local-signup'), (req, res) => { // passport middleware authenticates signup
  res.status(201).send('Signup successful. Redirecting to login.');
});

app.post('/logout', isLoggedIn, function(req, res) {
  req.logout();
  res.clearCookie('connect.sid').status(200).redirect('/');
});

app.post('/races', function(req, res) {
  db.saveRace(req.body.date, req.body.location, req.body.office, function(err, results) {
    if (err) {
      console.log(err)
    } else {
      res.status(201).send(results);
    }
  })
})

let port = process.env.PORT || 3000; // these process variables are for deployment because Heroku won't use port 3000

app.listen(port, function() {
  console.log(`The server is listening on port ${ port }!`);
});

/////////////////////////
////// write to db //////
/////////////////////////

// on create user
// db.connection.query('INSERT INTO users VALUES (email, password, bio, role, race) values ? ? ? ? ?', []);

// // on follow
// db.connection.query('INSERT INTO votercandidate (voter_id, candidate_id) values ? ?' []);

// // on create event
// db.connection.query('INSERT INTO events (title, location, time, description, host) values ? ? ? ? ?', []);

// // on create race
// db.connection.query('INSERT INTO races (office, date, location) values ? ? ?', []);

// // on edit profile
// db.connection.query();

// // on rsvp to event
// db.connection.query('INSERT INTO eventsusers (event_id, user_id) values ? ?', []);

// // on follow race
// db.connection.query('INSERT INTO racesusers (user_id, race_id) values ? ?', []);


// ///////////////////////
// //// pull from db //////
// ///////////////////////

// // load feed

// 	// select events from following
// 	db.connection.query();


// 	// select races following
// 	db.connection.query();


// 	// select users following
// 	db.connection.query();



// // load profile

// 	// select user bio/info
// 	db.connection.query();


// 	// select events hosting
// 	db.connection.query();


// 	// select followers
// 	db.connection.query();



// //on post
// //have variables for email, password


// //on post to create event
// db.connection.query('INSERT INTO events (title, location, time, description, host) values []');

// //on get
// db.connection.query('SELECT [name] FROM users, eventsusers WHERE users ')

// //on post


// // to get list of attendees:
// db.connection.query('SELECT [name] FROM users, eventsusers WHERE eventsusers.candidate = x AND eventsusers.voter_id = users.id') //?
