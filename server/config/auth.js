'use strict';

var secret = 'changeThisInProduction';

// This file has 'burned' password.
// For real USER interaction, refer to: https://www.npmjs.com/package/bcrypt

// var bcrypt = require('bcrypt');
// console.log('Password: ', bcrypt.hashSync('1234', 10));

module.exports = {
  secret: secret
};