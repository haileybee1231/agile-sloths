import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';

// VIEWS TO RENDER
import MainFeed from './FeedList.jsx';
import LoginForm from './Login.jsx';
import Sidebar from './Sidebar.jsx';
import SignupForm from './Signup.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  // App component handles all redirections based on path options below
  render() {
    return (
      <div>
        <Route exact path='/' component={ MainFeed } />
        <Route path='/login' component={ LoginForm } />
        <Route path='/signup' component={ SignupForm } />
      </div>
    )
  }
}

export default App;
