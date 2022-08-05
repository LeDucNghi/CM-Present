import { call, put, takeLatest } from "redux-saga/effects";

import { userActions } from "./userSlice";
import { userApi } from "api/userApi";

function* fetchUserList(action) {
  // console.log("hi, chúc mừng bạn đã vào đc get user list Saga");

  try {
    const res = yield call(userApi.getAll);
    yield put(userActions.postUserListSuccess(res));
  } catch (error) {
    console.log(
      "🚀 ~ file: userSaga.js ~ line 11 ~ function*fetchUserList ~ error",
      error
    );
    yield put(userActions.postUserListFailed(error.message));
    throw error;
  }
}

export default function* userSaga() {
  yield takeLatest(userActions.postUserList.type, fetchUserList);

  // console.log("hi, chúc mừng bạn đã vào đc user Saga");
}
