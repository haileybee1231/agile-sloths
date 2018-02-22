import { createStore } from 'redux';
import { combineReducers } from 'redux';
import testReducer from '../../src/reducers/testReducer.js';

const reducer = combineReducers({ // combine all reducers from reducer file
  data: testReducer
});

const store = createStore(reducer); // create store

export default store;
