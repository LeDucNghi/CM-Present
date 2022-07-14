import { CustomDataGrid } from "constants/styledMUI";
import DeleteUser from "components/DeleteUser/deleteUser";
import { Loading } from "components/Loading";
import React from "react";
import { columns } from "constants/global";
import { useSelector } from "react-redux";

function Trash({ mode, languages, deletedUserLoading }) {
  const deletedUserListStorage = useSelector(
    (state) => state.app.deletedUserList
  );

  const [selectedRow, setSelectedRow] = React.useState([]);
  const [row, setRow] = React.useState([]);

  React.useEffect(() => {
    if (deletedUserListStorage && deletedUserListStorage.length !== 0) {
      setRow(deletedUserListStorage);
    }
  }, [deletedUserListStorage, row]);

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
          }}
        >
          <DeleteUser row={row} setRow={setRow} selectedRow={selectedRow} />
        </div>

        <CustomDataGrid
          getRowId={(row) => row.id}
          onSelectionModelChange={(id) => onSelectionModelChange(id)}
          rows={row}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          // sx={{ color: mode === "dark" ? "#fff" : "rgba(0, 0, 0, 0.87)" }}
          mode={mode}
        />
      </div>
    );
}

export default Trash;
