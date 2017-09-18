'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
   github: {
      id: String,
      displayName: String,
      username: String
   }
   /*,
         plans: [String],
      created: {
         type: Date,
         default: Date.now,
         expires: '1d'
      }*/
});

module.exports = mongoose.model('User', User);
