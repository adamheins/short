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
    // TODO error handling
    res.redirect(link.url);
  });
});

app.listen(process.env.PORT);
