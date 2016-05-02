'use strict';
// Include Express
var express = require('express');
// Initialize the Router
var router = express.Router();

// Models
var Comments = require(__dirname + '/../models/comments.js');

// Utils
var _ = require('underscore');
var authUtils = require(__dirname + '/../auth/authUtils.js');

// Setup the Route
router.get('/', authUtils.authenticate, function (req, res) {
  authUtils.checkToken(req, res)
  .then(function() {
    Comments.findAll({
      where: { crime_id: req.query.crime },
      order: [['created_at', 'ASC']]
    })
    .then(function(comments) {
      res.json({
        comments: _(comments).map(function(data) { return data.get({ plain: true }); }),
      });
    });
  });
});

// Expose the module
module.exports = router;