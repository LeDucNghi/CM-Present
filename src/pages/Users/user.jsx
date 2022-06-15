import * as React from "react";

import { postUserList, routesName } from "features/slice";
import { useDispatch, useSelector } from "react-redux";

import AddUser from "components/AddUser/addUser";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PreviewIcon from "@mui/icons-material/Preview";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userStorage = useSelector((state) => state.user.userInfo);
  console.log(
    "🚀 ~ file: user.jsx ~ line 20 ~ User ~ userStorage",
    userStorage
  );

  const [selectedRow, setSelectedRow] = React.useState([]);
  const [row, setRow] = React.useState([]);

  const [open, setOpen] = React.useState(false);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 150 },
    { field: "lastName", headerName: "Last name", width: 150 },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "age",
      headerName: "Age",
      // type: "number",
      width: 100,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 300,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,

      renderCell: (cellValues) => {
        return (
          <Button
            onClick={() => {
              navigate(`/home/about/${cellValues.row.id}`);
              console.log(cellValues.row);
            }}
          >
            {cellValues.row.firstName || ""} {cellValues.row.lastName || ""}
          </Button>
        );
      },
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
    },
    {
      // headerName: "Full name",
      width: 200,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,

      renderCell: (cellValues) => {
        return (
          <Button
            startIcon={<PreviewIcon />}
            variant="contained"
            color="success"
            sx={{ fontWeight: 600, margin: "0 auto" }}
            onClick={() => {
              navigate(`/home/about/${cellValues.row.id}`);
              dispatch(routesName("About"));

              console.log(cellValues.row);
            }}
          >
            View
          </Button>
        );
      },
    },
  ];

  const rows = [
    {
      id: 1,
      lastName: "Snow",
      firstName: "Jon",
      age: 35,
      email: "leducnghi28122000hiie@gmail.com",
      role: "member",
    },
    {
      id: 2,
      lastName: "Lannister",
      firstName: "Cersei",
      age: 42,
      email: "leducnghi28122000hiie@gmail.com",
      role: "member",
    },
    {
      id: 3,
      lastName: "Lannister",
      firstName: "Jaime",
      age: 45,
      email: "leducnghi28122000hiie@gmail.com",
      role: "member",
    },
    {
      id: 4,
      lastName: "Stark",
      firstName: "Arya",
      age: 16,
      email: "leducnghi28122000hiie@gmail.com",
      role: "member",
    },
    {
      id: 5,
      lastName: "Targaryen",
      firstName: "Daenerys",
      age: null,
      email: "leducnghi28122000hiie@gmail.com",
      role: "member",
    },
    {
      id: 6,
      lastName: "Melisandre",
      firstName: null,
      age: 150,
      email: "leducnghi28122000hiie@gmail.com",
      role: "member",
    },
    {
      id: 7,
      lastName: "Clifford",
      firstName: "Ferrara",
      age: 44,
      email: "leducnghi28122000hiie@gmail.com",
      role: "member",
    },
    {
      id: 8,
      lastName: "Frances",
      firstName: "Rossini",
      age: 36,
      email: "leducnghi28122000hiie@gmail.com",
      role: "member",
    },
    {
      id: 9,
      lastName: "Roxie",
      firstName: "Harvey",
      age: 65,
      email: "leducnghi28122000hiie@gmail.com",
      role: "member",
    },
  ];

  React.useEffect(() => {
    setRow(rows);
  }, []);

  React.useEffect(() => {
    if (!userStorage) return;
    else {
      if (userStorage.id === 0) {
        const newUser = { ...userStorage, id: row.length + 1 };
        console.log(
          "🚀 ~ file: user.jsx ~ line 197 ~ React.useEffect ~ newUser",
          newUser
        );
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
      } persons ?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        const newRow = checkSameElement;
        setRow(newRow);
      }
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
