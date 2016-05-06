var express = require('express');
var mongoose = require('mongoose');

var Link = require('./models/link');

mongoose.connect(process.env.MONGO_URI);

var app = express();

app.get('/', function(req, res) {
  res.redirect('https://adamheins.com');
});

app.get('/:key', function(req, res) {
  Link.findOne({key: req.params.key}).exec(function(err, link) {
    if (link) {
      res.redirect(link.url);
    } else {
      res.status(404).send('Not found.');
    }
  });
});

app.get('/:key/*', function(req, res) {
  var remainderPath = req.originalUrl.substring(req.params.key.length + 1);
  Link.findOne({key: req.params.key}).exec(function(err, link) {
    if (link) {
      res.redirect(link.url + remainderPath);
    } else {
      res.status(404).send('Not found.');
    }
  });
});

app.listen(process.env.PORT);
