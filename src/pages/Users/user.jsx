import * as React from "react";

import { selectLanguage, selectMode } from "features/drawer/drawerSlice";
import { useDispatch, useSelector } from "react-redux";

import AddUserForm from "features/user/components/AddUserForm";
import { Button } from "@mui/material";
import DataGrid from "components/Custom/CustomDataGrid";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { handleDeleteUser } from "utils";
import { selectDeletedList } from "features/trash/trashSlice";

// import { handleDeleteUser } from "features/trash/trashThunk";

export default function User() {
  const dispatch = useDispatch();
  const mode = useSelector(selectMode);
  const languages = useSelector(selectLanguage);
  const deletedUserList = useSelector(selectDeletedList);

  const [selectedRow, setSelectedRow] = React.useState([]);
  const [row, setRow] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleDeleteUserArgs = {
    row,
    selectedRow,
    list: deletedUserList,
    isDenied: true,
  };

  return (
    <div
      style={{
        height: 400,
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1em",
          position: "relative",
        }}
      >
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
          // onClick={() => dispatch(handleDeleteUser(handleDeleteUserArgs))}
          onClick={() => handleDeleteUser(handleDeleteUserArgs)}
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
      </div>

      <AddUserForm open={open} setOpen={setOpen} />

      <DataGrid row={row} setRow={setRow} setSelectedRow={setSelectedRow} />
    </div>
  );
}
