import { addUser, addUserSuccess } from "./userSlice";

import Swal from "sweetalert2";

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
