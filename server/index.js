let express = require('express');
let bodyParser = require('body-parser');
let db = require('../database-mysql');
let session = require('express-session');
require('dotenv').config();
// let requestHelpers = require('../helpers.js') // to implement from Shannon
let serverHelpers = require('../lib/serverHelpers.js') // 


let app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(session({
  secret: process.env.SESSION_PASSWORD,
  resave: false,
  saveUninitialized: true
}));

///// MAIN PAGE REQUESTS /////
app.get('/', serverHelpers.checkUserStatus, function(req, res) {
  // if not redirected via the checkUserStatus helper, will render the index page below
  res.render('index')
});

app.get('/candidates/:id', function(req, res) {
  // find candidate based on passed in userID
})

///// USER RELATED REQUESTS /////
app.get('/login', function(req, res) {
  // render login page
});

app.post('/login', function(req, res) {
  // grab username and password from req
  // check if username exists
  // if so,
    // check that users stored password against the hashed version of the user input plain password
      // if those match
        // clear any session that might exist
        // set the session to the current user
        // redirect to index page
      // if not
        // console.log("That password and/or email combination was unsuccessful. Please try again.");
        // redirect to login page
  // if no username exists
    // redirect to signup page
});

app.get('/signup', function(req, res) {
 // render signup page
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
  // redirect to login page
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
