import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUserListFailed,
  fetchUserListSuccess,
  fetchingUserList,
} from "./userSlice";

import { userApi } from "api/userApi";

function* fetchUserList() {
  try {
    const res = yield call(userApi.getAll);
    console.log(
      "🚀 ~ file: userSaga.js ~ line 9 ~ function*fetchUserList ~ res",
      res
    );
    yield put(fetchUserListSuccess(res));
  } catch (error) {
    console.log(
      "🚀 ~ file: userSaga.js ~ line 11 ~ function*fetchUserList ~ error",
      error
    );
    yield put(fetchUserListFailed(error.message));
  }
}

export default function* userSaga() {
  yield takeLatest(fetchingUserList.type, fetchUserList);
}
