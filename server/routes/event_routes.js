'use strict';
// Include Express
var express = require('express');
// Initialize the Router
var router = express.Router();

// Models
var Crimes = require(__dirname + '/../models/crimes.js');
var Comments = require(__dirname + '/../models/comments.js');

// Utils
var Q = require('q');
var _ = require('underscore');
var authUtils = require(__dirname + '/../auth/authUtils.js');

// Setup the Route
router.put('/', authUtils.authenticate, function (req, res) {
  authUtils.checkToken(req, res)
  .then(function() {
    Crimes.update(_(req.body).omit('id'), { where: { id: req.body.id } })
    .then(function() {
      return Crimes.findById(req.body.id);
    })
    .then(function(updated_data) {
      res.json({ 'event': updated_data.get({ plain: true }) });
    });
  });
});

router.delete('/', authUtils.authenticate, function (req, res) {
  authUtils.checkToken(req, res)
  .then(function() {
    Q.all([
      Crimes.destroy({ where: { id: Number(req.query.id) } }),
      Comments.destroy({ where: { crime_id: Number(req.query.id) } })
    ])
    .spread(function(destroyed_event, destroyed_comments) {
      if(destroyed_event) {
        res.json({ 'eventDeleted': Number(req.query.id), 'commentsDeleted': destroyed_comments });
      }
    })
    .catch(function(error) { console.log(error); });
  });
});

// Expose the module
module.exports = router;