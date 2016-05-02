'use strict';

var Sequelize = require('sequelize');
var db = require(__dirname + '/../config/database.js');

var Users = db.define('adminUsers', {
  id: { type: Sequelize.INTEGER, primaryKey: true, notNull: true, auto_increment: true }, //int(11) NOT NULL AUTO_INCREMENT,
  user: { type: Sequelize.STRING, notNull: true }, //varchar(255) NOT NULL
  password: { type: Sequelize.STRING, notNull: true }, //varchar(255) NOT NULL
  name: { type: Sequelize.STRING, allowNull: true, default: null }, //varchar(255) DEFAULT NULL
  surname: { type: Sequelize.STRING, allowNull: true, default: null }, //varchar(255) DEFAULT NULL
  email: { type: Sequelize.STRING, allowNull: true, default: null }, //varchar(255) DEFAULT NULL
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Users.sync();

module.exports = Users;