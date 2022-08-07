import { call, delay, fork, put, take } from "redux-saga/effects";

import { authActions } from "./authSlice";
import history from "utils/history";

function* handleLogin(payload) {
  console.log(
    "🚀 ~ file: authSaga.js ~ line 7 ~ function*handleLogin ~ payload",
    payload
  );
  // try {
  //   console.log("vào handleLogin thành công");
  //   const email = "testing@gmail.com";
  //   const password = "123456789Test";

  //   const checkMail = email !== payload.email;
  //   const checkPass = password !== payload.password;

  //   const now = new Date();
  //   const expiredTime = now.getTime() + 86400000;

  //   const items = {
  //     values: payload,
  //     expired: expiredTime,
  //   };

  //   if (checkMail || checkPass) {
  //     console.log("invalid account!!");
  //     // setSubmitting(false);
  //   } else {
  //     localStorage.setItem("account", JSON.stringify(items));

  //     yield delay(2000);
  //     history.push(`/main/user`);
  //     // setSubmitting(false);
  //   }
  // } catch (error) {
  //   yield put(authActions.loginFailed(error.message));
  // }
}

function* handleLogout() {
  localStorage.removeItem("account");
  yield put(history.push("/signin"));
}

function* watchLoginFlow() {
  console.log("vào watch login flow");

  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem("account"));

    if (!isLoggedIn) {
      const action = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  console.log("vào auth saga thành công");

  yield fork(watchLoginFlow);
}
