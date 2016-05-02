'use strict';
// Include Express
var express = require('express');
// Initialize the Router
var router = express.Router();

// Auth
var auth = require(__dirname + '/../config/auth.js');
var bcrypt = require('bcrypt');
var jwt         = require('jwt-simple');

// Models
var Users = require(__dirname + '/../models/users.js');

// Utils
var _ = require('underscore');

// Setup the Route
router.post('/', function (req, res) {

  Users.findOne({ user: req.body.user })
  .then(function(user) {
    if(!user) {
      respond_error(res);
    } else {
      user = user.get({ plain: true });
      bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
        if(isMatch && !err) {
          var token = jwt.encode(_(user).omit('password'), auth.secret);
          res.json({ success: true, token: 'JWT ' + token, error: false });
        } else {
          respond_error(res);
        }
      });
    }
  });
});

// response
function respond_error(res) {
  res.json({ success: false, error: 'wrong_user_or_password'});
}

// Expose the module
module.exports = router;