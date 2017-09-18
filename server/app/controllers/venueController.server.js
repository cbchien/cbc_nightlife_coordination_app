'use strict'

/*** ENVIRONMENTAL VARIABLES ***/
require('dotenv').load()

/*** MODEL ***/
const Venue = require('../models/Venue.js')

/*** TOOLS ***/
const DEV = process.env.NODE_ENV === 'development'

/*** YELP FUSION API ***/
const Yelp = require('node-yelp-fusion')
const yelp = new Yelp({
  id: process.env.YELP_CLIENT_ID,
  secret: process.env.YELP_CLIENT_SECRET
})

class VenueController {
  constructor(req, res) {
    //Get client-side location search parameter
    this.getLocation = (req, res) => {
      const location = req.params.location
      if (DEV) {
        console.log('Searching', location + '...')
      }
      //Search Yelp! Fusion API for bars in that location and return the results
      yelp
        .search('categories=bars&location=' + location)
        .then(result => {
          res.json(result.businesses)
        })
        .catch(err => {
          console.log(
            'Search for ' +
              location +
              ' nightlife REJECTED by Yelp! API...\n' +
              err
          )
          res.json(0)
        })
    }

    //Given a bar in a location, check the database to see how many users are planning to visit
    this.getVenue = (req, res) => {
      Venue.findOne({
        id: req.params.id
      }).exec((err, result) => {
        if (err) {
          console.error(err)
        }
        if (result) {
          res.json(result.attending.length)
        } else {
          res.json(0) //If nobody's going, return 0
        }
      })
    }

    this.clickVenue = (req, res) => {
      console.log(
        'NAME_VIEW:',
        res.locals.name_view || "name_view don't exist, hoss"
      )
      //If a user clicks a venue, check if it's in the database.
      Venue.findOne({
        id: req.params.id
      }).exec((err, result) => {
        if (err) {
          console.error(err)
        }
        //If the venue is in the database...
        if (result) {
          //...then if the user is already attending, remove them...
          if (result.attending.indexOf(res.locals.name_view) >= 0) {
            console.log('ATTENDING:', result.attending)
            result.attending.splice(
              result.attending.indexOf(res.locals.name_view),
              1
            )
          } else {
            //...otherwise, add them as an attendee.
            result.attending.push(res.locals.name_view)
          }

          //Save whatever just happened with the existing venue...
          result.save(err => {
            if (err) {
              console.error(err)
            }
          })
          //...and send total number of attendees to client!
          res.json(result.attending.length)
        } else {
          //However, if the venue is NOT in the database, add it...
          const newVenue = new Venue({
            id: req.params.id,
            attending: [res.locals.name_view]
          })
          //...save the new venue...
          newVenue.save((err, doc) => {
            if (err) {
              console.error(err)
            }
            //... and send the total number of attendees to the client!
            res.json(doc.attending.length)
          })
        }
      })
    }
  }
}

module.exports = VenueController
