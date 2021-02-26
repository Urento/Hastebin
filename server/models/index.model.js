'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HasteSchema = new Schema({
  id: {
    type: String,
  },
  content: {
    type: String,
  },
  created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('haste', HasteSchema);