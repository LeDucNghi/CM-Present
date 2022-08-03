import { CustomDataGrid } from "constants/styledMUI";
import React from "react";
import { columns } from "constants/global";
import { useSelector } from "react-redux";

export default function DataGrid({ setSelectedRow }) {
  const location = window.location.pathname;

  const mode = useSelector((state) => state.app.mode);
  const userList = useSelector((state) => state.app.userList);
  const deletedUserList = useSelector((state) => state.app.deletedUserList);

  const checkUserList = userList && userList.length !== 0;
  const checkDeletedList = deletedUserList && deletedUserList.length !== 0;

  const [row, setRow] = React.useState([]);

  React.useEffect(() => {
    if (location === "/main/user" && checkUserList) {
      setRow(userList);
    } else if (location === "/main/trash" && checkDeletedList) {
      setRow(deletedUserList);
    }
  }, [userList, deletedUserList, location]);

  const onSelectionModelChange = (id) => {
    const selectedIDs = new Set(id);
    const selectedRowData = row.filter((row1) => selectedIDs.has(row1.id));
    setSelectedRow(selectedRowData);
    console.log(selectedRowData);
  };

  return (
    <CustomDataGrid
      onSelectionModelChange={(id) => onSelectionModelChange(id)}
      rows={row ? row : []}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      checkboxSelection
      mode={mode}
    />
  );
}
