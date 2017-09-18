'use strict'

/*    // DOESN'T PASS AUTHENTICATION!
fetch('/api/user/:id', {
  credentials: 'include', //true
  mode: 'same-origin', //'cors',
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
  .then(response => {
    if (response.length < 25) {
      const data = response.json()
      this.setState({
        user: 'YOLO, ' + data + '! Where are you going tonight?',
        permissions: true
      })
    }
  })
  .catch(err => console.error('Error:', err))
*/
/* DOESN'T WORK - despite loading babel-polyfill and babel-preset-env!
     async function a() {
        const user = await fetch('/api/user/:id')
        //	this.setState({ user: user })
        console.log('response from async:', user);
     }
     a();*/

//const appUrl = window.location.origin
//const apiUrl = appUrl + '/api/:id';
/*
async function f(url, method, cb) {
   try {
      const data = await fetch(url, { method: method });
      const json = data.json()
         .then(await cb);
   } catch (err) {
      console.error(err);
   }
}
*/

function ajaxRequest(method, url, callback) {
  var xmlhttp = new XMLHttpRequest()

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      callback(xmlhttp.response)
    }
  }

  xmlhttp.open(method, url, true)
  xmlhttp.send()
}

const processStatus = response => {
  // status "0" to handle local files fetching (e.g. Cordova/Phonegap etc.)
  if (response.status === 200 || response.status === 0) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

const f = (url, method, callback) => {
  fetch(url, { method: method, credentials: 'include' })
    .then(processStatus)
    .then(response => response.json())
    .then(response => callback(response))
    .catch(err => console.error(err))
}

const common = {
  //   appUrl: appUrl,
  //   apiUrl: apiUrl,
  ajaxRequest: ajaxRequest,
  f: f
}

export default common
