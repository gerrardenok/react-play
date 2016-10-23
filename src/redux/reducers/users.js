import {REQUEST_USERS, RECEIVE_USERS, RECEIVE_USERS_FAILURE} from '../actionTypes';

export default function(state = {}, action) {
  switch (action.type) {
    case REQUEST_USERS:
      return {... state, isFetch: true};
    case RECEIVE_USERS:
      return {... state, isFetch: false, list: action.users};
    case RECEIVE_USERS_FAILURE:
      return {... state, isFetch: false, error: true};
    default:
      return state;
  }
}
