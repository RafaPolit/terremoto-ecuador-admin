'use strict';

var db_config = {
  name: 'test_data',
  user: 'root',
  password: '1234',
  host: 'localhost'
};

var Sequelize = require('sequelize');
var db = new Sequelize(db_config.name, db_config.user, db_config.password, {
  host: db_config.host,
  dialect: 'mysql',
  pool: { max: 5, min: 0, idle: 10000 }
});

module.exports = db;