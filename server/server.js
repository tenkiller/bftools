var express = require('express'),
    logger = require('morgan'),
    cors = require('cors'),
    path = require('path'),
    fs = require('fs'),
    root = __dirname,
    port = process.env['PORT'] || 8080;

var comics = JSON.parse(fs.readFileSync(root + '/api/comics.json', 'utf8'));
var total = comics.length;

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use('/', express.static(path.join(root, '../client')));
app.use('/vendor', express.static(path.join(root, '../bower_components')));

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

// catch all
app.get('*', function (req, res) {
  res.status(200).sendFile(path.join(root, '../client/index.html'));
});

app.listen(port, function () {
  console.log('Express server listening on port ' + port);
  console.log('process.cwd = ' + process.cwd());
  console.log('root = ' + root);
});