import { fork, put, take } from "redux-saga/effects";
import { login, loginFailed, loginSuccess, logout } from "./authSlice";

import { Toast } from "utils";
import history from "utils/history";

function* handleLogin(payload) {
  const email = "testing@gmail.com";
  const password = "123456789Test";

  const checkMail = email !== payload.email;
  const checkPass = password !== payload.password;

  const now = new Date();
  const expiredTime = now.getTime() + 86400000;

  const items = {
    values: payload,
    expired: expiredTime,
  };

  if (checkMail) {
    yield put(loginFailed());
    yield Toast.fire({
      icon: "error",
      title: "Invalid email",
    });
  } else if (checkPass) {
    yield put(loginFailed());
    yield Toast.fire({
      icon: "error",
      title: "Invalid password",
    });
  } else {
    localStorage.setItem("account", JSON.stringify(items));
    put(loginSuccess());
    Toast.fire({
      icon: "success",
      title: "Signin success",
    });
    history.push(`/main/user`);
  }
}

function* handleLogout() {
  yield localStorage.removeItem("account");
  yield history.push(`/signin`);
  yield put(logout());
}

function* watchLoginFlow() {
  console.log("vào watch login flow");
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem("account"));
    if (!isLoggedIn) {
      const action = yield take(login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(logout.type);
    yield fork(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
