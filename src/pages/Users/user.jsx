import * as React from "react";

import AddUserButton from "components/AddUser/addUserButton";
import AddUserForm from "components/AddUser/addUserForm";
import { CustomDataGrid } from "constants/styledMUI";
import { Loading } from "components/Common/Loading";
import { columns } from "constants/global";
import { useSelector } from "react-redux";

export default function User({ allUserLoading, allUserError }) {
  const userListStorage = useSelector((state) => state.app.userList);
  const mode = useSelector((state) => state.app.mode);

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
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "1em",
            position: "relative",
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

        <CustomDataGrid
          onSelectionModelChange={(id) => onSelectionModelChange(id)}
          rows={row}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          mode={mode}
        />
      </div>
    );
}
