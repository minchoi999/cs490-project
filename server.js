const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/index.js');

// Auth libraries
const passport = require('passport');
const session = require('express-session')

const app = express();

// Load .env variables
require('dotenv').load();

// passport.js contains the Passport auth strategies. Currently only GitHub
require('./auth/passport')(passport);

const port = process.env.PORT || 5000;

// Connect to MongoDB database
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true }).then(
  ()  => { console.log('MongoDB is connected') },
  err => { console.log('Cannot connect to MongoDB') + err }
);

// Configure body parser for json format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize Express Session
app.use(session({
    secret: 'bears-20',
	resave: false,
	saveUninitialized: true
}));

// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Set Headers to allow Cross Origin Requests
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  next();
});

// Serve static assets
// app.use(express.static(path.resolve('build')));
app.use(express.static(path.join(__dirname, "frontend", "build")));

//  Connect all our routes to our application
app.use('/', routes);

// If request doesn't match api request always return the main index.html, so react-router render the route in the client
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve('build', 'index.html'));
// });
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

app.listen(port, function() {
 console.log(`API running on port ${port}`);
});
