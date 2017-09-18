'use strict'

//COMPONENTS
import React, { Component } from 'react'
import CountUp from 'react-countup'

//FUNCTIONS
import common from '../common/common.jsx'

//MAIN
export default class Result extends Component {
  constructor(props) {
    super(props)
    this.state = { numAttending: '...' }
    this.addAttendee = this.addAttendee.bind(this)
    this.numAttending = this.numAttending.bind(this)
  }
  numAttending() {
    const venueURL = '/api/venue/' + this.props.item.id

    common.f(venueURL, 'GET', response => {
      this.setState({
        numAttending: response
      })
    })
  }
  addAttendee() {
    if (this.props.permissions) {
      const venueURL = '/api/venue/' + this.props.item.id

      common.ajaxRequest('POST', venueURL, response => {
        const data = JSON.parse(response)
        if (!(typeof data === 'number')) {
          console.log('Error:', data)
        } else {
          this.setState({
            numAttending: data
          })
        }
      })
    } else {
      console.log('Please log in first!')
      window.location = '/auth/github'
    }
  }
  componentWillMount() {
    this.numAttending()
  }
  render() {
    return (
      <div className="result" onClick={this.addAttendee}>
        <span>
          <img src={this.props.item.image_url} height='50' width='70'></img>
        </span>
        <div className="nameBox">
          {this.props.item.name}
          <small>
            {this.props.item.location.display_address.map(
              item => ' ' + item + ' '
            )}
          </small>
        </div>
        <div className="numBox">
          <CountUp start={0} end={this.state.numAttending} />
          <small> going</small>
        </div>
      </div>
    )
  }
}
