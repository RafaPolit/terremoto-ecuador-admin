'use strict';

var Sequelize = require('sequelize');
var db = require(__dirname + '/../config/database.js');

module.exports = db.define('comments', {
  id: { type: Sequelize.INTEGER, primaryKey: true, notNull: true, auto_increment: true }, //int(11) NOT NULL AUTO_INCREMENT,
  crime_id: { type: Sequelize.INTEGER, allowNull: true, default: null }, //int(11) DEFAULT NULL,
  fullname: { type: Sequelize.STRING, allowNull: true, defaultValue: null}, // varchar(255) DEFAULT NULL,
  phone: { type: Sequelize.STRING, allowNull: true, defaultValue: null}, // varchar(255) DEFAULT NULL,
  body: { type: Sequelize.TEXT, allowNull: true, defaultValue: null }, // varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});