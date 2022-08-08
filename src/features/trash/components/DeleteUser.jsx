import { postDeletedList, restoreUser } from "features/slice";
import {
  useDeleteUserFromTrashMutation,
  usePostNewUserMutation,
} from "services/userServices";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import Swal from "sweetalert2";
import { selectUserList } from "features/user/userSlice";
import { trashActions } from "../trashSlice";

export default function DeleteUser({ row, setRow, selectedRow }) {
  console.log("🚀 ~ file: DeleteUser.jsx ~ line 15 ~ DeleteUser ~ row", row);

  const dispatch = useDispatch();
  const deletedUserListStorage = useSelector(
    (state) => state.app.deletedUserList
  );
  const mode = useSelector((state) => state.app.mode);
  const languages = useSelector((state) => state.app.language);
  const userList = useSelector(selectUserList);

  const [deleteUserPermanently] = useDeleteUserFromTrashMutation();
  const [postNewUser] = usePostNewUserMutation();
  const checkDiffElement = row.filter(
    (x) => !selectedRow.some((x1) => x.id === x1.id)
  );

  const checkSameElement = row.filter((x) =>
    selectedRow.some((x1) => x.id === x1.id)
  );

  const handleRestoreUser = () => {
    dispatch(
      trashActions.restoreUser({
        row,
        selectedRow,
        list: userList,
      })
    );
    // const lastIndex = userListStorage[userListStorage.length - 1].id;

    // Swal.fire({
    //   title: `${
    //     languages === "VN"
    //       ? `Bạn có chắc chắn muốn khôi phục ${
    //           selectedRow.length === 1 ? "" : selectedRow.length
    //         } người dùng này không ?`
    //       : `Are you sure you want to restore ${
    //           selectedRow.length === 1 ? `this` : `these`
    //         }  ${selectedRow.length === 1 ? "" : selectedRow.length} user${
    //           selectedRow.length === 1 ? `` : `s`
    //         }?`
    //   }`,
    //   text: "",
    //   icon: "warning",
    //   showCancelButton: true,

    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",

    //   confirmButtonText: `${
    //     languages === "VN" ? `Có, hãy khôi phục!` : `Yes, restore it!`
    //   }`,
    //   cancelButtonText: `${languages === "VN" ? `Hủy` : `Cancel`}`,

    //   background: `${mode === "dark" ? "#121212" : ""}`,
    //   color: `${mode === "dark" ? "#fff" : ""}`,
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     checkSameElement.forEach((el) => {
    //       const { id, ...rest } = el;
    //       deleteUserPermanently(el.id);
    //       postNewUser({ ...rest });
    //       dispatch(restoreUser({ ...rest }));
    //     });

    //     dispatch(postDeletedList(checkDiffElement));
    //     setRow(deletedUserListStorage);

    //     Swal.fire(
    //       `${languages === "VN" ? `Đã khôi phục!` : `Restored!`}`,
    //       "",
    //       "success"
    //     );
    //   }
    // });
  };

  const handleDeleteUser = () => {
    dispatch(
      trashActions.deleteUser({
        row,
        selectedRow,
        list: deletedUserListStorage,
      })
    );

    // Swal.fire({
    //   title: `${
    //     languages === "VN"
    //       ? `Bạn có chắc chắn muốn xóa ${
    //           selectedRow.length === 1 ? "" : selectedRow.length
    //         } người dùng này vĩnh viễn không?`
    //       : `Are you sure you want to delete ${
    //           selectedRow.length === 1 ? `this` : `these`
    //         } ${selectedRow.length === 1 ? "" : selectedRow.length} user${
    //           selectedRow.length === 1 ? `` : `s`
    //         } permanently ?`
    //   }`,
    //   text: "",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: `${
    //     languages === "VN"
    //       ? `Có, hãy xóa vĩnh viễn`
    //       : `Yes, delete it permanently!`
    //   }`,
    //   cancelButtonText: `${languages === "VN" ? `Hủy` : `Cancel`}`,

    //   background: `${mode === "dark" ? "#121212" : ""}`,
    //   color: `${mode === "dark" ? "#fff" : ""}`,
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     checkSameElement.forEach((item) => {
    //       deleteUserPermanently(item.id);
    //     });
    //     dispatch(postDeletedList(checkDiffElement));
    //     setRow(deletedUserListStorage);
    //     Swal.fire(
    //       `${languages === `VN` ? `Đã xóa!` : `Deleted!`}`,
    //       "",
    //       "success"
    //     );
    //   }
    // });
  };

  return (
    <>
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
    </>
  );
}
