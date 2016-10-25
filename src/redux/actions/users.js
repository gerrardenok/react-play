import {USERS_FETCH_REQUEST, USERS_FETCH_SUCCESS, USERS_FETCH_FAILURE, SET_USERS_SORT, DELETE_USER} from '../actionTypes';
import fetch from 'isomorphic-fetch'

export function usersFetchRequest(page, filters, sorts, limit) {
  return {
    type: USERS_FETCH_REQUEST,
    page,
    filters,
    sorts,
    limit
  }
}

export function usersFetchSuccess(users) {
  return {
    type: USERS_FETCH_SUCCESS,
    users: users
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

export function deleteUser(index) {
  return {
    type: DELETE_USER,
    id: index
  }
}

const sortUsers = (json, sorts) => {
  let {results} = json;

  const dynamicSort = (propertyGetter, order) => {
    let sortOrder = (order == 'desc') ? -1: 1;
    return (a,b) => {
      let result = (propertyGetter(a) < propertyGetter(b)) ? -1 : (propertyGetter(a) > propertyGetter(b)) ? 1 : 0;
      return result * sortOrder;
    }
  };

  Object.keys(sorts).forEach((key) => {
    switch (key) {
      case 'first':
        results.sort(dynamicSort((user) => (user.name.first), sorts[key]));
        break;

      case 'last':
        results.sort(dynamicSort((user) => (user.name.last), sorts[key]));
        break;

      case 'email':
        results.sort(dynamicSort((user) => (user.email), sorts[key]));
        break;

      case 'gender':
        results.sort(dynamicSort((user) => (user.gender), sorts[key]));
        break;

      case 'city':
        results.sort(dynamicSort((user) => (user.location.city), sorts[key]));
        break;

      default:
        break;
    }
  });

  return results;
};


export function fetchUsers(page = 1, filters = {}, sorts = {}, limit = 10) {
  return dispatch => {
    dispatch(usersFetchRequest(page, filters, sorts, limit));
    return fetch(`https://randomuser.me/api/?page=${page}&results=${limit}`)
      .then(
        response => response.json(),
        response => dispatch(usersFetchFailure(response))
      )
      .then(json => {
        let sortedUsers = sortUsers(json, sorts);
        dispatch(usersFetchSuccess(sortedUsers));
      })
  }
}

