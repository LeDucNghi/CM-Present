import {
  addUser,
  addUserSuccess,
  postUserListFailed,
  postUserListSuccess,
} from "./userSlice";

import Swal from "sweetalert2";
import { userApi } from "api/userApi";

export const fetchUserList = () => async (dispatch, getState) => {
  try {
    const res = await userApi.getAll;
    dispatch(postUserListSuccess(res.data));
  } catch (error) {
    console.log(
      "🚀 ~ file: userSaga.js ~ line 11 ~ function*fetchUserList ~ error",
      error
    );
    dispatch(postUserListFailed(error.message));
    throw error;
  }
};

export const handleAddUser = (values, setOpen) => (dispatch, getState) => {
  dispatch(addUser(values));

  //   call api
  //   postNewUser(values);

  setTimeout(() => {
    // setSubmitting(false);
    dispatch(addUserSuccess());
    setOpen(false);
    Swal.fire("Added user successfully!", "", "success");
  }, 1500);
};
