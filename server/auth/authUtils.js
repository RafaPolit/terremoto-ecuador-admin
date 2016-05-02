'use strict';

// Models
var Users = require(__dirname + '/../models/users.js');

// Passport and Auth
var auth = require(__dirname + '/../config/auth.js');
var passport = require('passport');
var jwt = require('jwt-simple');
require(__dirname + '/../auth/passport')(passport);

// Utils
var Q = require('q');

module.exports = {
  authenticate: passport.authenticate('jwt', { session: false }),
  checkToken: function(req, res) {
    var deferred = Q.defer();

    var token = getToken(req.headers);

    if(token) {
      var decoded = jwt.decode(token, auth.secret);

      Users.findOne({ user: decoded.user })
      .then(function(user) {
        if(!user) {
          replyNotLoggedIn(res);
          deferred.reject('not_logged_in');
        } else {
          deferred.resolve();
        }
      });
    } else {
      replyNotLoggedIn(res);
      deferred.reject('not_logged_in');
    }

    return deferred.promise;
  }
};

function getToken(headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) { return parted[1]; }
    return null;
  }
  return null;
}


function replyNotLoggedIn(res) {
  res.status(403).send({ success: false, error: 'not_logged_in' });
}