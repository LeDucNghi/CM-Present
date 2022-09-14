import {
  addUser,
  addUserFailed,
  addUserSuccess,
  fetchUserListFailed,
  fetchUserListSuccess,
  fetchingUserList,
} from "./userSlice";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import Swal from "sweetalert2";
import { userApi } from "api/userApi";

function* fetchUserList() {
  try {
    const res = yield call(userApi.getAll);
    yield put(fetchUserListSuccess(res));
  } catch (error) {
    console.log(
      "🚀 ~ file: userSaga.js ~ line 11 ~ function*fetchUserList ~ error",
      error
    );
    yield put(fetchUserListFailed(error.message));
  }
}

function* handleAddUser(action) {
  const { payload } = action;
  console.log(
    "🚀 ~ file: userSaga.js ~ line 29 ~ function*handleAddUser ~ payload",
    payload
  );
  try {
    const res = yield call(userApi.addNewUser, payload);
    console.log(
      "🚀 ~ file: userSaga.js ~ line 30 ~ function*handleAddUser ~ res",
      res
    );

    yield put(addUserSuccess(payload));

    yield Swal.fire("Added user successfully!", "", "success");
  } catch (error) {
    console.log(
      "🚀 ~ file: userSaga.js ~ line 28 ~ function*handleAddUser ~ error",
      error
    );
    yield put(addUserFailed());
    yield Swal.fire(`${error.message}`, "", "error");
  }
}

export default function* userSaga() {
  yield takeEvery(addUser.type, handleAddUser);
  yield takeLatest(fetchingUserList.type, fetchUserList);
}
