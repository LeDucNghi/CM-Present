import { postDeletedList, postUserInfo, restoreUser } from "features/slice";
import {
  useDeleteUserPermanentlyMutation,
  usePostNewUserMutation,
} from "services/userServices";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Loading } from "components/Loading";
import React from "react";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import Swal from "sweetalert2";
import { columns } from "constants/global";

function Trash({ mode, languages, deletedUserLoading }) {
  const dispatch = useDispatch();
  const deletedUserListStorage = useSelector(
    (state) => state.app.deletedUserList
  );

  const [deleteUserPermanently] = useDeleteUserPermanentlyMutation();
  const [postNewUser] = usePostNewUserMutation();

  const [selectedRow, setSelectedRow] = React.useState([]);
  const [row, setRow] = React.useState([]);

  React.useEffect(() => {
    if (deletedUserListStorage && deletedUserListStorage.length !== 0) {
      setRow(deletedUserListStorage);
    }
  }, [deletedUserListStorage, row]);

  const checkDiffElement = row.filter(
    (x) => !selectedRow.some((x1) => x.id === x1.id)
  );

  const checkSameElement = row.filter((x) =>
    selectedRow.some((x1) => x.id === x1.id)
  );

  const handleRestoreUser = () => {
    // const lastIndex = userListStorage[userListStorage.length - 1].id;

    Swal.fire({
      title: `Are you sure to restore this ${
        selectedRow.length === 1 ? "" : selectedRow.length
      } user?`,
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, restore it!",
    }).then((result) => {
      if (result.isConfirmed) {
        checkSameElement.forEach((el) => {
          const { id, ...rest } = el;
          deleteUserPermanently(el.id);
          postNewUser({ ...rest });
          dispatch(restoreUser({ ...rest }));
        });

        dispatch(postDeletedList(checkDiffElement));
        setRow(deletedUserListStorage);

        Swal.fire("Restored!", "", "success");
      }
    });
  };

  const handleDeleteUser = () => {
    Swal.fire({
      title: `Are you sure to delete this ${
        selectedRow.length === 1 ? "" : selectedRow.length
      } user permanently?`,
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it permanently!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(postUserInfo(checkSameElement));
        checkSameElement.forEach((item) => {
          deleteUserPermanently(item.id);
        });
        setRow(deletedUserListStorage);
        Swal.fire("Deleted!", "", "success");
      }
    });
  };

  const onSelectionModelChange = (id) => {
    const selectedIDs = new Set(id);
    const selectedRowData = row.filter((row1) => selectedIDs.has(row1.id));
    setSelectedRow(selectedRowData);
    console.log("selectedRowData trash", selectedRowData);
  };

  if (deletedUserLoading) return <Loading />;
  else
    return (
      <div style={{ height: 400, width: "100%" }}>
        <div
          style={{
            width: "auto",
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "1em",
            // background: "#000",
          }}
        >
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
            Restore
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
            Delete
          </Button>
        </div>
        <DataGrid
          getRowId={(row) => row.id}
          onSelectionModelChange={(id) => onSelectionModelChange(id)}
          rows={row}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          sx={{ color: mode === "dark" ? "#fff" : "rgba(0, 0, 0, 0.87)" }}
        />
      </div>
    );
}

export default Trash;
