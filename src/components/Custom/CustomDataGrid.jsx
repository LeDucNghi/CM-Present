import { selectUserList, userActions } from "features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

import { CustomDataGrid } from "constants/styledMUI";
import React from "react";
import { columns } from "constants/global";
import { postUserList } from "features/slice";

export default function DataGrid({ setSelectedRow }) {
  const location = window.location.pathname;
  const dispatch = useDispatch();

  const mode = useSelector((state) => state.app.mode);
  const userList = useSelector(selectUserList);
  const deletedUserList = useSelector((state) => state.app.deletedUserList);

  const checkUserList = userList && userList.length !== 0;
  const checkDeletedList = deletedUserList && deletedUserList.length !== 0;

  const [row, setRow] = React.useState([]);

  React.useEffect(() => {
    if (location === "/main/user") dispatch(userActions.postUserList());
    // if (location === "/main/trash") dispatch(userActions.postUserList());
  }, [location, dispatch]);

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
