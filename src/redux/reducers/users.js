import {USERS_FETCH_REQUEST, USERS_FETCH_SUCCESS, USERS_FETCH_FAILURE, SET_USERS_SORT, DELETE_USER, SET_USERS_FILTERS} from '../actionTypes';

export default function(state = {}, action) {
  switch (action.type) {
    case USERS_FETCH_REQUEST:
      return {... state, isFetch: true, page: action.page};
    case USERS_FETCH_SUCCESS:
      return {... state, isFetch: false, list: action.users};
    case USERS_FETCH_FAILURE:
      return {... state, isFetch: false, error: true};
    case SET_USERS_SORT: {
      return {... state, sorts: {[action.field]: action.value}};
    }
    case SET_USERS_FILTERS: {
      return {... state, filters: action.filters};
    }
    case DELETE_USER: {
      let users = state.list;
      if (users) {
        users = users.setFilter((e, index) => { return index != action.id}); // Fake delete
        return {... state, list: users};
      } else
        return state;
    }
    default:
      return state;
  }
}
