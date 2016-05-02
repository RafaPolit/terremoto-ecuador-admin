'use strict';

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var auth = require(__dirname + '/../config/auth.js');
var Users = require(__dirname + '/../models/users.js');

module.exports = function(passport) {
  var opts = {};
  opts.secretOrKey = auth.secret;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    Users.findOne({ id: jwt_payload.id })
    .then(function(user) {
      if(user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};