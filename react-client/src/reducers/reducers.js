import data from '../../src/testdata.js';
import $ from 'jquery';

const mainReducer = (state = data, action) => { // reducers are dispatched here
  console.log(state, action); // this log is just to prove that state is in fact changing, it will be removed soon
  switch(action.type) { // if their action type matches a case,
    case 'LOGIN':
      let data = JSON.stringify(action.payload);
      $.ajax({
        type: 'POST',
        url: '/login',
        contentType: 'application/json',
        data: data,
        success: data => {
          console.log(data)
        }
      })
    default: return state;
  }
}

export default mainReducer;
