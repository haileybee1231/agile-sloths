import { createStore } from 'redux';
import { combineReducers } from 'redux';
import testReducer from '../../src/reducers/testReducer.js';

const reducer = combineReducers({
  data: testReducer
});

const store = createStore(reducer);

export default store;
