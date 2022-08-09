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

import { trashActions } from "./trashSlice";
import { trashApi } from "api/trashApi";
import { userActions } from "features/user/userSlice";
import { userApi } from "api/userApi";

function* handleDeleteUser({ payload }) {
  console.log(
    "🚀 ~ file: trashSaga.js ~ line 15 ~ function*handleDeleteUser ~ payload",
    payload
  );
  console.log("delete user");
  const checkDiffElement = payload.row.filter(
    (x) => !payload.selectedRow.some((x1) => x.id === x1.id)
  );

  const checkSameElement = payload.row.filter((x) =>
    payload.selectedRow.some((x1) => x.id === x1.id)
  );

  yield all(checkSameElement.map((id) => call(trashApi.deleteUser, id)));
  yield put(trashActions.postDeletedListSuccess(checkDiffElement));
}

function* handleRestoreUser({ payload }) {
  console.log(
    "🚀 ~ file: trashSaga.js ~ line 27 ~ function*handleRestoreUser ~ {payload}",
    { payload }
  );
  console.log("restore user");
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

    // userApi.addNewUser({ ...rest });
    // trashApi.deleteUser(id);

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

  yield put(userActions.postUserListSuccess(userList));
  yield put(trashActions.postDeletedListSuccess(checkDiffElement));
}

function* fetchDeletedList() {
  try {
    const res = yield call(trashApi.getDeletedList);
    yield put(trashActions.postDeletedListSuccess(res));
  } catch (error) {
    console.log(
      "🚀 ~ file: trashSaga.js ~ line 66 ~ function*fetchDeletedList ~ error",
      error
    );
    yield put(trashActions.postDeletedListFailed(error.message));
  }
}

export default function* trashSaga() {
  yield takeEvery(trashActions.restoreUser.toString(), handleRestoreUser);
  yield takeEvery(trashActions.deleteUser.toString(), handleDeleteUser);

  yield takeLatest(trashActions.postDeletedList.type, fetchDeletedList);
}
