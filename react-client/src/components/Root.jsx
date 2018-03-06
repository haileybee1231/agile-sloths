import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Router, Route } from 'react-router-dom';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import App from './App.jsx';
import reducers from '../reducers/reducers.js';

// at some point we ended up with two stores? They are both doing something, but there should defintitely only be one...
const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
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
