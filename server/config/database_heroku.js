'use strict';

var db_config = {
  name: 'heroku_3702a48ba42f51a',
  user: 'b4a94f20699061',
  password: '6d50ec65',
  host: 'us-cdbr-iron-east-03.cleardb.net'
};

var Sequelize = require('sequelize');
var db = new Sequelize(db_config.name, db_config.user, db_config.password, {
  host: db_config.host,
  dialect: 'mysql',
  pool: { max: 5, min: 0, idle: 10000 }
});

module.exports = db;