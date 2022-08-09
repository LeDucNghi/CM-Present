import { Button } from "@mui/material";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { handleRestoreUser } from "utils";
import { selectUserList } from "features/user/userSlice";
import { useSelector } from "react-redux";

export default function RestoreUser({ row, selectedRow }) {
  const userList = useSelector(selectUserList);
  const mode = useSelector((state) => state.app.mode);
  const languages = useSelector((state) => state.app.language);

  const handleRestoreArgs = {
    row,
    selectedRow,
    list: userList,
  };

  return (
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
      onClick={() => handleRestoreUser(handleRestoreArgs)}
      disabled={selectedRow.length === 0}
    >
      {languages === "VN" ? `Khôi phục!` : `Restore!`}
    </Button>
  );
}
