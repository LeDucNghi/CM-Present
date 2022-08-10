import { selectLanguage, selectMode } from "features/drawer/drawerSlice";

import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { handleDeleteUser } from "utils";
import { selectUserList } from "features/user/userSlice";
import { useSelector } from "react-redux";

export default function DeleteUser({ row, selectedRow }) {
  const mode = useSelector(selectMode);
  const languages = useSelector(selectLanguage);
  const userList = useSelector(selectUserList);

  const handleDeleteArgs = {
    row,
    selectedRow,
    list: userList,
  };

  return (
    <>
      <Button
        startIcon={<DeleteIcon />}
        onClick={() => handleDeleteUser(handleDeleteArgs)}
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
