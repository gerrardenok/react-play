import {USERS_FETCH_REQUEST, USERS_FETCH_SUCCESS, USERS_FETCH_FAILURE} from '../actionTypes';
import fetch from 'isomorphic-fetch'

export function requestUsers(page, limit) {
  return {
    type: USERS_FETCH_REQUEST,
    page,
    limit
  }
}

export function receiveUsers({results}) {
  return {
    type: USERS_FETCH_SUCCESS,
    users: results
  }
}

export function receiveUsersFailure(error) {
  return {
    type: USERS_FETCH_FAILURE,
    error
  }
}

export function fetchUsers(page = 1, limit = 10) {
  return dispatch => {
    dispatch(requestUsers(page, limit));
    return fetch(`https://randomuser.me/api/?page=${page}&results=${limit}`)
      .then(
        response => response.json(),
        response => dispatch(receiveUsersFailure(response))
      ).then(json => dispatch(receiveUsers(json)))
  }
}
