import * as React from "react";

import { deleteUser, postUserList } from "features/slice";
import {
  useDeleteUserFromListMutation,
  useGetUserTeamQuery,
  usePostDeletedUserMutation,
} from "services/userServices";
import { useDispatch, useSelector } from "react-redux";

import AddUser from "components/AddUser/addUser";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Loading } from "components/Loading";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SelectAutoWidth from "components/ProjectFilter/projectFilter";
import Swal from "sweetalert2";
import { columns } from "constants/global";

export default function Projects({
  mode,
  allUserLoading,
  allUserError,
  languages,
}) {
  const dispatch = useDispatch();

  const userListStorage = useSelector((state) => state.app.userList);

  const [deleteUserFromList] = useDeleteUserFromListMutation();
  const [postDeletedUser] = usePostDeletedUserMutation();

  const [selectedRow, setSelectedRow] = React.useState([]);
  const [row, setRow] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (userListStorage && userListStorage.length !== 0)
      setRow(userListStorage);
  }, [userListStorage]);

  const checkDiffElement = row.filter(
    (x) => !selectedRow.some((x1) => x.id === x1.id)
  );

  const checkSameElement = row.filter((x) =>
    selectedRow.some((x1) => x.id === x1.id)
  );

  const handleDeleteUser = () => {
    Swal.fire({
      title: `Are you sure to delete this ${
        selectedRow.length === 1 ? "" : selectedRow.length
      } user ?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Just remove to trash!",
      denyButtonText: `Delete it permanently!`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
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
          "Deleted!",
          "You can restore this user from trash!",
          "success"
        );
      } else if (result.isDenied) {
        checkSameElement.forEach((el) => {
          const { id, ...rest } = el;

          deleteUserFromList(id);
          dispatch(deleteUser({ ...rest }));
        });
        dispatch(postUserList(checkDiffElement));
        setRow(userListStorage);

        Swal.fire("Deleted!", "", "success");
      }
    });
  };

  const handleAddUser = () => {
    setOpen(true);
  };

  const onSelectionModelChange = (id) => {
    const selectedIDs = new Set(id);
    const selectedRowData = row.filter((row1) => selectedIDs.has(row1.id));
    setSelectedRow(selectedRowData);
    console.log(selectedRowData);
  };

  if (allUserLoading) return <Loading />;
  if (allUserError) return console.log(allUserError);
  else
    return (
      <div
        style={{
          height: 400,
          width: "100%",
        }}
      >
        <div
          style={{
            width: "auto",
            height: "3rem",
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "1em",
            // background: "#000",
          }}
        >
          <Button
            startIcon={<PersonAddIcon />}
            variant="contained"
            color="success"
            sx={{
              fontWeight: 600,
              marginRight: "1em",
            }}
            onClick={() => handleAddUser()}
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
          <SelectAutoWidth />
        </div>

        <AddUser open={open} setOpen={setOpen} />

        <DataGrid
          sx={{ color: mode === "dark" ? "#fff" : "rgba(0, 0, 0, 0.87)" }}
          onSelectionModelChange={(id) => onSelectionModelChange(id)}
          rows={row}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    );
}
