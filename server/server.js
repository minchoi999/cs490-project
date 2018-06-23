const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const dbConnection = require('./database');
const MongoStore = require('connect-mongo')(session);
const passport = require('./passport');

const app = express();
const port = process.env.PORT || 8080;

// Route requires user
const user = require('./routes/user');

// Middleware
app.use(morgan('dev'));

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

// Sessions
app.use(
    session({
        secret: 'aVeryRandomString', // a random string to generate secure hash??
        store: new MongoStore({ mongooseConnection: dbConnection }),
        resave: false, // required
        saveUninitialized: false
    })  
);

// Passport
app.use(passport.initialize());
app.use(passport.session()); // call deserializeUser

// Routes
app.use('/user', user);

// Start the server
app.listen(port, () => {
    console.log(`App listening on PORT: ${port}`);
});