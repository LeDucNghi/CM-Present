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
  const sameList = checkSameElement(payload.row, payload.selectedRow);
  const diffList = checkDiffElement(payload.row, payload.selectedRow);

  console.log(
    "🚀 ~ file: userSaga.js ~ line 68 ~ function*handleRemoveToTrash ~ sameList",
    sameList
  );
  try {
    const newDeletedList = [...deletedList];

    yield all(
      sameList.map((x) => {
        const { id, ...rest } = x;
        return all([
          call(trashApi.addNewUser, { ...rest }),
          call(userApi.deleteUser, x.id),
          newDeletedList.push({
            ...rest,
            id: newDeletedList[newDeletedList.length - 1].id + 1,
          }),
        ]);
      })
    );

    yield put(fetchUserListSuccess(diffList));
    yield put(fetchDeletedListSuccess(newDeletedList));
    // successPopup(`Đã xóa!`, `Deleted!`);
  } catch (error) {
    yield failedPopup(error.message);
  }
}

export default function* userSaga() {
  yield takeEvery(addUser.type, handleAddUser);
  yield takeEvery(removeToTrash.type, handleRemoveToTrash);

  yield takeLatest(fetchingUserList.type, fetchUserList);
}
