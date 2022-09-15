import { checkDiffElement, checkSameElement } from "./common";
import { deleteUser, removeToTrash } from "features/trash/trashSlice";

import Swal from "sweetalert2";
import { store } from "app/store";

export function handleDeleteUser({ row, selectedRow, isDenied }) {
  const mode = store.getState().drawer.mode;
  const languages = store.getState().drawer.language;
  const isSuccess = store.getState().user.success;
  const isError = store.getState().user.isError;

  const sameList = checkSameElement(row, selectedRow);
  const diffList = checkDiffElement(row, selectedRow);

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
  })
    .then((result) => {
      if (result.isConfirmed) {
        // if isDenied === true > remove to trash
        // else > delete permanently

        if (isDenied) {
          store.dispatch(
            removeToTrash({ row, selectedRow, sameList, diffList })
          );
        } else {
          store.dispatch(
            deleteUser({ row, selectedRow, sameList, diffList, isDenied })
          );
        }

        if (isSuccess) {
          Swal.fire({
            icon: "success",
            title: `${languages === `VN` ? `Đã xóa!` : `Deleted!`}`,
            text: isDenied
              ? `${
                  languages === `VN`
                    ? `Bạn có thể khôi phục ${
                        selectedRow.length === 1 ? "" : "những"
                      } người dùng ở thùng rác!`
                    : `You can restore ${
                        selectedRow.length === 1 ? `this` : `these`
                      } user${selectedRow.length === 1 ? `` : `s`} in trash`
                }`
              : ``,
          });
        }
      } else if (result.isDenied) {
        // delete permanently in user page

        store.dispatch(
          deleteUser({ row, selectedRow, sameList, diffList, isDenied })
        );
        if (isSuccess) {
          Swal.fire({
            icon: "success",
            title: `${languages === `VN` ? `Đã xóa!` : `Deleted!`}`,
          });
        }
      }
    })
    .catch((error) => {
      console.log("🚀 ~ file: trashThunk.js ~ line 210 ~ error", error);
      Swal.fire({
        icon: "error",
        title: `${error.message}`,
      });
    });
}
