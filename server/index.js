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
  let number = +req._parsedOriginalUrl.query || 0;
  db.getNewEvents(10, number, (err, events) => {
    if (err) {
      res.status(500).end(err);
    } else {
      let fetchedCount = events.length;
      res.write(JSON.stringify({events, fetchedCount}));
      res.status(200).end();
    }
  })
});

app.get('/api/favoritesfollowers?*', isLoggedIn, (req, res) => {
  db.getFavoritesFollowers(req._parsedOriginalUrl.query, function(err, favoritesfollowers) {
    if (err) {
      cb(err, null);
    } else {
      res.write(JSON.stringify(favoritesfollowers));
      res.status(200).end();
    }
  });
});

app.get('/api/user*', (req, res) => {
  let username = decodeURIComponent(req._parsedOriginalUrl.query).split(' ');
  console.log(username);
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

app.get('/racescandidates', (req, res) => {
  db.getAllRacesAndCandidates((err, racesCandidates) => {
    res.status(200).end(JSON.stringify(racesCandidates));
  })
})

app.get('/api/candidatefollowers?*', (req, res) => {
  let name = decodeURIComponent(req._parsedOriginalUrl.query).split(' ');
  first = name[0];
  last = name[1];
  db.getCandidateFollowers(first, last, (err, followers) => {
    if (err) {
      res.status(404).end();
    } else {
      let output = [];
      followers.forEach(follower => {
        output.push(`${follower.firstname} ${follower.lastname}`);
      })
      res.status(200).json(output);
    }
  });
})

app.post('/api/events', isLoggedIn, (req, res) => {
  const event = req.body;
  db.addEvent(event.title, event.state, event.city, event.streetAddress, event.date, event.time, event.description, event.host, function(err, result) {
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


app.post('/follow', isLoggedIn, (req, res) => {
  var userId;
  //console.log('REQ BODY: ', req.body);
  db.getUserByEmail(req.body.voter, function(err, result) {
    if (req.body.following) {
      db.unfollowCandidate(result[0].id, req.body.candidate, function(results) {
        res.sendStatus(201);
      })
    } else
      db.followCandidate(result[0].id, req.body.candidate, function(results) {
      res.sendStatus(201);
    });
  });
});


// ///// USER-RELATED REQUESTS /////
app.post('/login', passport.authenticate('local-login'), (req, res) => {
  let response = {username: req.body.username, sessionID: req.sessionID, firstname: req.user[0].firstname, lastname: req.user[0].lastname}
  res.status(201).send(response);
});

app.post('/signup', passport.authenticate('local-signup'), (req, res) => { // passport middleware authenticates signup
  let response = {
          email: req.body.email,
          password: req.body.password,
          role: req.body.role,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          zipcode: req.body.zipcode,
          bio: req.body.bio,
          race: req.body.race
  }
  res.status(201).send(response);
});

app.post('/logout', isLoggedIn, function(req, res) {
  req.logout();
  res.clearCookie('connect.sid').status(200).redirect('/');
});

app.post('/races', function(req, res) {
  db.saveRace(req.body.date, req.body.state, req.body.city, req.body.district, req.body.office, function(err, results) {
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
