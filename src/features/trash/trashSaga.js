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

  const diffList = checkDiffElement(payload.row, payload.selectedRow);
  try {
    yield all(
      payload.sameList.map((x) => {
        const { id, ...rest } = x;
        return payload.isDenied === true
          ? call(userApi.deleteUser, x.id)
          : call(trashApi.deleteUser, x.id);
      })
    );

    if (payload.isDenied === true) {
      yield put(fetchUserListSuccess(diffList));
    } else yield put(fetchDeletedListSuccess(diffList));
  } catch (error) {
    console.log(
      "🚀 ~ file: trashSaga.js ~ line 60 ~ function*handleDeletePermanent ~ error",
      error
    );
  }
}

function* handleRestoreUser(action) {
  const { payload } = action;
  const userList = yield select(selectUserList);
  const newUserList = [...userList];

  const sameList = checkSameElement(payload.row, payload.selectedRow);
  const diffList = checkDiffElement(payload.row, payload.selectedRow);

  yield all(
    sameList.map((x) => {
      const { id, ...rest } = x;
      return all([
        call(trashApi.deleteUser, x.id),
        call(userApi.addNewUser, { ...rest }),

        newUserList.push({ ...rest, id: newUserList.length + 1 }),
      ]);
    })
  );

  yield put(fetchUserListSuccess(newUserList));
  yield put(fetchDeletedListSuccess(diffList));
}

export default function* trashSaga() {
  yield takeLatest(fetchingDeletedList.type, fetchDeletedList);
  yield takeEvery(deleteUser.type, handleDeletePermanent);
  yield takeEvery(restoreUser.type, handleRestoreUser);
}
