import * as React from "react";

import { StyledDataGrid, columns } from "constants/global";

import AddUserButton from "components/AddUser/addUserButton";
import AddUserForm from "components/AddUser/addUserForm";
import { DataGrid } from "@mui/x-data-grid";
import { Loading } from "components/Loading";
import { useSelector } from "react-redux";

export default function User({ mode, allUserLoading, allUserError }) {
  const userListStorage = useSelector((state) => state.app.userList);

  const [selectedRow, setSelectedRow] = React.useState([]);
  const [row, setRow] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (userListStorage && userListStorage.length !== 0)
      setRow(userListStorage);
  }, [userListStorage]);

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
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "1em",
          }}
        >
          <AddUserButton
            row={row}
            setRow={setRow}
            setOpen={setOpen}
            selectedRow={selectedRow}
          />
        </div>

        <AddUserForm open={open} setOpen={setOpen} />

        <DataGrid
          sx={{ color: mode === "dark" ? "#fff" : "rgba(0, 0, 0, 0.87)" }}
          onSelectionModelChange={(id) => onSelectionModelChange(id)}
          rows={row}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />

        {/* <StyledDataGrid
          // sx={{ color: mode === "dark" ? "#fff" : "rgba(0, 0, 0, 0.87)" }}
          onSelectionModelChange={(id) => onSelectionModelChange(id)}
          rows={row}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        /> */}
      </div>
    );
}
