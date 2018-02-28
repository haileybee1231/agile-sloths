import data from '../../src/testdata.js';
import $ from 'jquery';
const db = require('../../../database-mysql')

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
      return {
        ...state,
        currentUser: null
      }
    }
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
