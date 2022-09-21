import { deleteUser, removeToTrash } from "features/trash/trashSlice";

import Swal from "sweetalert2";
import { store } from "app/store";
import { successPopup } from "./common";

export function handleDeleteUser({ row, selectedRow, isDenied }) {
  const mode = store.getState().drawer.mode;
  const languages = store.getState().drawer.language;

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
    showLoaderOnDeny: true,
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

    preConfirm: () => {
      if (isDenied) return store.dispatch(removeToTrash({ row, selectedRow }));
      else return store.dispatch(deleteUser({ row, selectedRow, isDenied }));
    },
    preDeny: () => {
      return store.dispatch(deleteUser({ row, selectedRow, isDenied }));
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      successPopup(`Đã xóa!`, `Deleted!`);
    } else if (result.isDenied) {
      successPopup(`Đã xóa!`, `Deleted!`);
    }
  });
}
