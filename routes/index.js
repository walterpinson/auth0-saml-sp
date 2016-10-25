var express = require('express');
var passport = require('passport');
var router = express.Router();

var env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};

var entryPoint = 'http%3A%2F%2Fsp-samltest.dev%3A3000';
var logoutUrl = process.env.AUTH0_LOGOUT_URL + '/returnTo=' + entryPoint;
var federatedLogoutUrl = process.env.AUTH0_FEDERATED_LOGOUT_URL + '&returnTo=' + entryPoint;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', env: env });
});

router.get('/login',
  function(req, res){
    res.render('login', { env: env });
  });

router.get('/logout', function(req, res){
  req.logout();
  res.redirect(logoutUrl);
});

router.get('/logoutFederated', function(req, res){
  req.logout();
  res.redirect(federatedLogoutUrl);
});

router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/user');
  });


module.exports = router;
