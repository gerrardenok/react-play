import {takeEvery} from "redux-saga";
import {call, put} from "redux-saga/effects";
import {USERS_FETCH_REQUESTED, USERS_FETCH_SUCCEEDED, USERS_FETCH_FAILED} from "../actionTypes";

function* fetchUsers(action) {
  try {
    const response = yield call(`https://randomuser.me/api/?results=${action.payload.limit}`);
    yield put({type: USERS_FETCH_SUCCEEDED, user: response.results});
  } catch (e) {
    yield put({type: USERS_FETCH_FAILED, message: e.message});
  }
}

function* usersSaga() {
  yield* takeEvery(USERS_FETCH_REQUESTED, fetchUsers);
}


export default usersSaga;
