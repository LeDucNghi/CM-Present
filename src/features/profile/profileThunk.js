import {
  fetchUserByIdFailed,
  fetchUserByIdSuccess,
  fetchingUser,
  setImage,
  updateUser,
  updateUserSuccess,
} from "./profileSlice";

import Swal from "sweetalert2";
import { userApi } from "api/userApi";

export const fetchUserById = (id) => async (dispatch, getState) => {
  console.log("🚀 ~ file: profileThunk.js ~ line 7 ~ fetchUserById ~ id", id);
  dispatch(fetchingUser());
  try {
    const res = await userApi.getUserById(id);
    console.log(
      "🚀 ~ file: profileThunk.js ~ line 18 ~ fetchUserById ~ res",
      res
    );

    dispatch(fetchUserByIdSuccess(res));
  } catch (error) {
    console.log("🚀 ~ file: profileThunk.js ~ line 11 ~ error", error);

    dispatch(fetchUserByIdFailed(error.response.statusText));
  }
};

export const handleUpdateUser = (id, values) => async (dispatch, getState) => {
  // updateUser({ ...values, id: id });
  dispatch(updateUser());

  try {
    const res = await userApi.updateUser({ ...values, id: id });
    console.log("🚀 ~ file: profileThunk.js ~ line 11 ~ res", res);

    setTimeout(() => {
      dispatch(updateUserSuccess());
      Swal.fire("Update user successfully!", "", "success");
    }, 2000);
  } catch (error) {
    console.log(
      "🚀 ~ file: profileThunk.js ~ line 31 ~ handleUpdateUser ~ error",
      error
    );
  }
};

export const onImageChange = (e) => (dispatch, getState) => {
  if (e.target.files && e.target.files[0]) {
    // const img = URL.createObjectURL(e.target.files[0]);

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      //   image = reader.result;
      //   setImage(image);
      //   setFieldValue("image", image);
      dispatch(setImage(reader.result));
    };
  }
};
