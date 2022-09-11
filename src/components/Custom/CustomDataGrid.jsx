import { CustomDataGrid } from "utils/styledMUI";
import PropTypes from "prop-types";
import React from "react";
import { columns } from "utils";
import { selectDeletedList } from "features/trash/trashSlice";
import { selectMode } from "features/drawer/drawerSlice";
import { selectUserList } from "features/user/userSlice";
import { useSelector } from "react-redux";

export default function DataGrid({ row, setRow, setSelectedRow }) {
  const mode = useSelector(selectMode);
  const userList = useSelector(selectUserList);
  const deletedUserList = useSelector(selectDeletedList);

  const location = window.location.pathname;
  const checkUserList = userList && userList.length !== 0;
  const checkDeletedList = deletedUserList && deletedUserList.length !== 0;

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
    // console.log(selectedRowData);
  };

  return (
    <CustomDataGrid
      onSelectionModelChange={(id) => onSelectionModelChange(id)}
      rows={row}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      checkboxSelection
      mode={mode}
    />
  );
}

DataGrid.propTypes = {
  row: PropTypes.array.isRequired,
  setRow: PropTypes.func.isRequired,
  setSelectedRow: PropTypes.func.isRequired,
};

DataGrid.defaultProps = {
  row: [],
};
