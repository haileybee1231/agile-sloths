import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Router, Route } from 'react-router-dom';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import App from './App.jsx';
import reducers from '../reducers/reducers.js';

// store file not currently being used.
// Biggest difference is current version does not account for redux plugin
const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  applyMiddleware(ReduxThunk)
);

// used to give URL history to redux
const history = syncHistoryWithStore(createBrowserHistory(), store);

/* Root component can only have one child component (App).
App component handles route redirection based on the filtered path option below */
const Root = ({ store }) => (
  <Provider store={ store }>
    <Router history={ history }>
      <Route path='/:filter?' component={App} />
    </Router>
  </Provider>
)

export default Root
