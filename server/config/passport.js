let LocalStrategy = require('passport-local').Strategy;
let db = require('../../database-mysql');
let serverHelpers = require('../../lib/serverHelpers.js');
let bcrypt = require('bcrypt-nodejs');
let bodyParser = require('body-parser');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) { // creating sessions
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });


  // LOCAL LOGIN STRATEGY
  passport.use('local-login', new LocalStrategy( // strategy = type of logging in (e.g. fb)
    function(email, password, cb) {
      db.getUserByEmail(email, function(err, user) {
        console.log(user);
        if (err) {
          return cb(err);
        }
        if (!user.length) {
          return cb(null, false);
        }
        bcrypt.compare(password, user[0].password, function(err, res) {
          if (!res) {
            return cb(null, false);
          }
          return cb(null, user);
        })
      })
    }
  ));

  //LOCAL SIGNUP Strategy
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
    function(req, email, password, cb) {
      let body = req.body;
      let firstname = body.firstname;
      let lastname = body.lastname;
      let bio = body.bio;
      let role = body.role;
      let location = body.location;
      let race = body.race;
      db.getUserByEmail(email, function(err, user) {
        if (err) {
          return cb(err);
        }
        if (user.length > 0) {
          return cb(null, false);
        }
        db.addUser(email, password, firstname, lastname, role, bio, location, race, function(err, results) { // add whatever else needs to be added here, like bio
          if (err) {
            return cb(err);
          }
          return cb('signup successful', results); // put something here to verify signup successful
        });
      })
    }
  ));
}
