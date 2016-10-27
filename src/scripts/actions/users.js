import {FETCH_USERS, REQUEST_FETCH_USERS, DELETE_USER} from '../actionTypes';
import {find, deleteById} from '../services/user';

export const fetchUsers = (page = 1, filters = {}, sorts = {}, pageSize = 10) => (dispatch) => {
  dispatch(requestFetchUsers());
  dispatch(fetchUsersAction(page, filters, sorts, pageSize));
};

export function deleteUser(id) {
  return {
    type: DELETE_USER,
    payload: deleteById(id)
  }
}

function requestFetchUsers() {
  return {type: REQUEST_FETCH_USERS};
}

function fetchUsersAction(page = 1, filters = {}, sorts = {}, pageSize = 10) {
  return {
    type: FETCH_USERS,
    payload: find(page, filters, sorts, pageSize)
  }
}



