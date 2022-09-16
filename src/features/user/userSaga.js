import {
  addUser,
  addUserFailed,
  addUserSuccess,
  fetchUserListFailed,
  fetchUserListSuccess,
  fetchingUserList,
} from "./userSlice";
import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { checkDiffElement, checkSameElement } from "utils";
import {
  fetchDeletedListSuccess,
  removeToTrash,
  selectDeletedList,
} from "features/trash/trashSlice";

import Swal from "sweetalert2";
import { trashApi } from "api/trashApi";
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
  try {
    const res = yield call(userApi.addNewUser, payload);

    if (res) {
      yield put(addUserSuccess(payload));

      yield Swal.fire("Added user successfully!", "", "success");
    }
  } catch (error) {
    console.log(
      "🚀 ~ file: userSaga.js ~ line 28 ~ function*handleAddUser ~ error",
      error
    );
    yield put(addUserFailed());
    yield Swal.fire(`${error.message}`, "", "error");
  }
}

function* handleRemoveToTrash(action) {
  const { payload } = action;

  const deletedList = yield select(selectDeletedList);
  const sameList = checkSameElement(payload.row, payload.selectedRow);
  const diffList = checkDiffElement(payload.row, payload.selectedRow);

  try {
    const newDeletedList = [...deletedList];

    yield all(
      sameList.map((x) => {
        const { id, ...rest } = x;
        return all([
          newDeletedList.push({
            ...rest,
            id: newDeletedList.length + 1,
          }),
          call(trashApi.addNewUser, { ...rest }),
          call(userApi.deleteUser, x.id),
        ]);
      })
    );

    yield put(fetchDeletedListSuccess(newDeletedList));
    yield put(fetchUserListSuccess(diffList));

    // yield delay(200);
  } catch (error) {
    console.log(
      "🚀 ~ file: trashSaga.js ~ line 51 ~ function*handleRemoveToTrash ~ error",
      error
    );
  }
}

export default function* userSaga() {
  yield takeEvery(addUser.type, handleAddUser);
  yield takeEvery(removeToTrash.type, handleRemoveToTrash);

  yield takeLatest(fetchingUserList.type, fetchUserList);
}
