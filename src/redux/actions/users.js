import {USERS_FETCH_REQUEST, USERS_FETCH_SUCCESS, USERS_FETCH_FAILURE, SET_USERS_SORT} from '../actionTypes';
import fetch from 'isomorphic-fetch'

export function usersFetchRequest(page, limit) {
  return {
    type: USERS_FETCH_REQUEST,
    page,
    limit
  }
}

export function usersFetchSuccess({results}) {
  return {
    type: USERS_FETCH_SUCCESS,
    users: results
  }
}

export function usersFetchFailure(error) {
  return {
    type: USERS_FETCH_FAILURE,
    error
  }
}

export function setUsersSort(field, value) {
  return {
    type: SET_USERS_SORT,
    field,
    value
  }
}


export function fetchUsers(page = 1, limit = 10) {
  return dispatch => {
    dispatch(usersFetchRequest(page, limit));
    return fetch(`https://randomuser.me/api/?page=${page}&results=${limit}`)
      .then(
        response => response.json(),
        response => dispatch(usersFetchFailure(response))
      ).then(json => dispatch(usersFetchSuccess(json)))
  }
}
