import { deleteUser, postUserList } from "features/slice";
import { useDispatch, useSelector } from "react-redux";
import {
  useDeleteUserFromListMutation,
  usePostDeletedUserMutation,
} from "services/userServices";

import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

export default function AddUserButton({ row, setRow, setOpen, selectedRow }) {
  const dispatch = useDispatch();

  const userListStorage = useSelector((state) => state.app.userList);
  const mode = useSelector((state) => state.app.mode);
  const languages = useSelector((state) => state.app.language);

  const [deleteUserFromList] = useDeleteUserFromListMutation();
  const [postDeletedUser] = usePostDeletedUserMutation();

  const checkDiffElement = row.filter(
    (x) => !selectedRow.some((x1) => x.id === x1.id)
  );

  const checkSameElement = row.filter((x) =>
    selectedRow.some((x1) => x.id === x1.id)
  );

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
      showDenyButton: true,
      showCancelButton: true,

      confirmButtonText: `${
        languages === "VN"
          ? `Chỉ cần chuyển vào thùng rác!`
          : `Just move to the trash!`
      }`,
      denyButtonText: `${
        languages === "VN" ? `Xóa vĩnh viễn!` : `Delete it permanently!`
      }`,
      cancelButtonText: `${languages === "VN" ? `Hủy` : `Cancel`}`,

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
          `${languages === `VN` ? `Đã xóa!` : `Deleted!`}`,
          `${
            languages === `VN`
              ? `Bạn có thể khôi phục ${
                  selectedRow.length === 1 ? `` : `những`
                } người dùng này ở thùng rác`
              : `You can restore this user from trash!`
          }`,
          "success"
        );
      } else if (result.isDenied) {
        checkSameElement.forEach((el) => {
          // const { id, ...rest } = el;
          // dispatch(deleteUser({ ...rest }));

          deleteUserFromList(el.id);
        });
        dispatch(postUserList(checkDiffElement));
        setRow(userListStorage);

        Swal.fire(
          `${languages === "VN" ? `Đã xóa!` : `Deleted!`}`,
          "",
          "success"
        );
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
          ":disabled": {
            background: mode === "dark" ? "rgba(255, 255, 255, 0.3)" : "",
            cursor: "not-allowed",
          },
        }}
        onClick={() => setOpen(true)}
        disabled={selectedRow.length > 0}
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
