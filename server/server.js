/**
 * Created by Thade on 11/2/2014.
 */
'use strict';

var express = require('express');
var app = express();
var logger = require('morgan');
var port = process.env['PORT'] || 8080;

app.use(logger('dev'));

app.use('/', express.static('../client'));
app.use('/vendor', express.static('../bower_components'));

app.listen(port, function () {
  console.log('Express server listening on port ' + port);
  console.log('process.cwd = ' + process.cwd());
});