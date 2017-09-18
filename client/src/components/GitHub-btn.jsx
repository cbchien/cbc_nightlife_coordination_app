'use strict'

//Packages
import React, { Component } from 'react'

//Functions
import common from '../common/common.jsx'

//Image
import G_logo from '../img/GitHub-Mark-64px.png'

//Component
const GitHub_btn = ({ permissions, user }) =>
  <div>
    {permissions
      ? <div className="login">
          <a href="/logout">
            <img
              className="G_logo"
              src={G_logo}
              title="GitHub Logout"
              name="GitHub Logout"
            />YOLO, {user}! Where are you going tonight?
          </a>
        </div>
      : <div className="login">
          <a href="/auth/github">
            <img
              className="G_logo"
              src={G_logo}
              title="Login with GitHub"
              name="Login with GitHub"
            />Log in to share your plans!
          </a>
        </div>}
  </div>

export default GitHub_btn
