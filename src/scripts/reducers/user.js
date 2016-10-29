import {REQUEST_FETCH_USER, FETCH_USER, DELETE_USER, UPDATE_USER} from '../actionTypes';

export default function(state = {}, action) {
  switch (action.type) {
    case REQUEST_FETCH_USER:
      return {... state, isFetch: true};
    case FETCH_USER:
      return fetchUser(state, action);
    case UPDATE_USER:
      return {... state, isFetch: false, error: false, profile: action.payload };
    case DELETE_USER: {
      return state;
    }
    default:
      return state;
  }
}

function fetchUser(state, action) {
  if(action.error)
    return {... state, profile:null, isFetch: false, error: true};
  else {
    return {... state,
      isFetch: false,
      error: false,
      profile: action.payload
    };
  }
}
