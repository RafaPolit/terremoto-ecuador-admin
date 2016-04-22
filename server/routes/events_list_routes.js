'use strict';
// Include Express
var express = require('express');
// Initialize the Router
var router = express.Router();

// Models
var Subcategories = require(__dirname + '/../models/subcategories.js');
var Crimes = require(__dirname + '/../models/crimes.js');

// Utils
var Q = require('q');
var _ = require('underscore');

// Setup the Route
router.get('/', function (req, res) {
  Q.all([
    Subcategories.findAll({ attributes: [ 'id', 'name', 'category_id', 'color'] }),
    Crimes.findAll({ })
  ])
  .spread(function(subcategories, crimes) {
    // return a json response to angular
    res.json({
        'events': _(crimes).map(function(data) { return data.get({ plain: true }); }),
        'subcategories': _(subcategories).map(function(data) { return data.get({ plain: true }); })
    });
  });
});

// Expose the module
module.exports = router;