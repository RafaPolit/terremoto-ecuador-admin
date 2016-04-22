'use strict';
// Include Express
var express = require('express');
// Initialize the Router
var router = express.Router();

// Models
var Crimes = require(__dirname + '/../models/crimes.js');

// Utils
var _ = require('underscore');

// Setup the Route
router.put('/', function (req, res) {
  Crimes.update(_(req.body).omit('id'), { where: { id: req.body.id } })
  .then(function() {
    return Crimes.findById(req.body.id);
  })
  .then(function(updated_data) {
    res.json({ 'event': updated_data.get({ plain: true }) });
  });
});

router.delete('/', function (req, res) {
  Crimes.destroy({ where: { id: Number(req.query.id) } })
  .then(function(destroyed_rows) {
    if(destroyed_rows) {
      res.json({ 'eventDeleted': Number(req.query.id) });
    }
  });
});

// Expose the module
module.exports = router;