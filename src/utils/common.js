import { deleteUser, restoreUser } from "features/trash/trashSlice";

import Swal from "sweetalert2";
import { store } from "app/store";

export const handleRestoreUser = ({ row, selectedRow, list }) => {
  const mode = store.getState().drawer.mode;
  const languages = store.getState().drawer.language;

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
      store.dispatch(
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

export const handleDeleteUser = ({ row, selectedRow, list }) => {
  const languages = store.getState().drawer.language;
  const mode = store.getState().drawer.mode;

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
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: `${
      languages === "VN"
        ? `Có, hãy xóa vĩnh viễn`
        : `Yes, delete it permanently!`
    }`,
    cancelButtonText: `${languages === "VN" ? `Hủy` : `Cancel`}`,

    background: `${mode === "dark" ? "#121212" : ""}`,
    color: `${mode === "dark" ? "#fff" : ""}`,
  }).then((result) => {
    if (result.isConfirmed) {
      store.dispatch(
        deleteUser({
          row,
          selectedRow,
          list,
        })
      );
    }
    Swal.fire(`${languages === `VN` ? `Đã xóa!` : `Deleted!`}`, "", "success");
  });
};
