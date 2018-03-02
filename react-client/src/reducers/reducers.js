import data from '../../src/testdata.js';
import $ from 'jquery';

const mainReducer = (state = data, action) => { // reducers are dispatched here
  switch(action.type) { // if their action type matches a case,
    case 'LOGIN': {
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
    case 'CREATE-EVENT':
      return {
        ...state,
        events: [...events, payload.event]
      }
    case 'FETCH-EVENTS':
      return {
        ...state,
        events: [...state.events, ...payload.newEvents]
      }
    default: return state;
  }
}

export default mainReducer;
