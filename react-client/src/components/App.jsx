import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginForm from './Login.jsx';
import Sidebar from './Sidebar.jsx';
import SignupForm from './Signup.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <Route path='/' component={Sidebar} />
        <Route path='/login' component={LoginForm} />
        <Route path='/signup' component={SignupForm} />
      </div>
    )
  }
}

export default App;
