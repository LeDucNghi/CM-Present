import {
  all,
  call,
  delay,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import {
  deleteUser,
  postDeletedList,
  postDeletedListFailed,
  postDeletedListSuccess,
  restoreUser,
} from "./trashSlice";

import { postUserListSuccess } from "features/user/userSlice";
import { trashApi } from "api/trashApi";
import { userApi } from "api/userApi";

function* handleDeleteUser({ payload }) {
  const checkDiffElement = payload.row.filter(
    (x) => !payload.selectedRow.some((x1) => x.id === x1.id)
  );

  const checkSameElement = payload.row.filter((x) =>
    payload.selectedRow.some((x1) => x.id === x1.id)
  );

  yield all(checkSameElement.map((id) => call(trashApi.deleteUser, id)));
  yield put(postDeletedListSuccess(checkDiffElement));
}

function* handleRestoreUser({ payload }) {
  yield delay(2000);

  const checkDiffElement = payload.row.filter(
    (x) => !payload.selectedRow.some((x1) => x.id === x1.id)
  );

  const checkSameElement = payload.row.filter((x) =>
    payload.selectedRow.some((x1) => x.id === x1.id)
  );

  var userList = [];
  userList = [...payload.list];

  checkSameElement.forEach((el) => {
    const { id, ...rest } = el;

    userList.push({
      ...rest,
      id: userList.length + 1,
    });
  });

  yield all(
    checkSameElement.map((x) => {
      const { id, ...rest } = x;
      return all([
        call(userApi.addNewUser, { ...rest }),
        call(trashApi.deleteUser, x.id),

        userList.push({
          ...rest,
          id: userList.length + 1,
        }),
      ]);
    })
  );

  yield put(postUserListSuccess(userList));
  yield put(postDeletedListSuccess(checkDiffElement));
}

function* fetchDeletedList() {
  try {
    const res = yield call(trashApi.getDeletedList);
    yield put(postDeletedListSuccess(res));
  } catch (error) {
    console.log(
      "🚀 ~ file: trashSaga.js ~ line 66 ~ function*fetchDeletedList ~ error",
      error
    );
    yield put(postDeletedListFailed(error.message));
  }
}

export default function* trashSaga() {
  yield takeEvery(restoreUser.toString(), handleRestoreUser);
  yield takeEvery(deleteUser.toString(), handleDeleteUser);

  yield takeLatest(postDeletedList.type, fetchDeletedList);
}
