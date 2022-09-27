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
import {
  checkDiffElement,
  checkSameElement,
  failedPopup,
  successPopup,
} from "utils";
import {
  fetchDeletedListSuccess,
  removeToTrash,
  selectDeletedList,
  setConfirm,
} from "features/trash/trashSlice";

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

      yield successPopup("Thêm user thành công!", "Added user successfully!");
    }
  } catch (error) {
    yield put(addUserFailed());

    yield failedPopup(error.message);
  }
}

function* handleRemoveToTrash(action) {
  const { payload } = action;

  const deletedList = yield select(selectDeletedList);
  const newDeletedList = [...deletedList];

  const sameList = checkSameElement(payload.row, payload.selectedRow);
  const diffList = checkDiffElement(payload.row, payload.selectedRow);

  yield put(setConfirm());

  try {
    for (const el of sameList) {
      const { id, ...rest } = el;

      newDeletedList.push({
        ...rest,
        id: newDeletedList[newDeletedList.length - 1].id + 1,
      });

      yield all([
        call(trashApi.addNewUser, { ...rest }),
        call(userApi.deleteUser, el.id),
      ]);
    }

    yield put(fetchUserListSuccess(diffList));
    yield put(fetchDeletedListSuccess(newDeletedList));
    successPopup(`Đã xóa!`, `Deleted!`);
  } catch (error) {
    console.log(
      "🚀 ~ file: userSaga.js ~ line 94 ~ function*handleRemoveToTrash ~ error",
      error
    );
    yield failedPopup(`Please try again 🤧`);
  }
}

export default function* userSaga() {
  yield takeEvery(addUser.type, handleAddUser);
  yield takeEvery(removeToTrash.type, handleRemoveToTrash);

  yield takeLatest(fetchingUserList.type, fetchUserList);
}
