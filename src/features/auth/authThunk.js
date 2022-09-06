import { loginFailed, loginSuccess } from "./authSlice";

import { Toast } from "utils";
import history from "utils/history";

export const handleLogin = (payload) => (dispatch, getState) => {
  try {
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
      Toast.fire({
        icon: "error",
        title: "Invalid email",
      });
      dispatch(loginFailed());
    } else if (checkPass) {
      Toast.fire({
        icon: "error",
        title: "Invalid password",
      });
      dispatch(loginFailed());
    } else {
      Toast.fire({
        icon: "success",
        title: "Signin success",
      });
      dispatch(loginSuccess());
      dispatch(history.push(`/main/user`));
      localStorage.setItem("account", JSON.stringify(items));
    }
  } catch (error) {
    console.log(
      "🚀 ~ file: authThunk.js ~ line 45 ~ handleLogin ~ error",
      error
    );
    dispatch(loginFailed());
  }
};

export const handleLogout = () => (dispatch, getState) => {
  localStorage.clear();
  window.location.href = "/signin";
  dispatch(history.push("/signin"));
};
