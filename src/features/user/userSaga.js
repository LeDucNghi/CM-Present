import { call, put, takeLatest } from "redux-saga/effects";
import {
  postUserList,
  postUserListFailed,
  postUserListSuccess,
} from "./userSlice";

import { userApi } from "api/userApi";

function* fetchUserList(action) {
  try {
    const res = yield call(userApi.getAll);
    yield put(postUserListSuccess(res));
  } catch (error) {
    console.log(
      "🚀 ~ file: userSaga.js ~ line 11 ~ function*fetchUserList ~ error",
      error
    );
    yield put(postUserListFailed(error.message));
    throw error;
  }
}

export default function* userSaga() {
  yield takeLatest(postUserList.type, fetchUserList);
}
