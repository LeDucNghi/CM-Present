import { login, loginFailed, loginSuccess, logout } from "./authSlice";

import history from "utils/history";

export const handleLogin = (payload) => (dispatch, getState) => {
  console.log(
    "🚀 ~ file: authSaga.js ~ line 7 ~ function*handleLogin ~ payload",
    payload
  );
  try {
    console.log("vào handleLogin thành công");
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
      console.log("invalid account!!");
      dispatch(loginFailed());
    } else if (checkPass) {
      console.log("invalid password!!");
      dispatch(loginFailed());
    } else {
      console.log("login success");

      localStorage.setItem("account", JSON.stringify(items));

      // dispatchay(2000);
      dispatch(loginSuccess());
      dispatch(history.push(`/main/user`));
    }
  } catch (error) {
    dispatch(loginFailed());
  }
};

export const handleLogout = () => (dispatch, getState) => {
  localStorage.clear();
  window.location.href = "/signin";
  dispatch(history.push("/signin"));
};
