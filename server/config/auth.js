'use strict';

// This file has 'burned' password.
// For real USER interaction, refer to: https://www.npmjs.com/package/bcrypt

var bcrypt = require('bcrypt');

module.exports = {
  secret: 'changeThis_1',
  user: 'changeThis_2',
  password: bcrypt.hashSync('changeThis_3', 10)
};