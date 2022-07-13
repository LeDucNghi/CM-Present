import React from "react";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { postDeletedList, postUserInfo, restoreUser } from "features/slice";
import {
  useDeleteUserPermanentlyMutation,
  usePostNewUserMutation,
} from "services/userServices";
import { useDispatch, useSelector } from "react-redux";

export default function DeleteUser({ row, setRow, selectedRow }) {
  const dispatch = useDispatch();
  const deletedUserListStorage = useSelector(
    (state) => state.app.deletedUserList
  );
  const mode = useSelector((state) => state.app.mode);

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
      title: `Are you sure to restore this ${
        selectedRow.length === 1 ? "" : selectedRow.length
      } user?`,
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, restore it!",
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

        Swal.fire("Restored!", "", "success");
      }
    });
  };

  const handleDeleteUser = () => {
    Swal.fire({
      title: `Are you sure to delete this ${
        selectedRow.length === 1 ? "" : selectedRow.length
      } user permanently?`,
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it permanently!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(postUserInfo(checkSameElement));
        checkSameElement.forEach((item) => {
          deleteUserPermanently(item.id);
        });
        setRow(deletedUserListStorage);
        Swal.fire("Deleted!", "", "success");
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
        Restore
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
        Delete
      </Button>
    </div>
  );
}
