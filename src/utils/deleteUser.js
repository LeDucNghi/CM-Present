import { deleteUser, removeToTrash } from "features/trash/trashSlice";

import Swal from "sweetalert2";
import { store } from "app/store";
import { successPopup } from "./common";

export function handleDeleteUser({ row, selectedRow, isDenied }) {
  const mode = store.getState().drawer.mode;
  const languages = store.getState().drawer.language;
  const userList = store.getState().user.userList;
  const isSuccess = store.getState().user.success;

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

    showLoaderOnConfirm: true,
    showCancelButton: true,
    showLoaderOnDeny: true,
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

    preConfirm: () => {
      return store.dispatch(removeToTrash({ row, selectedRow, isDenied }));
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      // if isDenied === true > remove to trash
      // else > delete permanently

      console.log("result", result);

      // if (isDenied) {
      //   // user page > remove to trash
      //   store.dispatch(removeToTrash({ row, selectedRow, isDenied }));
      // } else {
      //   // trash page > delete permanently
      //   store.dispatch(deleteUser({ row, selectedRow, isDenied }));
      // }
    } else if (result.isDenied) {
      // delete permanently in user page

      store.dispatch(deleteUser({ row, selectedRow, isDenied }));
    }
  });
}
