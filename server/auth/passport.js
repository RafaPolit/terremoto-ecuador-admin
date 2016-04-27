'use strict';

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var auth = require(__dirname + '/../config/auth.js');

module.exports = function(passport) {
  var opts = {};
  opts.secretOrKey = auth.secret;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    if(jwt_payload.user === auth.user) {
      return done(null, jwt_payload.user);
    }

    return done('not_logged_in', false);
  }));
};