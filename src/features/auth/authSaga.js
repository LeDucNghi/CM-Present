import { fork, put, take } from "redux-saga/effects";
import { login, loginFailed, loginSuccess, logout } from "./authSlice";

import { Toast } from "utils";
import history from "utils/history";
import moment from "moment";

function* handleLogin(payload) {
  const adminAccount = {
    email: "admin@gmail.com",
    password: "123456789Test",
    role: "admin",
  };

  const userAccount = {
    email: "user@gmail.com",
    password: "123456789Test",
    role: "user",
  };

  const checkMail = adminAccount.email || userAccount.email !== payload.email;
  const checkPass =
    adminAccount.password || userAccount.password !== payload.password;

  const now = new Date();
  const expiredTime = now.getTime() + 86400000;

  const items = {
    values: payload.email === `user@gmail.com` ? userAccount : adminAccount,
    expired: expiredTime,
    timeOut: moment(expiredTime).format("llll"),
  };

  if (!checkMail) {
    yield put(loginFailed());
    yield Toast.fire({
      icon: "error",
      title: "Invalid email",
    });
  } else if (!checkPass) {
    yield put(loginFailed());
    yield Toast.fire({
      icon: "error",
      title: "Invalid password",
    });
  } else {
    localStorage.setItem("account", JSON.stringify(items));
    yield put(loginSuccess());
    yield Toast.fire({
      icon: "success",
      title: "Signin success",
    });
    yield history.push(`/main/user`);
  }
}

function* handleLogout() {
  yield localStorage.removeItem("account");
  yield history.push(`/signin`);
  yield put(logout());
}

function* watchLoginFlow() {
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
