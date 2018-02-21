let express = require('express');
let bodyParser = require('body-parser');
let db = require('../database-mysql');
let session = require('express-session');
require('dotenv').config();
// let requestHelpers = require('../helpers.js') // to implement from Shannon
// let serverHelpers = require('../lib/serverHelpers.js') // 


let app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(session({
  secret: process.env.SESSION_PASSWORD,
  resave: false,
  saveUninitialized: true
}));

//MAIN PAGE REQUESTS
app.get('/', isLoggedIn,function(req, res) {
  
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
