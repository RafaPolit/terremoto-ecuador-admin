'use strict';
// Include Express
var express = require('express');
// Initialize the Router
var router = express.Router();

// Auth
var auth = require(__dirname + '/../config/auth.js');
var bcrypt = require('bcrypt');
var jwt         = require('jwt-simple');

// Setup the Route
router.post('/', function (req, res) {
  if(req.body.user === auth.user) {
    bcrypt.compare(req.body.password, auth.password, function(err, isMatch) {
      if(err) { return respond_error(res); }

      if(isMatch) {
        var token = jwt.encode({ user: req.body.user }, auth.secret);
        res.json({ data: 'JWT ' + token, error: false });
        return;
      }

      return respond_error(res);
    });
  }
  
  return respond_error(res);
});

// response
function respond_error(res) {
  return res.json({ success: false, error: 'wrong_user_or_password'});
}

// Expose the module
module.exports = router;