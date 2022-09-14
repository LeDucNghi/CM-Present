import {
  all,
  call,
  delay,
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
  removeToTrash,
  restoreUser,
  selectDeletedList,
} from "./trashSlice";
import { selectLanguage, selectMode } from "features/drawer/drawerSlice";

import Swal from "sweetalert2";
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

function* handleRemoveToTrash(action) {
  const { payload } = action;

  const deletedList = yield select(selectDeletedList);

  try {
    const newDeletedList = [...deletedList];

    yield all(
      payload.sameList.map((x) => {
        const { id, ...rest } = x;
        return all([
          newDeletedList.push({
            ...rest,
            id: newDeletedList.length + 1,
          }),
          // call(trashApi.addNewUser, { ...rest }),
          // call(userApi.deleteUser, x.id),
        ]);
      })
    );

    // add new user to trash list
    yield put(fetchDeletedListSuccess(newDeletedList));

    // delete user from user list
    yield put(fetchUserListSuccess(payload.diffList));

    // yield delay(200);
  } catch (error) {
    console.log(
      "🚀 ~ file: trashSaga.js ~ line 51 ~ function*handleRemoveToTrash ~ error",
      error
    );
  }
}

function* handleDeletePermanent(action) {
  const { payload } = action;
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
      yield put(fetchUserListSuccess(payload.diffList));
    } else yield put(fetchDeletedListSuccess(payload.diffList));
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

  yield all(
    payload.sameList.map((x) => {
      const { id, ...rest } = x;
      return all([
        call(trashApi.deleteUser, x.id),
        call(userApi.addNewUser, { ...rest }),

        newUserList.push({ ...rest, id: newUserList.length + 1 }),
      ]);
    })
  );

  yield put(fetchUserListSuccess(newUserList));
  yield put(fetchDeletedListSuccess(payload.diffList));
}

export default function* trashSaga() {
  yield takeLatest(fetchingDeletedList.type, fetchDeletedList);
  yield takeEvery(deleteUser.type, handleDeletePermanent);
  yield takeEvery(restoreUser.type, handleRestoreUser);
  yield takeEvery(removeToTrash.type, handleRemoveToTrash);
}
