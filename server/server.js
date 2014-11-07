/**
 * Created by Thade on 11/2/2014.
 */
'use strict';

var express = require('express');
var app = express();
var fs = require('fs');
var logger = require('morgan');
var port = process.env['PORT'] || 8080;

var comics = JSON.parse(fs.readFileSync(__dirname + '/comics.json', 'utf8'));
var total = comics.length;

app.use(logger('dev'));

app.use('/', express.static('../client'));
app.use('/vendor', express.static('../bower_components'));

app.get('/api/comics', function (req, res) {
  var skip, take, data;

  skip = req.param('skip');
  take = req.param('take');

  if (skip && take) {
    skip = parseInt(skip);
    take = parseInt(take) + skip;
    data = comics.slice(skip, take);
  } else {
    data = comics;
  }

  res.status(200).json({ data : data, total: total });
});

app.listen(port, function () {
  console.log('Express server listening on port ' + port);
  console.log('process.cwd = ' + process.cwd());
});