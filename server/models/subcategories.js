'use strict';

var Sequelize = require('sequelize');
var db = require(__dirname + '/../config/database.js');

module.exports = db.define('subcategories', {
  id: { type: Sequelize.INTEGER, primaryKey: true, notNull: true, auto_increment: true }, //int(11) NOT NULL AUTO_INCREMENT,
  name: { type: Sequelize.STRING, allowNull: true, defaultValue: null }, //varchar(255) DEFAULT NULL,
  category_id: { type: Sequelize.INTEGER(11), allowNull: true, defaultValue: null }, //int(11) DEFAULT NULL,
  ranking: { type: Sequelize.INTEGER(11), allowNull: true, defaultValue: null }, //int(11) DEFAULT NULL,
  is_promoted: { type: Sequelize.BOOLEAN, allowNull: true, defaultValue: null }, //tinyint(1) DEFAULT NULL,
  color: { type: Sequelize.STRING, allowNull: true, defaultValue: null }, //char(7) DEFAULT NULL,
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});