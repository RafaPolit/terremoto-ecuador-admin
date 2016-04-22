'use strict';

var Sequelize = require('sequelize');
var db = require(__dirname + '/../config/database.js');

module.exports = db.define('crimes', {
  id: { type: Sequelize.INTEGER, primaryKey: true, notNull: true, auto_increment: true }, // int(11) NOT NULL AUTO_INCREMENT,
  user_id: { type: Sequelize.INTEGER(11), allowNull: true, defaultValue: null}, // int(11) DEFAULT NULL,
  title: { type: Sequelize.STRING, allowNull: true, defaultValue: null}, // varchar(255) DEFAULT NULL,
  description: { type: Sequelize.TEXT, notNull: true }, // text NOT NULL,
  address: { type: Sequelize.TEXT }, // text,
  latitude: { type: Sequelize.DECIMAL(15, 10), allowNull: true, defaultValue: null }, // decimal(15,10) DEFAULT NULL,
  longitude: { type: Sequelize.DECIMAL(15, 10), allowNull: true, defaultValue: null }, // decimal(15,10) DEFAULT NULL,
  status: { type: Sequelize.ENUM('live','banned','protected','deleted'), defaultValue: 'live' }, // enum('live','banned','protected','deleted') DEFAULT 'live',
  source_id: { type: Sequelize.INTEGER(11), allowNull: true, defaultValue: null}, // int(11) DEFAULT NULL,
  subcategory_id: { type: Sequelize.INTEGER(11), allowNull: true, defaultValue: null}, // int(11) DEFAULT NULL,
  pictures_count: { type: Sequelize.INTEGER(11), allowNull: false, defaultValue: 0 }, // int(11) DEFAULT '0',
  plate: { type: Sequelize.STRING, allowNull: true, defaultValue: null }, // char(8) DEFAULT NULL,
  report_dt: { type: Sequelize.DATE, allowNull: true, defaultValue: null }, // datetime DEFAULT NULL,
  client_id: { type: Sequelize.INTEGER(11), allowNull: true, defaultValue: null }, // int(11) DEFAULT NULL,
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});