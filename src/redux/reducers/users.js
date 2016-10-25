import {USERS_FETCH_REQUEST, USERS_FETCH_SUCCESS, USERS_FETCH_FAILURE, SORT_USERS} from '../actionTypes';

export default function(state = {}, action) {
  switch (action.type) {
    case USERS_FETCH_REQUEST:
      return {... state, isFetch: true, page: action.page};
    case USERS_FETCH_SUCCESS:
      return {... state, isFetch: false, list: action.users};
    case USERS_FETCH_FAILURE:
      return {... state, isFetch: false, error: true};
    case SORT_USERS: {
      return {... state, sorts: {[action.field]: action.value}};
    }
    default:
      return state;
  }
}
