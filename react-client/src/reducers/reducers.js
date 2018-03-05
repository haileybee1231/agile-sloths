import data from '../../src/testdata.js';
import $ from 'jquery';

const mainReducer = (state = data, action) => { // reducers are dispatched here
  switch(action.type) { // if their action type matches a case,
    case 'LOGIN': {
      return {
        ...state,
        currentUser: action.payload.username,
        firstname: action.payload.firstname
      }
      };
    case 'LOGOUT': {
      return {
        ...state,
        currentUser: null,
        favoritesfollowers: null,
        fftype: null
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
        events: [...state.data.events]
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
    case 'HANDLE-FOLLOW':
    console.log(action.payload.user)
      if (state.favoritesfollowers.indexOf(action.payload.user) < 0) {
        return {
          ...state,
          favoritesfollowers: [...state.favoritesfollowers, action.payload.user]
        }
      } else {
        return {
          ...state,
          favoritesfollowers: state.favoritesfollowers.filter(favoritefollower => favoritefollower !== action.payload.user)
        }
      }
    case 'SET-FAVORITES-FOLLOWERS':
      return {
        ...state,
        fftype: action.payload.fftype,
        favoritesfollowers: action.payload.favoritesfollowers
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
