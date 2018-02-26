import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { browserHistory } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import App from './App.jsx';
import LoginForm from './Login.jsx';
import Sidebar from './Sidebar.jsx';
import SignupForm from './Signup.jsx'
import reducers from '../reducers/reducers.js'

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
);

const history = syncHistoryWithStore(createBrowserHistory(), store);

const Root = ({ store }) => (
  <Provider store={ store }>
    <Router history={ history }>
      {/* <Route path="/:filter?" component={ App } /> */}
      <Route path='/:filter?' component={App}>
          {/* <Route path='login' component={LoginForm}/> */}
      </Route>
    </Router>
  </Provider>
)

export default Root