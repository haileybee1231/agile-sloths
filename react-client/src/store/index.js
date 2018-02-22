import { createStore } from 'redux';
import { combineReducers } from 'redux';
import testReducer from '../../src/reducers/testReducer.js';

const reducer = combineReducers({ // combine all reducers from reducer file
  data: testReducer
});

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); // create store and allow for chrome redux plugin

export default store;
