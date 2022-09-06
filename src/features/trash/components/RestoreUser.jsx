import { selectLanguage, selectMode } from "features/drawer/drawerSlice";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@mui/material";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { handleRestoreUser } from "../trashThunk";

export default function RestoreUser({ row, selectedRow }) {
  const dispatch = useDispatch();
  const mode = useSelector(selectMode);
  const languages = useSelector(selectLanguage);

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
      onClick={() => dispatch(handleRestoreUser({ row, selectedRow }))}
      disabled={selectedRow.length === 0}
    >
      {languages === "VN" ? `Khôi phục!` : `Restore!`}
    </Button>
  );
}
