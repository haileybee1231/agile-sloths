import data from '../../src/testdata.js';
import $ from 'jquery';

const mainReducer = (state = data, action) => { // reducers are dispatched here
  switch(action.type) { // if their action type matches a case,
    case 'LOGIN': {
      console.log(action.payload)
        return {
          ...state,
          currentUser: action.payload.username
        }
      };
    case 'LOGOUT': {
      $.ajax({
        type: 'POST',
        url: '/logout',
        contentType: 'application/json',
        success: () => {
          console.log('You have been successfully logged out')
        },
        error: () => {
          console.log('There was an issue logging you out.')
        }
      })};
      break;
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
      });
      break;
    default: return state;
  }
}

export default mainReducer;
