'use strict';

var mongoose = require('mongoose');

// MongoDB schema for a short link.
// Yes, it's just a key-value.
var linkSchema = new mongoose.Schema({
  key: String,
  url: String
});

module.exports = mongoose.model('Link', linkSchema, 'links');
