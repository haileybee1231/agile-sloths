import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import App from './App.jsx';
import reducers from '../reducers/reducers.js';

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
);

// used to give URL history to redux
const history = syncHistoryWithStore(createBrowserHistory(), store);

const Root = ({ store }) => (
  <Provider store={ store }>
    <Router history={ history }>
      <Route path='/:filter?' component={App} />
    </Router>
  </Provider>
)

export default Root