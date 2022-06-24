import * as React from "react";

import { postDeletedList, postUserList } from "features/slice";
import {
  useDeleteUserFromListMutation,
  usePostDeletedUserMutation,
} from "services/userServices";
import { useDispatch, useSelector } from "react-redux";

import AddUser from "components/AddUser/addUser";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Loading } from "components/Loading";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Swal from "sweetalert2";
import { columns } from "constants/global";

export default function User({ mode, allUserLoading, allUserError }) {
  const dispatch = useDispatch();
  const userListStorage = useSelector((state) => state.app.userList);
  const deletedUserListStorage = useSelector(
    (state) => state.app.deletedUserList
  );
  const [deleteUserFromList] = useDeleteUserFromListMutation();
  const [postDeletedUser] = usePostDeletedUserMutation();

  const [selectedRow, setSelectedRow] = React.useState([]);
  const [row, setRow] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    console.log(
      "🚀 ~ file: user.jsx ~ line 27 ~ User ~ userListStorage",
      userListStorage
    );
    if (userListStorage && userListStorage.length !== 0)
      setRow(userListStorage);
  }, [userListStorage]);

  const handleDeleteUser = () => {
    const checkDiffElement = row.filter(
      (x) => !selectedRow.some((x1) => x.id === x1.id)
    );

    const checkSameElement = row.filter((x) =>
      selectedRow.some((x1) => x.id === x1.id)
    );

    Swal.fire({
      title: `Are you sure to delete this ${
        selectedRow.length === 1 ? "" : selectedRow.length
      } user ?`,
      text: "",
      icon: "warning",
      showCancelButton: true,
      // showDenyButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      // denyButtonText: `Delete it permanently`,
    }).then((result) => {
      if (result.isConfirmed) {
        checkSameElement.forEach((item) => {
          const { id, ...rest } = item;

          deleteUserFromList(id);
          postDeletedUser({ ...rest });
          const newDeletedUserList = [...deletedUserListStorage];
          const lastIndex =
            newDeletedUserList[newDeletedUserList.length - 1].id;
          console.log(
            "🚀 ~ file: user.jsx ~ line 117 ~ checkSameElement.forEach ~ lastIndex",
            lastIndex
          );
          newDeletedUserList.push({
            ...rest,
            id: lastIndex + 1,
          });
          dispatch(postDeletedList(newDeletedUserList));
        });

        dispatch(postUserList(checkDiffElement));
        setRow(userListStorage);

        Swal.fire(
          "Deleted!",
          "You can restore this user from trash!",
          "success"
        );
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
          // background: mode === "light" ? "#ccc" : "#121212",
        }}
      >
        <div
          style={{
            width: "auto",
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "1em",
            // color: mode === "dark" ? "#fff" : "#ccc",
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
              // cursor: "not-allowed",
              // color: mode === "dark" ? "#fff" : "rgba(0, 0, 0, 0.87)",
              // background :,
            }}
            onClick={() => handleAddUser()}
          >
            Add
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteUser()}
            variant="contained"
            color="error"
            sx={{
              fontWeight: 600,
              // cursor: "not-allowed",
              // color: mode === "dark" ? "rgba(255, 255, 255, 0.5)" : "",
              // background: mode === "dark" ? "rgba(255, 255, 255, 0.3)" : "",
            }}
            disabled={selectedRow.length === 0}
            className={mode === "dark" ? "darkmode" : "lightmode"}
          >
            Delete
          </Button>
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
