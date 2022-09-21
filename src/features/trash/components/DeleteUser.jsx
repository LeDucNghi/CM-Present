import { selectLanguage, selectMode } from "features/drawer/drawerSlice";

import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { handleDeleteUser } from "utils";
import { useSelector } from "react-redux";

export default function DeleteUser({ row, selectedRow }) {
  const mode = useSelector(selectMode);
  const languages = useSelector(selectLanguage);

  return (
    <>
      <Button
        startIcon={<DeleteIcon />}
        onClick={() =>
          handleDeleteUser({
            row,
            selectedRow,
            isDenied: false,
          })
        }
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
