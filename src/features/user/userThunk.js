import {
  addUser,
  addUserSuccess,
  fetchUserListFailed,
  fetchUserListSuccess,
} from "./userSlice";

import Swal from "sweetalert2";
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
      dispatch(addUser(values));

      //   call api
      const res = await userApi.addNewUser(values);

      setTimeout(() => {
        // setSubmitting(false);
        dispatch(addUserSuccess());
        setOpen(false);
        Swal.fire("Added user successfully!", "", "success");
      }, 1500);
    } catch (error) {
      console.log("🚀 ~ file: userThunk.js ~ line 45 ~ error", error);
    }
  };
