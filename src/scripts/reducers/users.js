import {REQUEST_FETCH_USERS, FETCH_USERS} from '../actionTypes';

export default function(state = {}, action) {
  switch (action.type) {
    case REQUEST_FETCH_USERS:
      return {... state, isFetch: true};
    case FETCH_USERS:
      return fetchUsers(state, action);
    default:
      return state;
  }
}

function fetchUsers(state, action) {
  if(action.error)
    return {... state, isFetch: false, error: true};
  else {
    return {... state,
      isFetch: false,
      error: false,
      list: action.payload.results,
      total: action.payload.total,
      page: action.payload.query.page,
      filters: action.payload.query.filters,
      sorts: action.payload.query.sorts
    };
  }
}
