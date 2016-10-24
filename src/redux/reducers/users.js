import {USERS_FETCH_REQUESTED, USERS_FETCH_SUCCEEDED, USERS_FETCH_FAILED} from "../actionTypes";

export default function(state = {}, action) {
  switch (action.type) {
    case USERS_FETCH_REQUESTED:
      return {... state, isFetch: true};
    case USERS_FETCH_SUCCEEDED:
      return {... state, isFetch: false, list: action.users};
    case USERS_FETCH_FAILED:
      return {... state, isFetch: false, error: true};
    default:
      return state;
  }
}
