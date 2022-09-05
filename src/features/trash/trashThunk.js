import {
  deleteFromUserList,
  postUserListSuccess,
} from "features/user/userSlice";
import {
  deleteUser,
  postDeletedListSuccess,
  restoreUser,
} from "features/trash/trashSlice";

import Swal from "sweetalert2";
import axios from "axios";

// import { trashBaseApi, userBaseApi } from "constants";




export const fetchTrashList = () => async (dispatch, getState) => {
  const teamName = getState().trash.tabs;
  try {
    const res = await axios.get(`http://localhost:3005/trash`);
    dispatch(postDeletedListSuccess(res.data));
  } catch (error) {
    console.log("🚀 ~ file: trashThunk.js ~ line 20 ~ error", error);
  }
};

export const handleRestoreUser =
  ({ row, selectedRow, list }) =>
  (dispatch, getState) => {
    const mode = getState().drawer.mode;
    const languages = getState().drawer.language;

    Swal.fire({
      title: `${
        languages === "VN"
          ? `Bạn có chắc chắn muốn khôi phục ${
              selectedRow.length === 1 ? "" : selectedRow.length
            } người dùng này không ?`
          : `Are you sure you want to restore ${
              selectedRow.length === 1 ? `this` : `these`
            }  ${selectedRow.length === 1 ? "" : selectedRow.length} user${
              selectedRow.length === 1 ? `` : `s`
            }?`
      }`,
      text: "",
      icon: "warning",
      showCancelButton: true,

      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",

      confirmButtonText: `${
        languages === "VN" ? `Có, hãy khôi phục!` : `Yes, restore it!`
      }`,
      cancelButtonText: `${languages === "VN" ? `Hủy` : `Cancel`}`,

      background: `${mode === "dark" ? "#121212" : ""}`,
      color: `${mode === "dark" ? "#fff" : ""}`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          restoreUser({
            row,
            selectedRow,
            list,
          })
        );

        Swal.fire(
          `${languages === "VN" ? `Đã khôi phục!` : `Restored!`}`,
          "",
          "success"
        );
      }
    });
  };

export const handleDeleteUser =
  ({ row, selectedRow, list, isDenied }) =>
  (dispatch, getState) => {
    const languages = getState().drawer.language;
    const mode = getState().drawer.mode;
    // const success = getState().user.success;
    const deletedList = getState().trash.deletedUserList;

    const checkDiffElement = row.filter(
      (x) => !selectedRow.some((x1) => x.id === x1.id)
    );

    const checkSameElement = row.filter((x) =>
      selectedRow.some((x1) => x.id === x1.id)
    );

    Swal.fire({
      title: `${
        languages === "VN"
          ? `Bạn có chắc chắn muốn xóa ${
              selectedRow.length === 1 ? "" : selectedRow.length
            } người dùng này vĩnh viễn không?`
          : `Are you sure you want to delete ${
              selectedRow.length === 1 ? `this` : `these`
            } ${selectedRow.length === 1 ? "" : selectedRow.length} user${
              selectedRow.length === 1 ? `` : `s`
            } permanently ?`
      }`,
      text: "",
      icon: "warning",
      showCancelButton: true,
      showDenyButton: isDenied,

      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",

      denyButtonText: `${
        languages === "VN" ? `Xóa vĩnh viễn!` : `Delete it permanently!`
      }`,
      confirmButtonText: isDenied
        ? `${
            languages === "VN"
              ? `Chỉ cần chuyển vào thùng rác!`
              : `Just move to the trash!`
          }`
        : `${
            languages === "VN"
              ? `Có, hãy xóa vĩnh viễn`
              : `Yes, delete it permanently!`
          }`,
      cancelButtonText: `${languages === "VN" ? `Hủy` : `Cancel`}`,

      background: `${mode === "dark" ? "#121212" : ""}`,
      color: `${mode === "dark" ? "#fff" : ""}`,
    }).then((result) => {
      if (result.isConfirmed) {
        // move to trash in user page
        // delete permanently in trash page

        if (isDenied) {
          const newDeletedList = [...deletedList];
          checkSameElement.forEach((element) => {
            const { id, ...rest } = element;
            // if in user page
            // use user api to delete by id
            // then post new user's info to trash list

            // if in trash page
            // use trash api to delete user permanently by id like normal

            // axios.post(`${trashBaseApi}`, { ...rest });
            // axios.delete(`${userBaseApi}/${id}`);

            newDeletedList.push({
              ...rest,
              id: newDeletedList.length + 1,
            });
          });
          dispatch(postDeletedListSuccess(newDeletedList));
          dispatch(postUserListSuccess(checkDiffElement));
        }

        Swal.fire(
          `${languages === `VN` ? `Đã xóa!` : `Deleted!`}`,
          "",
          "success"
        );
      } else if (result.isDenied) {
        // delete permanently in user page

        checkSameElement.forEach((element) => {
          const { id, ...rest } = element;
          //   const res = axios.post(`${userBaseApi}/${id}`);
          //   console.log(
          //     "🚀 ~ file: trashThunk.js ~ line 144 ~ checkSameElement.forEach ~ res",
          //     res
          //   );
        });
        dispatch(postUserListSuccess(checkDiffElement));
        // dispatch(
        //   deleteFromUserList({
        //     row,
        //     selectedRow,
        //   })
        // );

        // if (success) {
        //   Swal.fire(
        //     `${languages === "VN" ? `Đã xóa!` : `Deleted!`}`,
        //     "",
        //     "success"
        //   );
        // }
      }
    });
  };
