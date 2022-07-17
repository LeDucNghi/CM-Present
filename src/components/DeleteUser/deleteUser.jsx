import { postDeletedList, postUserInfo, restoreUser } from "features/slice";
import {
  useDeleteUserPermanentlyMutation,
  usePostNewUserMutation,
} from "services/userServices";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import Swal from "sweetalert2";

export default function DeleteUser({ row, setRow, selectedRow }) {
  const dispatch = useDispatch();
  const deletedUserListStorage = useSelector(
    (state) => state.app.deletedUserList
  );
  const mode = useSelector((state) => state.app.mode);
  const languages = useSelector((state) => state.app.language);

  const [deleteUserPermanently] = useDeleteUserPermanentlyMutation();
  const [postNewUser] = usePostNewUserMutation();
  const checkDiffElement = row.filter(
    (x) => !selectedRow.some((x1) => x.id === x1.id)
  );

  const checkSameElement = row.filter((x) =>
    selectedRow.some((x1) => x.id === x1.id)
  );

  const handleRestoreUser = () => {
    // const lastIndex = userListStorage[userListStorage.length - 1].id;

    Swal.fire({
      title: `Are you sure you want to restore ${
        selectedRow.length === 1 ? `this` : `these`
      }  ${selectedRow.length === 1 ? "" : selectedRow.length} user${
        selectedRow.length === 1 ? `` : `s`
      }?`,
      text: "",
      icon: "warning",
      showCancelButton: true,

      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",

      confirmButtonText: `${
        languages === "VN" ? `Có, khôi phục chúng!` : `Yes, restore it!`
      }`,

      background: `${mode === "dark" ? "#121212" : ""}`,
      color: `${mode === "dark" ? "#fff" : ""}`,
    }).then((result) => {
      if (result.isConfirmed) {
        checkSameElement.forEach((el) => {
          const { id, ...rest } = el;
          deleteUserPermanently(el.id);
          postNewUser({ ...rest });
          dispatch(restoreUser({ ...rest }));
        });

        dispatch(postDeletedList(checkDiffElement));
        setRow(deletedUserListStorage);

        Swal.fire(
          `${languages === "VN" ? `Đã khôi phục!` : `Restored!`}`,
          "",
          "success"
        );
      }
    });
  };

  const handleDeleteUser = () => {
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
      background: `${mode === "dark" ? "#121212" : ""}`,
      color: `${mode === "dark" ? "#fff" : ""}`,
    }).then((result) => {
      if (result.isConfirmed) {
        checkSameElement.forEach((item) => {
          deleteUserPermanently(item.id);
        });
        dispatch(postDeletedList(checkDiffElement));
        setRow(deletedUserListStorage);
        Swal.fire(
          `${languages === `VN` ? `Đã xóa!` : `Deleted!`}`,
          "",
          "success"
        );
      }
    });
  };

  return (
    <div>
      <Button
        startIcon={<RestoreFromTrashIcon />}
        variant="contained"
        color="success"
        sx={{
          fontWeight: 600,
          marginRight: "1em",
          ":disabled": {
            background: mode === "dark" ? "rgba(255, 255, 255, 0.3)" : "",
            cursor: "not-allowed",
          },
        }}
        onClick={() => handleRestoreUser()}
        disabled={selectedRow.length === 0}
      >
        {languages === "VN" ? `Khôi phục!` : `Restore!`}
      </Button>
      <Button
        startIcon={<DeleteIcon />}
        onClick={() => handleDeleteUser()}
        variant="contained"
        color="error"
        disabled={selectedRow.length === 0}
        sx={{
          ":disabled": {
            background: mode === "dark" ? "rgba(255, 255, 255, 0.3)" : "",
            cursor: "not-allowed",
          },
        }}
      >
        {languages === "VN" ? `Xóa` : `Delete`}
      </Button>
    </div>
  );
}
