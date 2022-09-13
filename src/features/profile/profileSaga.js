import { call, put, takeLatest } from "redux-saga/effects";
import { fetchUserByIdFailed, fetchingUser } from "./profileSlice";

import { userApi } from "api/userApi";

function* fetchUserById(action) {
  console.log(
    "🚀 ~ file: profileSaga.js ~ line 7 ~ function*fetchUserById ~ payload",
    action.payload
  );

  try {
    const res = yield call(userApi.getUserById, action.payload);
    console.log(
      "🚀 ~ file: profileSaga.js ~ line 9 ~ function*fetchUserById ~ res",
      res
    );
  } catch (error) {
    console.log(
      "🚀 ~ file: profileSaga.js ~ line 11 ~ function*fetchUserById ~ error",
      error
    );
    yield put(fetchUserByIdFailed(error.message));
  }
}

export default function* profileSaga() {
  yield takeLatest(fetchingUser.type, fetchUserById);
}
