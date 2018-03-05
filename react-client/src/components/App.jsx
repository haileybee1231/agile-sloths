import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, withRouter, browserHistory } from 'react-router-dom';

// VIEWS TO RENDER
import MainFeed from './FeedList.jsx';
import LoginForm from './Login.jsx';
import Sidebar from './Sidebar.jsx';
import SignupForm from './Signup.jsx';
import Profile from './Profile.jsx';
import VoterInfoTab from './VoterInfoTab.jsx';
import CandidateInfoTab from './CandidateInfoTab.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    window.navigator.geolocation.getCurrentPosition(function(pos){
      $.ajax({
        type: 'GET',
        url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+pos.coords.latitude+','+pos.coords.longitude+'&sensor=true',
        success: data => {
          window.localStorage.zipCode = data.results[0].address_components[7].short_name;
          // window.localStorage.address = data.results[0].formatted_address;
        }
      })
    });
  }

  // App component handles all redirections based on path options below
  // switch first route to Profile to see profile
  render() {
    return (

      <Router history={browserHistory}>
        <Switch>
          <Route exact path='/' component={ MainFeed } />
          <Route path='/login' component={ LoginForm } />
          <Route path='/signup' component={ SignupForm } />
          <Route path='/user*' component={ Profile } />
          <Route path='/vinfotab' component={ VoterInfoTab } />
          <Route path='/cinfotab' component={ CandidateInfoTab } />
        </Switch>
      </Router>
    )
  }
}

export default App;
