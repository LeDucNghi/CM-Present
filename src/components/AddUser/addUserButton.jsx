import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Button } from "@mui/material";
import {
  useDeleteUserFromListMutation,
  //   useDeleteUserPermanentlyMutation,
  usePostDeletedUserMutation,
} from "services/userServices";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, postUserList } from "features/slice";
import Swal from "sweetalert2";

export default function AddUserButton({
  mode,
  languages,
  row,
  setRow,
  setOpen,
  selectedRow,
}) {
  const dispatch = useDispatch();
  const userListStorage = useSelector((state) => state.app.userList);

  const [deleteUserFromList] = useDeleteUserFromListMutation();
  const [postDeletedUser] = usePostDeletedUserMutation();
  //   const [deleteUserPermanently, responseInfo] =
  //     useDeleteUserPermanentlyMutation();

  const checkDiffElement = row.filter(
    (x) => !selectedRow.some((x1) => x.id === x1.id)
  );

  const checkSameElement = row.filter((x) =>
    selectedRow.some((x1) => x.id === x1.id)
  );

  const handleDeleteUser = () => {
    Swal.fire({
      title: `Are you sure to delete this ${
        selectedRow.length === 1 ? "" : selectedRow.length
      } user ?`,
      showDenyButton: true,
      showCancelButton: true,

      confirmButtonText: "Just remove to trash!",
      denyButtonText: `Delete it permanently!`,

      // confirmButtonColor : `${mode === "dark" ?  : }`,
      // denyButtonColor : `${mode === "dark" ?  : }`,
      background: `${mode === "dark" ? "#121212" : ""}`,
      color: `${mode === "dark" ? "#fff" : ""}`,
    }).then((result) => {
      if (result.isConfirmed) {
        checkSameElement.forEach((item) => {
          const { id, ...rest } = item;

          deleteUserFromList(id);
          postDeletedUser({ ...rest });

          dispatch(deleteUser({ ...rest }));
        });

        dispatch(postUserList(checkDiffElement));
        setRow(userListStorage);

        Swal.fire(
          "Deleted!",
          "You can restore this user from trash!",
          "success"
        );
      } else if (result.isDenied) {
        checkSameElement.forEach((el) => {
          const { id, ...rest } = el;

          deleteUserFromList(id);
          dispatch(deleteUser({ ...rest }));
        });
        dispatch(postUserList(checkDiffElement));
        setRow(userListStorage);

        Swal.fire("Deleted!", "", "success");
      }
    });
  };

  return (
    <>
      <Button
        startIcon={<PersonAddIcon />}
        variant="contained"
        color="success"
        sx={{
          fontWeight: 600,
          marginRight: "1em",
        }}
        onClick={() => setOpen(true)}
      >
        {languages === "VN" ? "Thêm" : "Add"}
      </Button>
      <Button
        startIcon={<DeleteIcon />}
        onClick={() => handleDeleteUser()}
        variant="contained"
        color="error"
        sx={{
          fontWeight: 600,
          ":disabled": {
            background: mode === "dark" ? "rgba(255, 255, 255, 0.3)" : "",
            cursor: "not-allowed",
          },
        }}
        disabled={selectedRow.length === 0}
      >
        {languages === "VN" ? "Xóa" : "Delete"}
      </Button>
    </>
  );
}
