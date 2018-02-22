let LocalStrategy = require('passport-local').Strategy;
let db = require('../../database-mysql');
let serverHelpers = require('../../lib/serverHelpers.js');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    console.log(`serializing user: ${user}`);
    done(null, user.id);
  });

  passport.deserializeUser(function(username, done) {
    console.log(`deserializing user: ${username}`)
  });

  passport.use('local-signup', new LocalStrategy({
    // local strategy uses username by defualt, we'll use email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true    // allows us to pass entire request to callback
  },
  function(req, email, password, done) {
    process.nextTick(function() { // async, won't look for user until data comes back
      // db.selectUser('local.email': email}, function(err, user) {

        //query database for user, function pending
        if (err) {
          return done(err);
        }

        if (user) {
          return `That email is already taken, please choose a valid email.`
        } else {
          // create user record
          // create password hasing using bcrypt
          // write user to db
          // return done with the user
        }
      })

    }));
}
