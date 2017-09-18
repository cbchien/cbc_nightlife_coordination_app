'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Venue = new Schema({
  id: String,
  attending: [String],
  created: {
    type: Date,
    default: Date.now,
    expires: '1d'
  }
})

module.exports = mongoose.model('Venue', Venue)
