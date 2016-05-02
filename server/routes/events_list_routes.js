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
var authUtils = require(__dirname + '/../auth/authUtils.js');

// Setup the Route
router.get('/', authUtils.authenticate, function (req, res) {
  authUtils.checkToken(req, res)
  .then(function() {
    Q.all([
      Subcategories.findAll({ attributes: [ 'id', 'name', 'category_id', 'color'] }),
      Crimes.findAll({ })
    ])
    .spread(function(subcategories, crimes) {
      res.json({
        events: _(crimes).map(function(data) { return data.get({ plain: true }); }),
        subcategories: _(subcategories).map(function(data) { return data.get({ plain: true }); })
      });
    });
  });
});

// Expose the module
module.exports = router;