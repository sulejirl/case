const express = require('express');
const app = express();
const routes = require('./app/routes');
const compression = require('compression');
const bodyParser    = require('body-parser');  

app.all('*', function(req, res, next) {
    var origin = req.get('origin'); 
    res.header('Access-Control-Allow-Origin', origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(compression());
  app.use('/', routes);

  module.exports = app;