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
  deleteUser,
  fetchDeletedListFailed,
  fetchDeletedListSuccess,
  fetchingDeletedList,
  restoreUser,
} from "./trashSlice";
import { fetchUserListSuccess, selectUserList } from "features/user/userSlice";

import { trashApi } from "api/trashApi";
import { userApi } from "api/userApi";

function* fetchDeletedList() {
  try {
    const res = yield call(trashApi.getDeletedList);

    yield put(fetchDeletedListSuccess(res));
  } catch (error) {
    console.log(
      "🚀 ~ file: trashSaga.js ~ line 10 ~ function*fetchDeletedList ~ error",
      error
    );
    yield put(fetchDeletedListFailed(error.message));
  }
}

function* handleDeletePermanent(action) {
  const { payload } = action;

  if (!payload) return;
  const diffList = checkDiffElement(payload.row, payload.selectedRow);
  const sameList = checkSameElement(payload.row, payload.selectedRow);

  try {
    for (const el of sameList) {
      const { id, ...rest } = el;

      if (payload.isDenied === true) yield call(userApi.deleteUser, el.id);
      else yield call(trashApi.deleteUser, el.id);
    }

    if (payload.isDenied === true) yield put(fetchUserListSuccess(diffList));
    else yield put(fetchDeletedListSuccess(diffList));

    successPopup(`Đã xóa!`, `Deleted!`);
  } catch (error) {
    yield failedPopup(error.message);
  }
}

function* handleRestoreUser(action) {
  const { payload } = action;

  const userList = yield select(selectUserList);

  const newUserList = [...userList];

  const sameList = checkSameElement(payload.row, payload.selectedRow);
  const diffList = checkDiffElement(payload.row, payload.selectedRow);

  try {
    for (const el of sameList) {
      const { id, ...rest } = el;

      newUserList.push({
        ...rest,
        id: newUserList[newUserList.length - 1].id + 1,
      });

      const res = yield all([
        call(userApi.addNewUser, { ...rest }),
        call(trashApi.deleteUser, el.id),
      ]);
    }

    yield put(fetchDeletedListSuccess(diffList));
    yield put(fetchUserListSuccess(newUserList));
    successPopup(`Đã khôi phục!`, `Restored!`);
  } catch (error) {
    console.log(
      "🚀 ~ file: trashSaga.js ~ line 88 ~ function*handleRestoreUser ~ error",
      error
    );
    yield failedPopup(`Please try again 🤧`);
  }
}

export default function* trashSaga() {
  yield takeLatest(fetchingDeletedList.type, fetchDeletedList);
  yield takeEvery(deleteUser.type, handleDeletePermanent);
  yield takeEvery(restoreUser.type, handleRestoreUser);
}
