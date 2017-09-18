'use strict'

/*** TOOLS ***/
const path = process.cwd()
const DEV = process.env.NODE_ENV === 'development'

/*** MODELS ***/
const Venue = require('../models/Venue.js')

/*** CONTROLLERS ***/
const VenueController = require('../controllers/venueController.server.js')

//Controller Object
const venueController = new VenueController()

module.exports = (app, passport) => {
  let name_view //This is the name that will display in the client view

  app.use((req, res, next) => {
    res.locals.name_view = name_view //Allows session's name_view to be accessed by controllers
    next()
  })

  //Auth check
  const permissions = (req, res, next) => {
    if (req.isAuthenticated()) {
      if (DEV) {
        console.log('AUTHORIZATION SUCCESSFUL')
      }
      if (req.user.github.displayName) {
        name_view = req.user.github.displayName
      } else if (req.user.github.username) {
        name_view = req.user.github.username
      }
      if (DEV) {
        console.log('USER:', name_view)
      }
      return next()
    } else {
      if (DEV) {
        console.log('USER NOT AUTHORIZED')
      }
      res.redirect('/login')
    }
  }

  //Root view
  app.route('/').get(permissions, (req, res) => {
    res.sendFile(path + '/client/views/index.html')
  })

  //Login view
  app.route('/login').get((req, res) => {
    res.sendFile(path + '/client/views/login.html')
  })

  //Passport logout
  app.route('/logout').get((req, res) => {
    req.logout()
    res.redirect('/login')
  })

  //Client-side API path to see name_view in React
  app.route('/api/user/:id').get(permissions, (req, res) => {
    res.json(name_view)
  })

  //GitHub and Passport authentication
  app.route('/auth/github').get(passport.authenticate('github'))

  app.route('/auth/github/callback').get(
    passport.authenticate('github', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
  )

  //Use Yelp! API to get locations
  app.route('/api/:location').get(venueController.getLocation)

  //Client-side API to get or modify database information for venues
  app
    .route('/api/venue/:id')
    .get(venueController.getVenue)
    .post(permissions, venueController.clickVenue)
}
