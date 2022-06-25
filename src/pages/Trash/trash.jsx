import { postDeletedList, postUserInfo, postUserList } from "features/slice";
import {
  useDeleteUserPermanentlyMutation,
  usePostNewUserMutation,
} from "services/userServices";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Loading } from "components/Loading";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import React from "react";
import Swal from "sweetalert2";
import { columns } from "constants/global";

function Trash({ deletedUserLoading }) {
  const dispatch = useDispatch();
  const deletedUserListStorage = useSelector(
    (state) => state.app.deletedUserList
  );
  const userListStorage = useSelector((state) => state.app.userList);

  const [deleteUserPermanently] = useDeleteUserPermanentlyMutation();
  const [postNewUser] = usePostNewUserMutation();

  const [selectedRow, setSelectedRow] = React.useState([]);
  const [row, setRow] = React.useState([]);

  React.useEffect(() => {
    console.log(
      "🚀 ~ file: trash.jsx ~ line 22 ~ Trash ~ deletedUserListStorage",
      deletedUserListStorage
    );
    if (deletedUserListStorage && deletedUserListStorage.length !== 0) {
      setRow(deletedUserListStorage);
      console.log("🚀 ~ file: trash.jsx ~ line 37 ~ Trash ~ row", row);
    }
  }, [deletedUserListStorage, row]);

  const checkDiffElement = row.filter(
    (x) => !selectedRow.some((x1) => x.id === x1.id)
  );

  const checkSameElement = row.filter((x) =>
    selectedRow.some((x1) => x.id === x1.id)
  );

  const handleRestoreUser = () => {
    // console.log(
    //   "🚀 ~ file: trash.jsx ~ line 23 ~ Trash ~ userListStorage",
    //   userListStorage
    // );
    // console.log(
    //   "🚀 ~ file: trash.jsx ~ line 63 ~ handleRestoreUser ~ difElement",
    //   checkDiffElement
    // );
    // console.log(
    //   "🚀 ~ file: trash.jsx ~ line 65 ~ handleRestoreUser ~ sameElement",
    //   checkSameElement
    // );
    const lastIndex = userListStorage[userListStorage.length - 1].id;

    Swal.fire({
      title: `Are you sure to restore this ${
        selectedRow.length === 1 ? "" : selectedRow.length
      } user?`,
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, restore it!",
    }).then((result) => {
      if (result.isConfirmed) {
        checkSameElement.forEach((el) => {
          const { id, ...rest } = el;
          console.log(
            "🚀 ~ file: trash.jsx ~ line 66 ~ checkSameElement.forEach ~ { id, ...rest } ",
            { ...rest, id: lastIndex + 1 }
          );
          const newUserList = [...userListStorage];
          console.log(
            "🚀 ~ file: trash.jsx ~ line 83 ~ checkSameElement.forEach ~ newUserList",
            newUserList
          );
          newUserList.push({ ...rest, id: lastIndex + 1 });
          dispatch(postUserList(newUserList));
        });

        // dispatch(postUserInfo(checkSameElement));
        dispatch(postDeletedList(checkDiffElement));
        checkSameElement.forEach((item) => {
          const { id, ...rest } = item;
          deleteUserPermanently(item.id);
          postNewUser({ ...rest });
        });
        setRow(deletedUserListStorage);
        console.log(
          "🚀 ~ file: trash.jsx ~ line 77 ~ handleRestoreUser ~ Row",
          row
        );
        Swal.fire("Restored!", "", "success");
      }
    });
  };

  const handleDeleteUser = () => {
    Swal.fire({
      title: `Are you sure to delete this ${
        selectedRow.length === 1 ? "" : selectedRow.length
      } user permanently?`,
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it permanently!",
    }).then((result) => {
      if (result.isConfirmed) {
        const difElement = checkDiffElement;
        const sameElement = checkSameElement;
        dispatch(postUserInfo(sameElement));
        sameElement.forEach((item) => {
          deleteUserPermanently(item.id);
        });
        setRow(difElement);
        Swal.fire("Deleted!", "", "success");
      }
    });
  };

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
            // background: "#000",
          }}
        >
          <Button
            startIcon={<PersonAddIcon />}
            variant="contained"
            color="success"
            sx={{ fontWeight: 600, marginRight: "1em" }}
            onClick={() => handleRestoreUser()}
            disabled={selectedRow.length === 0}
          >
            Restore
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
        <DataGrid
          getRowId={(row) => row.id}
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

export default Trash;
