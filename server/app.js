'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/**
 * Route Imports
 */
var events_list_routes = require('./routes/events_list_routes.js');
var event_routes = require('./routes/event_routes.js');
var login_routes = require('./routes/login_routes.js');

var app = express();

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * Development Settings
 */
if (app.get('env') === 'development') {
  // This will change in production since we'll be using the dist folder
  app.use(express.static(path.join(__dirname, '../client')));
  // This covers serving up the index page
  app.use(express.static(path.join(__dirname, '../client/.tmp')));
  app.use(express.static(path.join(__dirname, '../client/app')));
  // Favicon
  app.use(favicon(path.join(__dirname, '../client/app', 'favicon.ico')));

  // Error Handling
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

/**
 * Production Settings
 */
if (app.get('env') === 'production') {

  // changes it to use the optimized version for production
  app.use(express.static(path.join(__dirname, '/dist')));
  // Favicon
  app.use(favicon(path.join(__dirname, '/dist', 'favicon.ico')));

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}

/**
 * Routes
 */
app.use('/events_list', events_list_routes);
app.use('/event', event_routes);
app.use('/login', login_routes);

module.exports = app;
