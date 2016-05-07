'use strict';

var db_config = {
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST
};

var Sequelize = require('sequelize');
var db = new Sequelize(db_config.name, db_config.user, db_config.password, {
  host: db_config.host,
  dialect: 'mysql',
  pool: { max: 5, min: 0, idle: 10000 }
});

module.exports = db;