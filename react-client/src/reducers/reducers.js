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
    };
    case 'SIGNUP': {
      return state
    };

    case 'FETCH-RACES': {
      return state
    };

    case 'SAVE-RACE': {
      return state;
    }

    case 'CREATE-EVENT':
      return {
        ...state,
        events: [...state.events]
      }
    case 'ATTEND-EVENT': {
      return {
        ...state,
      }
    }
    case 'FETCH-EVENTS':
      return {
        ...state,
        events: [...action.payload.newEvents] || []
      }

    case 'SET-USER':
      return {
        ...state,
        selectedUser: action.payload.selectedUser
      }
    case 'SET-FAVORITES':
    console.log(action.payload)
      return {
        ...state,
        favorites: action.payload.favorites
      }
    case 'SET-FOLLOWERS':
    console.log(action.payload)
      return {
        ...state,
        followers: action.payload.followers
      }
    case 'SAVE-POLLING-INFO':
      return {
        ...state,
        pollingInfo: action.payload.results
      }
    case 'SAVE-CANDIDATE-INFO':
      return {
        ...state,
        candidateInfo: action.payload.results
      }
    default: return state;
  }
}


export default mainReducer;
