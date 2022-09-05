import { selectLanguage, selectMode } from "features/drawer/drawerSlice";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { handleDeleteUser } from "../trashThunk";
import { selectDeletedList } from "../trashSlice";
import { selectUserList } from "features/user/userSlice";

export default function DeleteUser({ row, selectedRow }) {
  const dispatch = useDispatch();
  const mode = useSelector(selectMode);
  const languages = useSelector(selectLanguage);
  const userList = useSelector(selectUserList);
  const deletedUserList = useSelector(selectDeletedList);

  const handleDeleteArgs = {
    row,
    selectedRow,
    list: deletedUserList,
    isDenied: false,
  };

  return (
    <>
      <Button
        startIcon={<DeleteIcon />}
        onClick={() => dispatch(handleDeleteUser(handleDeleteArgs))}
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
