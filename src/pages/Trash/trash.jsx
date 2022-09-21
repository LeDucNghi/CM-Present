import DataGrid from "components/Custom/CustomDataGrid";
import DeleteUser from "features/trash/components/DeleteUser";
import React from "react";
import RestoreUser from "features/trash/components/RestoreUser";
import { deleteUser } from "features/trash/trashSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function Trash() {
  const dispatch = useDispatch();

  const [selectedRow, setSelectedRow] = React.useState([]);
  const [row, setRow] = React.useState([]);

  useEffect(() => {
    dispatch(deleteUser());
  }, []);

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
        <RestoreUser row={row} selectedRow={selectedRow} />
        <DeleteUser row={row} selectedRow={selectedRow} />
      </div>

      <DataGrid row={row} setRow={setRow} setSelectedRow={setSelectedRow} />
    </div>
  );
}

export default Trash;
