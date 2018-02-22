import data from '../../src/testdata.js';

const testReducer = (state = data, action) => {
  console.log(state, action);
  return state;
}

export default testReducer;
