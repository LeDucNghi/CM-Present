import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  deleteFromUserList,
  postUserListSuccess,
} from "features/user/userSlice";
import {
  deleteUser,
  postDeletedList,
  postDeletedListFailed,
  postDeletedListSuccess,
  restoreUser,
} from "./trashSlice";

import { trashApi } from "api/trashApi";
import { userApi } from "api/userApi";

function* handleDeleteFromUserList({ payload }) {
  const checkDiffElement = payload.row.filter(
    (x) => !payload.selectedRow.some((x1) => x.id === x1.id)
  );

  const checkSameElement = payload.row.filter((x) =>
    payload.selectedRow.some((x1) => x.id === x1.id)
  );

  yield all(checkSameElement.map((x) => call(userApi.deleteUser, x.id)));

  yield put(postUserListSuccess(checkDiffElement));
}

function* handleDeleteUser({ payload }) {
  const checkDiffElement = payload.row.filter(
    (x) => !payload.selectedRow.some((x1) => x.id === x1.id)
  );

  const checkSameElement = payload.row.filter((x) =>
    payload.selectedRow.some((x1) => x.id === x1.id)
  );

  if (payload.isDenied === true) {
    // delete user from user list
    // if isDenied === true
    // then assign deletedList = payload.list
    // list is deletedUserList

    var deletedList = [];
    deletedList = [...payload.list];
    console.log(
      "🚀 ~ file: trashSaga.js ~ line 45 ~ function*handleDeleteUser ~ deletedList",
      deletedList
    );

    yield all(
      checkSameElement.map((x) => {
        const { id, ...rest } = x;
        // on API
        // delete user with x.id
        // then add deleted user to trash list
        return all([
          // add deleted user on UI
          deletedList.push({
            ...rest,
            id: deletedList.length + 1,
          }),

          call(userApi.deleteUser, x.id),
          call(trashApi.addNewUser, { ...rest }),
        ]);
      })
    );

    // update deletedList and userList on UI
    yield put(postDeletedListSuccess(deletedList));
    yield put(postUserListSuccess(checkDiffElement));
  } else {
    // delete user from trash
    yield all(checkSameElement.map((id) => call(trashApi.deleteUser, id)));

    // update deletedList on UI
    yield put(postDeletedListSuccess(checkDiffElement));
  }
}

function* handleRestoreUser({ payload }) {
  const checkDiffElement = payload.row.filter(
    (x) => !payload.selectedRow.some((x1) => x.id === x1.id)
  );

  const checkSameElement = payload.row.filter((x) =>
    payload.selectedRow.some((x1) => x.id === x1.id)
  );

  var userList = [];
  userList = [...payload.list];

  // checkSameElement.forEach((el) => {
  //   const { id, ...rest } = el;

  //   userList.push({
  //     ...rest,
  //     id: userList.length + 1,
  //   });
  // });

  yield all(
    checkSameElement.map((x) => {
      const { id, ...rest } = x;
      return all([
        // on API
        // add new user with that info
        // delete user with x.id
        call(userApi.addNewUser, { ...rest }),
        call(trashApi.deleteUser, x.id),

        // add new user on UI
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
  yield takeEvery(deleteFromUserList.toString(), handleDeleteFromUserList);
  yield takeEvery(restoreUser.toString(), handleRestoreUser);
  yield takeEvery(deleteUser.toString(), handleDeleteUser);

  yield takeLatest(postDeletedList.type, fetchDeletedList);
}
