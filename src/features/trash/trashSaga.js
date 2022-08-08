import {
  call,
  delay,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";

import Swal from "sweetalert2";
import { store } from "app/store";
import { trashActions } from "./trashSlice";
import { trashApi } from "api/trashApi";
import { userActions } from "features/user/userSlice";
import { userApi } from "api/userApi";

function* handleDeleteUser(payload) {
  console.log("vào delete user");

  //   console.log(
  //     "🚀 ~ file: trashSaga.js ~ line 6 ~ function*handleDeleteUser ~ payload",
  //     payload
  //   );
  // const lastIndex = userListStorage[userListStorage.length - 1].id;

  //   Swal.fire({
  // title: `${
  //   languages === "VN"
  //     ? `Bạn có chắc chắn muốn khôi phục ${
  //         selectedRow.length === 1 ? "" : selectedRow.length
  //       } người dùng này không ?`
  //     : `Are you sure you want to restore ${
  //         selectedRow.length === 1 ? `this` : `these`
  //       }  ${selectedRow.length === 1 ? "" : selectedRow.length} user${
  //         selectedRow.length === 1 ? `` : `s`
  //       }?`
  // }`,
  // text: "",
  // icon: "warning",
  // showCancelButton: true,

  // confirmButtonColor: "#3085d6",
  // cancelButtonColor: "#d33",

  // confirmButtonText: `${
  //   languages === "VN" ? `Có, hãy khôi phục!` : `Yes, restore it!`
  // }`,
  // cancelButtonText: `${languages === "VN" ? `Hủy` : `Cancel`}`,

  // background: `${mode === "dark" ? "#121212" : ""}`,
  // color: `${mode === "dark" ? "#fff" : ""}`,
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       checkSameElement.forEach((el) => {
  //         const { id, ...rest } = el;
  //         deleteUserPermanently(el.id);
  //         postNewUser({ ...rest });
  //         dispatch(restoreUser({ ...rest }));
  //       });

  //       setRow(deletedUserListStorage);

  //       Swal.fire(
  //           `${languages === "VN" ? `Đã khôi phục!` : `Restored!`}`,
  //           "",
  //           "success"
  //           );
  //         }
  //     });
  //     yield put(trashActions.postDeletedList(checkDiffElement));
}

function* handleRestoreUser(payload) {
  var userList = [];
  var message;

  const languages = store.getState().app.language;
  const mode = store.getState().app.mode;

  const checkDiffElement = payload.row.filter(
    (x) => !payload.selectedRow.some((x1) => x.id === x1.id)
  );

  const checkSameElement = payload.row.filter((x) =>
    payload.selectedRow.some((x1) => x.id === x1.id)
  );

  Swal.fire({
    title: `${
      languages === "VN"
        ? `Bạn có chắc chắn muốn khôi phục ${
            payload.selectedRow.length === 1 ? "" : payload.selectedRow.length
          } người dùng này không ?`
        : `Are you sure you want to restore ${
            payload.selectedRow.length === 1 ? `this` : `these`
          }  ${
            payload.selectedRow.length === 1 ? "" : payload.selectedRow.length
          } user${payload.selectedRow.length === 1 ? `` : `s`}?`
    }`,
    text: "",
    icon: "warning",
    showCancelButton: true,

    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",

    confirmButtonText: `${
      languages === "VN" ? `Có, hãy khôi phục!` : `Yes, restore it!`
    }`,
    cancelButtonText: `${languages === "VN" ? `Hủy` : `Cancel`}`,

    background: `${mode === "dark" ? "#121212" : ""}`,
    color: `${mode === "dark" ? "#fff" : ""}`,
  }).then((result) => {
    message = result;
    if (result.isConfirmed) {
      userList = [...payload.list];

      checkSameElement.forEach((el) => {
        const { id, ...rest } = el;

        // deleteUserPermanently(el.id);
        // postNewUser({ ...rest });
        // dispatch(restoreUser({ ...rest }));

        // trashApi.deleteUser(el.id);
        // userApi.addNewUser({ ...rest });
        userList.push({
          ...rest,
          id: userList.length + 1,
        });
      });

      //   dispatch(postDeletedList(checkDiffElement));
      //   setRow(deletedUserListStorage);

      Swal.fire(
        `${languages === "VN" ? `Đã khôi phục!` : `Restored!`}`,
        "",
        "success"
      );
    }
  });
  console.log(
    "🚀 ~ file: trashSaga.js ~ line 135 ~ function*handleRestoreUser ~ message",
    message
  );

  // yield delay(2000);
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

function* watchTrashFlow() {
  while (true) {
    const restoreAction = yield take(trashActions.restoreUser.type);
    yield fork(handleRestoreUser, restoreAction.payload);

    const deleteAction = yield take(trashActions.deleteUser.type);
    yield fork(handleDeleteUser, deleteAction.payload);
  }
}

export default function* trashSaga() {
  yield fork(watchTrashFlow);

  yield takeLatest(trashActions.postDeletedList.type, fetchDeletedList);
}
