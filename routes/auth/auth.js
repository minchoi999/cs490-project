// This file contain all Express routing related to authentication
// Remember that the root for this route is '/auth'
const express = require('express');
const router = express.Router();
const passport = require('passport');

// =====================================
// GITHUB ROUTES =====================
// =====================================

// To log-in with GitHub OAuth
router.get('/github',
  passport.authenticate('github')
);

// User will arrive here after GitHub login
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),

  function (req, res) {
    // Successful authentication.
    console.log('Authenticated with Github')

    // set userId cookie using passport session
    res.cookie('userId', req.session.passport.user)
    // redirect to homepage cant be done in react as github response doesn't allow cors
    res.redirect('/');
  });

// =====================================
// GOOGLE ROUTES =====================
// =====================================
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication.
    console.log('Authenticated with Google')
    res.cookie('userId', req.session.passport.user)
    res.redirect('/');
  });

// =====================================
// FACEBOOK ROUTES =====================
// =====================================
// route for facebook authentication and login
router.get('/facebook',
  passport.authenticate('facebook', { scope: ['public_profile', 'email'] })
);

// handle the callback after facebook has authenticated the user
router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication.
    console.log('Authenticated with Facebook')
    res.cookie('userId', req.session.passport.user)
    res.redirect('/');
  });

// =====================================
// LOCAL AUTH ROUTES =====================
// =====================================
router.post('/login',
  passport.authenticate('local-login', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
  })
);

router.post('/register',
  passport.authenticate('local-signup', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
  })
);

// This route return the logged-in user's profile. 
router.get('/', function (req, res) {
  res.json(req.user);
});

// This route is for logging the user out
router.get('/logout', function (req, res) {
  req.session.destroy(err => {
    if (err) { res.status(400).send({ message: 'Logout failed', err }); }
    req.sessionID = null;
    // logout session on server
    req.logout();
    res.send({ message: 'Logged out successfully' });
    // dont redirect react user state will handle view
    res.end();
  });
});

module.exports = router;
