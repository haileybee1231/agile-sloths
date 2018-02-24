let express = require('express');
let bodyParser = require('body-parser');
let db = require('../database-mysql');
let session = require('express-session');
require('dotenv').config();
let serverHelpers = require('../lib/serverHelpers.js') 
let app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(session({
  secret: process.env.SESSION_PASSWORD,
  resave: true,
  saveUninitialized: true
}));

///// MAIN PAGE REQUESTS /////
app.get('/', function(req, res) {
  // will render index page regardless of logged in or not 
  // but only those logged in will be able to create/save
  res.render('index');
});

// get request for specific candidate
app.get('/candidates/:id', function(req, res) {
  // retreive candidate information from DB
  db.getCandidateById(function(err, data) { // this function doesn't actually exist yet
    if(err) {
      console.log('Error finding candidate');
      res.status(500).end();
    } else {
      console.log('Successfully retreived candidate');
      res.status(200).send(JSON.stringify(data));
    }
  });
});

// a post request adds to the list of candidates 
// or should this be a request to the API??
app.post('/candidates', function(req, res) {
  // receives post request upon new candidate form submission
  // parse out all of the information from the req.body
  // check if that candidate exists in the database
  // save to the database
  // res.status(201).end()
});

// get request for specific event
app.get('/events/:id', function(req, res) {
  // retreive event information from DB
  db.getEventById(function (err, data) { // this function doesn't actually exist yet
    if (err) {
      console.log('Error finding event');
      res.status(500).end();
    } else {
      console.log('Successfully retreived event');
      res.status(200).send(JSON.stringify(data));
    }
  });
});

// a post request adds to the list of events
// or should this be a request to the API??
app.post('/events', function(req, res) {
  // receives post request upon new candidate form submission
  // parse out all of the information from the req.body
  // check if that candidate exists in the database
  // save to the database
  // res.status(201).end()
});


///// USER-RELATED REQUESTS /////
app.get('/login', function(req, res) {
  // render login page
  // will need to accomodate for react router
  res.render('login')
});

app.post('/login', function(req, res) {
  // grab username and password from req
  let username = req.body.username;
  let password = req.body.password;
  // check if username exists
  // is this still relevant if using passport??
  db.CheckIfUserExists(function(err, user) { // this name will need to change
    // if those match
    if (user) {
      // check that users stored password against the hashed version of the user input plain password
      // check if passwords match 
      // if (match) {
        // save and set sessions via passport instead
        // clear any session that might exist
        //req.session.destroy()
        // set the session to the current user
        //req.sesion.user = user;
        // redirect to index page
        //res.status(201).redirect('/');
      // } else {
        // console.log("That password and/or email combination was unsuccessful. Please try again.");
        // res.status(302).redirect('index')
    } else { // if no user was found
      // redirect to login page
      res.status(302).redirect('login')
    }
  });
});

app.get('/signup', function(req, res) {
 // render signup page
 res.status(200).render('signup')
});

app.post('/signup', function(req, res) {
  // check if username (and email??) exists
    // if not,
      // hash password
      // save that user information (name, username, email, hashedPassword, bio?, etc.)
      // set the session id to the current user
      // redirect to the index page
    // if so
      // console.log('That username already exists, please try again')
});

app.post('/logout', function(req, res) {
  // terminate session id
  req.session.destroy(function() {
    // redirect to login page
    res.status(302).redirect('index')
  });
});


let port = 3000;
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
	
