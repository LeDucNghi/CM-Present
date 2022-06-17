import * as React from "react";

import { columns, rows } from "constants/global";

import AddUser from "components/AddUser/addUser";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Swal from "sweetalert2";
import { useGetAllUserQuery } from "services/user";
import { useSelector } from "react-redux";

export default function User() {
  const userStorage = useSelector((state) => state.app.userInfo);
  const { data, error, isLoading, isSuccess } = useGetAllUserQuery();

  const [selectedRow, setSelectedRow] = React.useState([]);
  const [row, setRow] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (isSuccess) setRow(data);
  }, [isSuccess]);

  React.useEffect(() => {
    if (!userStorage) return;
    else {
      if (Array.isArray(userStorage)) {
        userStorage.forEach((item) => {
          const newUser = { ...item, id: row.length + 1 };
          const newRow = [...row];
          newRow.push(newUser);
          setRow(newRow);
        });
      } else if (!Array.isArray(userStorage) || userStorage.id === 0) {
        const newUser = { ...userStorage, id: row.length + 1 };
        const newRow = [...row];
        newRow.push(newUser);
        setRow(newRow);
      }
    }
  }, [userStorage]);

  const handleDeleteUser = () => {
    const checkSameElement = row.filter(
      (x) => !selectedRow.some((x1) => x.id === x1.id)
    );

    Swal.fire({
      title: `Are you sure to delete this ${
        selectedRow.length === 1 ? "" : selectedRow.length
      } user ?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      // showDenyButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      // denyButtonText: `Delete it permanently`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Deleted!",
          "You can restore this user from trash!",
          "success"
        );
        const newRow = checkSameElement;
        setRow(newRow);
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
    const selectedRowData = rows.filter((row) => selectedIDs.has(row.id));
    setSelectedRow(selectedRowData);
    console.log(selectedRowData);
  };
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
