'use strict';
// Include Express
var express = require('express');
// Initialize the Router
var router = express.Router();

// Models
var Subcategories = require(__dirname + '/../models/subcategories.js');
var Crimes = require(__dirname + '/../models/crimes.js');

// Passport and Auth
var auth = require(__dirname + '/../config/auth.js');
var passport = require('passport');
var jwt = require('jwt-simple');
require(__dirname + '/../auth/passport')(passport);

// Utils
var Q = require('q');
var _ = require('underscore');

// Setup the Route
router.get('/', passport.authenticate('jwt', { session: false }), function (req, res) {
  var token = getToken(req.headers);

  if(token) {
    var decoded = jwt.decode(token, auth.secret);
    if(decoded.user === auth.user) {
      return Q.all([
        Subcategories.findAll({ attributes: [ 'id', 'name', 'category_id', 'color'] }),
        Crimes.findAll({ })
      ])
      .spread(function(subcategories, crimes) {
        // return a json response to angular
        res.json({
          events: _(crimes).map(function(data) { return data.get({ plain: true }); }),
          subcategories: _(subcategories).map(function(data) { return data.get({ plain: true }); })
        });
      });
    }
    
    return notLoggedIn(res);
  }

  return notLoggedIn(res);

});

// ---
function getToken(headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) { return parted[1]; }
    return null;
  }
  return null;
}

function notLoggedIn(res) {
  return res.status(403).send({ success: false, error: 'not_logged_in' });
}

// Expose the module
module.exports = router;