'use strict'

//PACKAGES
import React, { Component } from 'react'
import SlideAnimation from 'react-slide-animation'

//COMPONENTS
import Result from './Result.jsx'
import GitHub_btn from './GitHub-btn.jsx'
import Yelp from './Yelp.jsx'

//FUNCTIONS
import common from '../common/common.jsx'

//GLOBAL VARIABLE
const lastLocation = localStorage.getItem('nightlife_location')

//MAIN
export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      location: lastLocation
        ? 'Your scene: ' + lastLocation
        : 'Search for your location!', //Use local storage to save this for each user
      venues: [],
      user: '',
      permissions: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit() {
    const location = document.getElementById('locationSubmitBox').value
    this.setState({ location: 'Your scene: ' + location, venues: [] })
    this.getVenues(location)
    this.saveToLocal(location)
  }
  saveToLocal(c) {
    if (c !== 'Search your location!') {
      localStorage.setItem('nightlife_location', c)
    }
  }
  getVenues(c) {
    if (c && c !== 'Search your location!') {
      common.f('/api/' + c, 'GET', response => {
        if (response === 0) {
          this.setState({ location: "Yelp isn't finding anything..." })
        } else {
          this.setState({ venues: response })
        }
      })
    }
  }
  getUser() {
    common.ajaxRequest('GET', '/api/user/:id', response => {
      if (response.length < 25) {
        const data = JSON.parse(response)
        this.setState({
          user: data,
          permissions: true
        })
      }
    })
  }
  componentWillMount() {
    this.getUser()
    if (lastLocation) {
      this.getVenues(lastLocation)
    }
  }
  render() {
    const results = this.state.venues.map((item, index) =>
      <Result permissions={this.state.permissions} key={index} item={item} />
    )
    return (
      <div>
        <header>
          <h1 className="title">Simple Nightlife Coordination</h1>
        </header>

        <main>
          <label htmlFor="locationSubmitBox">
            <h3 className="scene">
              {this.state.location}
            </h3>

            <input
              id="locationSubmitBox"
              placeholder=" Enter your city here..."
              type="text"
            />
            <button className="go" onClick={this.handleSubmit}>
              GO
            </button>
          </label>

          <div className="results-wrapper">
            <Yelp />
            <GitHub_btn
              permissions={this.state.permissions}
              user={this.state.user}
            />
            <SlideAnimation component="div">
              {results}
            </SlideAnimation>
          </div>
        </main>

        <footer />
      </div>
    )
  }
}
