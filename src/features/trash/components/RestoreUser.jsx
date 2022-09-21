import { selectLanguage, selectMode } from "features/drawer/drawerSlice";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@mui/material";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import Swal from "sweetalert2";
import { restoreUser } from "../trashSlice";
import { successPopup } from "utils";

export default function RestoreUser({ row, selectedRow }) {
  const dispatch = useDispatch();
  const mode = useSelector(selectMode);
  const languages = useSelector(selectLanguage);

  const handleRestoreUser = () => {
    Swal.fire({
      title: `${
        languages === "VN"
          ? `Bạn có chắc chắn muốn khôi phục ${
              selectedRow.length === 1 ? "" : selectedRow.length
            } người dùng này không ?`
          : `Are you sure you want to restore ${
              selectedRow.length === 1 ? `this` : `these`
            }  ${selectedRow.length === 1 ? "" : selectedRow.length} user${
              selectedRow.length === 1 ? `` : `s`
            }?`
      }`,
      text: "",
      icon: "warning",

      showCancelButton: true,
      showLoaderOnConfirm: true,

      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",

      confirmButtonText: `${
        languages === "VN" ? `Có, hãy khôi phục!` : `Yes, restore it!`
      }`,
      cancelButtonText: `${languages === "VN" ? `Hủy` : `Cancel`}`,

      background: `${mode === "dark" ? "#121212" : ""}`,
      color: `${mode === "dark" ? "#fff" : ""}`,

      preConfirm: () => {
        dispatch(restoreUser({ row, selectedRow }));
      },
    }).then((result) => {
      if (result.isConfirmed) {
        successPopup(`Đã khôi phục!`, `Restored!`);
      }
    });
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
      onClick={() => handleRestoreUser()}
      disabled={selectedRow.length === 0}
    >
      {languages === "VN" ? `Khôi phục!` : `Restore!`}
    </Button>
  );
}
