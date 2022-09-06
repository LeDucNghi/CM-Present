import {
  addUser,
  addUserSuccess,
  fetchUserListFailed,
  fetchUserListSuccess,
} from "./userSlice";

import { Toast } from "utils";
import { userApi } from "api/userApi";

export const fetchUserList = () => async (dispatch, getState) => {
  try {
    const res = await userApi.getAll();
    dispatch(fetchUserListSuccess(res));
  } catch (error) {
    console.log(
      "🚀 ~ file: userSaga.js ~ line 11 ~ function*fetchUserList ~ error",
      error
    );
    dispatch(fetchUserListFailed(error.message));
  }
};

export const handleAddUser =
  (values, setOpen) => async (dispatch, getState) => {
    try {
      // call api
      const res = await userApi.addNewUser(values);
      console.log("🚀 ~ file: userThunk.js ~ line 31 ~ res", res.status);

      dispatch(addUser(values));
      if (res) {
        dispatch(addUserSuccess());
        setOpen(false);
        Toast.fire("Added user successfully!", "", "success");
      }
    } catch (error) {
      setOpen(false);
      console.log("🚀 ~ file: userThunk.js ~ line 45 ~ error", error);
      Toast.fire(`${error.message}`, "", "error");
    }
  };
