import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  fetchUserByIdFailed,
  fetchUserByIdSuccess,
  fetchingUser,
  setImage,
  setNewImage,
  updateUser,
  updateUserFailed,
  updateUserSuccess,
} from "./profileSlice";

import { userApi } from "api/userApi";

function* fetchUserById(action) {
  try {
    const res = yield call(userApi.getUserById, action.payload);
    yield put(fetchUserByIdSuccess(res));
  } catch (error) {
    console.log(
      "🚀 ~ file: profileSaga.js ~ line 11 ~ function*fetchUserById ~ error",
      error
    );
    yield put(fetchUserByIdFailed(error.message));
  }
}

function* handleUpdateUser(action) {
  const { payload } = action;
  try {
    yield call(userApi.updateUser, payload);
    yield put(updateUserSuccess());
  } catch (error) {
    console.log(
      "🚀 ~ file: profileSaga.js ~ line 35 ~ function*handleUpdateUser ~ error",
      error
    );
    yield put(updateUserFailed(error.message));
  }
}

export default function* profileSaga() {
  yield takeEvery(updateUser.type, handleUpdateUser);
  yield takeLatest(fetchingUser.type, fetchUserById);
}
