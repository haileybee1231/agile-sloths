import data from '../../src/testdata.js';

const testReducer = (state = data, action) => { // reducers are dispatched here
  console.log(state, action); // this log is just to prove that state is in fact changing, it will be removed soon
  switch(action.type) { // if their action type matches a case,
    case 'LOGIN':
      return Object.assign({}, state, {user: action.payload}) // they do something to state
    default: return state;
  }
}

export default testReducer;
