//PACKAGES
import React, { Component } from 'react'

//RESOURCES
import Yelp_logo from '../img/Yelp_trademark_RGB_outline.png'

//COMPONENT
const Yelp = () =>
  <div className="yelp">
    <div className="text">Results from</div>
    <a href="https://www.yelp.com">
      <img
        alt="Yelp! logo"
        className="y-logo"
        name="Link to Yelp.com"
        src={Yelp_logo}
      />
    </a>
  </div>

export default Yelp
