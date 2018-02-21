const testReducer = (state = 'test', action) => {
  console.log(state, action);
  return state;
}

export default testReducer;
