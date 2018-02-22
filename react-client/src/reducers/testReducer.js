import data from '../../src/testdata.js';

const testReducer = (state = data, action) => { // reducers are dispatched here
  switch(action.type) { // if their action type matches a case,
    case 'LOGIN':
      return Object.assign({}, state, {user: action.payload}) // they do something to state
    default: return state;
  }
}

export default testReducer;
