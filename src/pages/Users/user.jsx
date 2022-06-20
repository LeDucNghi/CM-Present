import * as React from "react";

import { columns, rows } from "constants/global";
import {
  useDeleteUserFromListMutation,
  useGetAllUserQuery,
  usePostDeletedUserMutation,
} from "services/user";

import AddUser from "components/AddUser/addUser";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Loading } from "components/Loading";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function User() {
  const userStorage = useSelector((state) => state.app.userInfo);
  const { pathname } = useLocation();
  const { data, error, isLoading, isSuccess } = useGetAllUserQuery();
  const [deleteUserFromList, responseInfo] = useDeleteUserFromListMutation();
  const [postDeletedUser] = usePostDeletedUserMutation();

  const [selectedRow, setSelectedRow] = React.useState([]);
  const [row, setRow] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  console.log("🚀 ~ file: user.jsx ~ line 29 ~ User ~ row", row);
  console.log(
    "🚀 ~ file: user.jsx ~ line 24 ~ User ~ isLoading, isSuccess",
    isLoading,
    isSuccess
  );

  React.useEffect(() => {
    if (!userStorage) setRow(data);
    else {
      if (Array.isArray(userStorage)) {
        console.log(
          "🚀 ~ file: user.jsx ~ line 40 ~ React.useEffect ~ userStorage",
          userStorage
        );
        userStorage.forEach((item) => {
          const newUser = { ...item, id: row.length + 1 };
          const newRow = [...row];
          newRow.push(newUser);
          setRow(newRow);
        });
      }
      if (userStorage.id === 0) {
        const newUser = { ...userStorage, id: row.length + 1 };
        const newRow = [...row];
        newRow.push(newUser);
        setRow(newRow);
      }
    }
    console.log(
      "🚀 ~ file: user.jsx ~ line 49 ~ userStorage.forEach ~ row",
      row
    );
  }, [userStorage]);

  React.useEffect(() => {
    if (isSuccess && row.length === 0) setRow(data);
    else setRow(row);
  }, [isSuccess]);

  const handleDeleteUser = () => {
    const checkDiffElement = row.filter(
      (x) => !selectedRow.some((x1) => x.id === x1.id)
    );
    console.log(
      "🚀 ~ file: user.jsx ~ line 64 ~ handleDeleteUser ~ checkDiffElement",
      checkDiffElement
    );

    const checkSameElement = row.filter((x) =>
      selectedRow.some((x1) => x.id === x1.id)
    );
    console.log(
      "🚀 ~ file: user.jsx ~ line 72 ~ handleDeleteUser ~ checkSameElement",
      checkSameElement
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
        });

        const newRow = checkDiffElement;
        setRow(newRow);

        Swal.fire(
          "Deleted!",
          "You can restore this user from trash!",
          "success"
        );
      }
      // else if (result.isDenied) {
      //   Swal.fire("Changes are not saved", "", "info");
      // }
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

  if (isLoading) return <Loading />;
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
            startIcon={<PersonAddIcon />}
            variant="contained"
            color="success"
            sx={{ fontWeight: 600, marginRight: "1em" }}
            onClick={() => handleAddUser()}
          >
            Add
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteUser()}
            variant="contained"
            color="error"
            sx={{ fontWeight: 600 }}
            disabled={selectedRow.length === 0}
          >
            Delete
          </Button>
        </div>
        <AddUser open={open} setOpen={setOpen} />
        <DataGrid
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
