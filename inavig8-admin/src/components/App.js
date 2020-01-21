import React from 'react';
import Logo from './Logo';
import Header from './Header';
import Nav from './Nav';
import Main from './Main';
import Footer from './Footer';
import Login from './auth/Login';
import './App.css';
import config from '../config.json';

import Auth from '@aws-amplify/auth';


class App extends React.Component {

  state = {
    admin: JSON.parse(localStorage.getItem('admin')) || [],
    nav: 'Dashboard',
    locations: {},
  }

  componentDidMount() {

    // let accessToken = localStorage.getItem("admin") != null ? localStorage.getItem("CognitoIdentityServiceProvider.7qismhftk1ehili7a4qp9cc5el." + 
    //     JSON.parse(localStorage.getItem("admin")).username + ".idToken") : "";

    let headers = config.api.headers;
    
    fetch(config.api.invokeUrl + '/locations', {
        method: "GET",
        headers,
    }).then(response => {
        return response.json();
    }).then(result => {
        this.setState(
            {
                locations: result.body.data
            }
        );
    });

}

  onLogin = (user) => {

    this.setState(
      {
        admin: {
          username: user.username,
          password: user.password,
          email: user.attributes.email,
          first_name: user.attributes.name.split(" ").length === 2 ? user.attributes.name.split(" ")[0] : "",
          last_name: user.attributes.name.split(" ").length === 2 ? user.attributes.name.split(" ")[1] : "",
          role: 'Admin',
        },
      }
      ,() => {
      localStorage.setItem('admin', JSON.stringify(this.state.admin))
    });

  }

  onNavSelection = (nav) => {

    this.setState (
      {
        nav
      }
    );

  }

  handleCreateLocation = (newLocation, parent_location_id) => {
    
      console.log("handleCreateLocation: ", newLocation);
      
      //var child_location_id;
      const url = config.api.invokeUrl + '/location/new';
      let headers = config.api.headers;
      let body = JSON.stringify(newLocation);

      fetch(url, {
          method: "POST",
          headers,
          body,
      }).then(response => {
        if (response.ok) {
            console.log("response is ok");
            return response.json();
        } else {
            throw Error(`Request rejected with status ${response.status}`);
        }
      }).then(result => {
          console.log("App.js -> result: ", result);
          
          this.setState(
              {
                  locations: [...this.state.locations, { ...result.body.data[0] }]
              }
          );
          //child_location_id = {...result.body.data[0].location_id};

      });

      // if (child_location_id) {
      //     const url2 = config.api.invokeUrl + '/location/set-child?parent_id=' + parent_location_id + '&child_id=' + child_location_id;

      //     fetch(url2, {
      //         method: "GET",
      //         headers,
      //     }).then(response => {
      //         return response.json();
      //     });

      //     fetch(config.api.invokeUrl + '/locations', {
      //       method: "GET",
      //       headers,
      //     }).then(response => {
      //         return response.json();
      //     });
      // }

  }

  handleUpdateLocation = (currentLocation) => {

      let headers = config.api.headers;
      let body = JSON.stringify(currentLocation);
      const url = config.api.invokeUrl + '/location/update';

      fetch(url, {

          method: "POST",
          headers,
          body,

      }).then(response => {

//TODO: it is updating the database, but not getting response because of CORS error
/*
  Access to fetch at 'https://6ifyh4p4z2.execute-api.us-west-2.amazonaws.com/dev/location/update' from
  origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header 
  is present on the requested resource. If an opaque response serves your needs, set the request's mode 
  to 'no-cors' to fetch the resource with CORS disabled.

  index.js:1375 TypeError: Failed to fetch
*/

          if (response.ok) {
              return response.json();
          } else {
              throw Error(`Request rejected with status ${response.status}`);
          }

      }).catch(console.error);
      // }).then(result => {
          this.setState(state => {
              const locations = this.state.locations.map(loc => {
                  if (loc.location_id === currentLocation.location_id) {
                      loc.short_name = currentLocation.short_name;
                      loc.long_name = currentLocation.long_name;
                      loc.description = currentLocation.description;
                      // loc.canvas_image = currentLocation.canvas_image;
                      return loc;
                  } else {
                    return loc;
                  }
              });

              return locations;
          });
      // });

      

  }

  handleDeleteLocation = (location_id) => {
      // delete location
      console.log("App.js's handleDeleteLocation: (fake) deleting location ", location_id);
  }

  render() {

    Auth.currentSession()
    .then(data => {
      // this.setState(data);
      console.log(data);
      var s = {
          admin: {
              username: data.accessToken.payload.username,
              password: "",
              email: data.idToken.payload.email,
              first_name: "firstname",
              last_name: "lastname",
              role: "Admin"
          }
      };
      // this.setState(s);//

    })
    .catch(err => console.log(err));

    //console.log("this.state.admin.length: ", this.state.admin.length);
    if (!this.state.admin || this.state.admin.length === 0) {
      return <Login onLogin={this.onLogin} />;
    } else {
      return (

        <div className="container-loggIn">
          <Logo />
          <Header
              profile={this.state.admin} 
          />
          <Nav 
              onNavSelection={this.onNavSelection} 
              highlight={this.state.nav} 
          />
          <Main 
              page={this.state.nav} 
              locations={this.state.locations} 
              handleCreateLocation={this.handleCreateLocation}
              handleUpdateLocation={this.handleUpdateLocation}
              handleDeleteLocation={this.handleDeleteLocation}
          />
          <Footer />
        </div>

      )
    }

    

}

}

export default App;
