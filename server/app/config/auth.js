'use strict'

module.exports = {
  githubAuth: {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.APP_URL + 'auth/github/callback/'
  }
}
