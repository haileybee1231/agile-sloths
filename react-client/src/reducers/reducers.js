import data from '../../src/testdata.js';
import $ from 'jquery';

const mainReducer = (state = data, action) => { // reducers are dispatched here
  console.log(state, action); // this log is just to prove that state is in fact changing, it will be removed soon
  switch(action.type) { // if their action type matches a case,
    case 'LOGIN': {
      let data = JSON.stringify(action.payload);
      $.ajax({
        type: 'POST',
        url: '/login',
        contentType: 'application/json',
        data: data,
        success: data => {
          //verify username, password matches whats in DB
          //if so, set state to loggedin and redirect to your Feed
          console.log(data)
        }
      })
    }

    case 'SIGNUP': {
      let data = JSON.stringify(action.payload);
      $.ajax({
        type: 'POST',
        url: '/signup',
        contentType: 'application/json',
        data: data,
        success: data => {
          //pushes user into database
          //sets state to loggedin 
          //redirects to feed
          console.log(data)
        },
        error: data => {
          console.log('error with signup', data)
        }
      })
    }

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
      })
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
      })
    default: return state;
  }
}

export default mainReducer;
