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
    case 'FETCH-EVENTS':
      $.ajax({
        type: 'GET',
        url: `EVENTS/${state.events.length - 1}`,
        success: newEvents => {
          return {
            ...state,
            events: [...state.events, ...newEvents]
          }
        },
        error: () => {
          console.log('oops')
        }
      })
    default: return state;
  }
}

export default mainReducer;
